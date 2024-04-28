<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'

import Header from "@/components/Header.vue"

import DropzoneBackground from "@/components/dockercomposegraph/DropzoneBackground.vue"
import SideBar from "@/components/dockercomposegraph/SideBar.vue"
import SaveRestoreControls from "@/components/dockercomposegraph/Controls.vue"
import Disclosure from "@/components/dockercomposegraph/Disclouser.vue"
import ToolbarNode from "@/components/dockercomposegraph/ToolbarNode.vue"

import useDragAndDrop from "@/nodesCompose/useDnD.js"

const { onPaneReady, onNodeDragStop, onConnect, addEdges, setViewport, toObject } = useVueFlow()
const { onDragOver, onDrop, onDragLeave, isDragOver, updateParams } = useDragAndDrop()

const nodes = ref([])

onPaneReady(({ fitView }) => {
  fitView()
})

onNodeDragStop(({ event, nodes, node, intersections }) => {
  console.log('Node Drag Stop', { event, nodes, node, intersections })
})

onConnect((connection) => {
  addEdges(connection)
})

function handleUpdate(payload) {
  console.log(payload)
  updateParams(payload[0], payload[1])
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
            :apply-default="true"
        >

          <DropzoneBackground
              :style="{
        backgroundColor: isDragOver ? 'rgba(208,219,232,0.58)' : 'transparent',
        transition: 'background-color 0.2s ease',
        }" />


          <MiniMap />

          <template #node-default="nodeProps">
            <ToolbarNode :data="nodeProps.data" :label="nodeProps.label"
                         :type="nodeProps.type"
                         :parameters="nodeProps.parameters"
                         :id="nodeProps.id"
                         @editParam="handleUpdate"/>
          </template>

          <template #node-output="nodeProps">
            <ToolbarNode :data="nodeProps.data" :label="nodeProps.label"
                         :type="nodeProps.type" :parameters="nodeProps.parameters"
                         :id="nodeProps.id"
                         @editParam="handleUpdate"/>
          </template>

          <template #node-input="nodeProps">
            <ToolbarNode :data="nodeProps.data" :label="nodeProps.label"
                         :type="nodeProps.type"
                         :parameters= "nodeProps.parameters"
                         :id="nodeProps.id"
                         @editParam="handleUpdate"/>
          </template>

        </VueFlow>
        <SaveRestoreControls />
        <div class="disclosure-container">
          <Disclosure />
        </div>
        <Controls position="top-right" class="controls-wrapper">
          <!--        <div class="disclosure-wrapper">-->
          <!--        <Disclosure />-->
          <!--        </div>-->
        </Controls>
        <div class="sidebar-wrapper">
          <SideBar />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
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
  margin-top: 150px;
  background: rgba(248, 248, 248, 0);
  box-sizing: border-box;
}
/* Стили для второго элемента Controls */
.controls-wrapper:nth-of-type(2) {
  max-height: 300px;
  z-index: 1; /* Установите низкий z-index */
}

.disclosure-container {
  display: flex;
  justify-content: center;
  max-width: 190px;
}
</style>