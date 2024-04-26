<script setup>
import { ref } from 'vue';
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'

import Header from '@/components/Header.vue'
import DropzoneBackground from '@/components/DropzoneBackground.vue'
import Sidebar from '@/components/SideBar.vue'
import SaveRestoreControls from '@/components/Controls.vue'
import Disclosure from "@/components/Disclouser.vue";
import ToolbarNode from "@/components/ToolbarNode.vue";

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
 * toObject transforms your current graph data to an easily persist-able object
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
    <VueFlow
        :nodes="nodes"
        @dragover="onDragOver"
        @dragleave="onDragLeave"
    >

      <DropzoneBackground
          :style="{
        backgroundColor: isDragOver ? 'rgba(208,219,232,0.58)' : 'transparent',
        transition: 'background-color 0.2s ease',
        }" />


    <MiniMap />

      <template #node-default="nodeProps">
        <ToolbarNode :data="nodeProps.data" :label="nodeProps.label" :type="nodeProps.type" />
      </template>

      <template #node-output="nodeProps">
        <ToolbarNode :data="nodeProps.data" :label="nodeProps.label" :type="nodeProps.type" />
      </template>

      <template #node-input="nodeProps">
        <ToolbarNode :data="nodeProps.data" :label="nodeProps.label" :type="nodeProps.type"/>
      </template>

  </VueFlow>
      <SaveRestoreControls />
      <Controls position="top-right" class="controls-wrapper">


      <div class="sidebar-wrapper">
      <Sidebar />
      </div>
        <div class="disclosure-wrapper">
        <Disclosure />
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
  max-width: 190px;
  max-height: 250px;
  margin-top: 40px;
  background: rgba(248, 248, 248, 0);
  box-sizing: border-box;
}
/* Стили для второго элемента Controls */
.controls-wrapper:nth-of-type(2) {
  max-height: 300px;
  z-index: 1; /* Установите низкий z-index */
}

.disclosure-wrapper {
  max-width: 190px;
  max-height: 40px;
  margin-top: 40px;
  background: rgba(248, 248, 248, 0);
  box-sizing: border-box;

}

</style>