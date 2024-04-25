<script setup>
import { ref } from 'vue';
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { ControlButton, Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
// import { initialEdges, initialNodes } from '@/nodes/initial-elements.js'
import Icon from '@/components/Icon.vue'
import Header from '@/components/Header.vue'
import DropzoneBackground from '@/components/DropzoneBackground.vue'
import Sidebar from '@/components/SideBar.vue'
import useDragAndDrop from '@/nodes/useDnD.js'

const { onPaneReady, onNodeDragStop, onConnect, addEdges, setViewport, toObject } = useVueFlow()
const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()

const nodes = ref([])


/**
 * This is a Vue Flow event-hook which can be listened to from anywhere you call the composable, instead of only on the main component
 * Any event that is available as `@event-name` on the VueFlow component is also available as `onEventName` on the composable and vice versa
 *
 * onPaneReady is called when viewpane & nodes have visible dimensions
 */
onPaneReady(({ fitView }) => {
  fitView()
})

/**
 * onNodeDragStop is called when a node is done being dragged
 *
 * Node drag events provide you with:
 * 1. the event object
 * 2. the nodes array (if multiple nodes are dragged)
 * 3. the node that initiated the drag
 * 4. any intersections with other nodes
 */
onNodeDragStop(({ event, nodes, node, intersections }) => {
  console.log('Node Drag Stop', { event, nodes, node, intersections })
})

/**
 * onConnect is called when a new connection is created.
 *
 * You can add additional properties to your new edge (like a type or label) or block the creation altogether by not calling `addEdges`
 */
onConnect((connection) => {
  addEdges(connection)
})



/**
 * toObject transforms your crrent graph data to an easily persist-able object
 */
function logToObject() {
  console.log(toObject())
}

/**
 * Resets the current viewport transformation (zoom & pan)
 */
function resetTransform() {
  setViewport({ x: 0, y: 0, zoom: 1 })
}


function generateRandomNode() {
    return {
      id: Math.random().toString(),
      position: {x: Math.random() * 500, y: Math.random() * 500},
      label: 'Random Node',
  }
}

// remove a single node from the graph
function onRemoveNode() {
  nodes.value.pop()
}


</script>

<template>
  <div class="graph-container">
    <Header />
  <div class="main-content" @drop="onDrop">
    <div class="work-area">
    <VueFlow :nodes="nodes" @dragover="onDragOver" @dragleave="onDragLeave">

      <DropzoneBackground
          :style="{
        backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
        transition: 'background-color 0.2s ease',
        }" />

    <MiniMap />

    <Controls position="top-left">
      <ControlButton title="Reset Transform" @click="resetTransform">
        <Icon name="reset" />
      </ControlButton>

      <ControlButton title="Log `toObject`" @click="logToObject">
        <Icon name="log" />
      </ControlButton>
      <button class="btn btn-primary" type="button" @click="onRemoveNode">
        <Icon name="trash" />
      </button>
    </Controls>
  </VueFlow>
      <Controls position="top-right">
      <div class="sidebar-wrapper">
      <Sidebar />
      </div>
      </Controls>
  </div>
  </div>
  </div>
</template>

<style>
/* import the required styles */
@import "/node_modules/@vue-flow/core/dist/style.css";

/* import the default theme (optional) */
@import "/node_modules/@vue-flow/core/dist/theme-default.css";
/* Установка ширины и высоты для контейнера */

.graph-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  display: flex;
  flex: 1;
}

.work-area {
  flex: 1;
  position: relative;
  display: flex;
}

.sidebar-wrapper {
  max-width: 250px;
  max-height: 300px;
  padding: 15px;
  background: #f8f8f8;
  border-right: 1px solid #ccc;
  box-sizing: border-box;
}

</style>