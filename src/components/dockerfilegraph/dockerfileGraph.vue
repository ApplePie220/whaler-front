<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow} from '@vue-flow/core'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'

import Header from '@/components/Header.vue'
import DropzoneBackground from '@/components/dockerfilegraph/DropzoneBackground.vue'
import Sidebar from '@/components/dockerfilegraph/SideBar.vue'
import SaveRestoreControls from '@/components/dockerfilegraph/Controls.vue'
import Disclosure from "@/components/dockerfilegraph/Disclouser.vue";
import ToolbarNode from "@/components/dockerfilegraph/ToolbarNode.vue";
import { useToast, POSITION } from "vue-toastification";

import useDragAndDrop from '@/nodes/useDnD.js'

const { onPaneReady, onNodeDragStop, onConnect, toObject  } = useVueFlow()
const { onDragOver, onDrop, onDragLeave, isDragOver, updateParams, onConnecting } = useDragAndDrop()
const toast = useToast();


const nodes = ref([])

onPaneReady(({ fitView }) => {
  fitView()
})

onNodeDragStop(({ event, nodes, node, intersections }) => {
  if (node.parameters === '') {
    console.log(`Параметр блока ${node.label} не должен быть пустым`)
    toast.warning(`Параметр блока ${node.label} не должен быть пустым`,
        { position: POSITION.BOTTOM_LEFT });
  }
  const con1 = (JSON.stringify(toObject()))
  const edgesData = JSON.parse(con1);
  // console.log(edgesData['edges'][1])
  if (edgesData['edges'] && edgesData["edges"].length > 0) {

    const lastEdge = edgesData['edges'][edgesData['edges'].length - 1];
    const firstEdge = edgesData['edges'][0];

    const targetNodeId = lastEdge.target;
    const sourceNodeId = firstEdge.source;

    const targetNode = edgesData['nodes'].find(node => node.id === targetNodeId);
    const sourceNode = edgesData['nodes'].find(node => node.id === sourceNodeId);
    if (targetNode["type"] !== "output") {
      console.log('У модели должен быть конечный блок');
      toast.warning('У модели должен быть конечный блок',
          { position: POSITION.BOTTOM_LEFT });
    }

    if (sourceNode["type"] !== "input") {
      console.log('У модели должен быть начальный блок');
    }
  } else {
    console.log('Связи не найдены');
  }

})


onConnect((connection) => {
  onConnecting(connection)
})

function logToObject() {
  updateNodeParamsAction({ id: props.id, params: value });
}



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
        <Sidebar />
      </div>
  </div>
  </div>
  </div>
</template>

<style>
@import "/node_modules/@vue-flow/core/dist/style.css";

@import "/node_modules/@vue-flow/core/dist/theme-default.css";

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
.controls-wrapper:nth-of-type(2) {
  max-height: 300px;
  z-index: 1;
}

.disclosure-container {
  display: flex;
  justify-content: center;
  max-width: 190px;
}


</style>