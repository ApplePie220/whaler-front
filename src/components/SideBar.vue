<script setup>
import useDragAndDrop from '@/nodes/useDnD.js'

const { onDragStart } = useDragAndDrop()
</script>

<template>
  <div class="sidebar">
    <div class="description">Вы можете переместить эти блоки в рабочую область</div>

    <div class="nodes">
      <div class="vue-flow__node-input" :draggable="true" @dragstart="onDragStart($event, 'input', 'FROM')">FROM</div>

      <div class="vue-flow__node-default" :draggable="true" @dragstart="onDragStart($event, 'default','COPY')">COPY</div>

      <div class="vue-flow__node-default" :draggable="true" @dragstart="onDragStart($event, 'default', 'ADD')">ADD</div>

      <div class="vue-flow__node-output" :draggable="true" @dragstart="onDragStart($event, 'output', 'CMD')">CMD</div>
    </div>
  </div>
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