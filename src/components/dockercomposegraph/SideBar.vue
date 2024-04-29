<script setup>
import useDragAndDrop from '@/nodesCompose/useDnD.js'
import {Panel} from "@vue-flow/core";

const { onDragStart } = useDragAndDrop()
</script>

<template>
  <Panel position="right">
  <div class="sidebar">
    <div class="description">Вы можете переместить эти блоки в рабочую область</div>

    <div class="nodes">
      <div class="vue-flow__node-input" :draggable="true" @dragstart="onDragStart($event, 'input', 'Services')">Services</div>

      <div class="vue-flow__node-default" :draggable="true" @dragstart="onDragStart($event, 'default', 'Service')">Service</div>

      <div class="vue-flow__node-output" :draggable="true" @dragstart="onDragStart($event, 'output', 'Build')">Build</div>

      <div class="vue-flow__node-output" :draggable="true" @dragstart="onDragStart($event, 'output', 'Depends_on')">Depends_on</div>

      <div class="vue-flow__node-output" :draggable="true" @dragstart="onDragStart($event, 'output','Environment')">Environment</div>

      <div class="vue-flow__node-output" :draggable="true" @dragstart="onDragStart($event, 'output', 'Image')">Image</div>

      <div class="vue-flow__node-output" :draggable="true" @dragstart="onDragStart($event, 'output', 'Networks')">Networks</div>

      <div class="vue-flow__node-output" :draggable="true" @dragstart="onDragStart($event, 'output', 'Ports')">Ports</div>

      <div class="vue-flow__node-output" :draggable="true" @dragstart="onDragStart($event, 'output', 'Volumes')">Volumes</div>

      <div class="vue-flow__node-output" :draggable="true" @dragstart="onDragStart($event, 'output', 'Restart')">Restart</div>
    </div>
  </div>
  </Panel>
</template>

<style scoped>
.sidebar{
  display: flex;
  vertical-align: top;
  flex-direction: column;
  max-width: 190px;  /* Уменьшим максимальную ширину сайдбара */
  max-height: 300px;/* Установим высоту сайдбара */
  padding: 15px;
  background: rgb(255, 255, 255);  /* Изменим цвет на немного темнее фона */
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
  box-sizing: border-box; /* Добавляем этот стиль */
}

.description {
  margin-bottom: 10px;
  font-size: 12px;
  line-height: 1.5; /* Высота строки */
  max-height: 3em; /* Максимальная высота, чтобы поместилось в 3 строки */
}

.nodes {
  display: flex;
  flex-direction: column;
  margin-top: 10px; /* Добавим отступ сверху */
  overflow-y: auto; /* Add this line to enable vertical scrolling */
  max-height: 200px;
}

.nodes::-webkit-scrollbar {
  width: 5px;
  height: 10px;
}

.nodes::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 10px;
}

.nodes::-webkit-scrollbar-track {
  background-color: #f0f0f0;
}

.vue-flow__node div {
  margin-bottom: 10px;
}

.vue-flow__node-input,
.vue-flow__node-default,
.vue-flow__node-output {
  padding: 15px 8px;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  cursor: move;
}


</style>