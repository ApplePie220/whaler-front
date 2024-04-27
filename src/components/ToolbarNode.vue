<script setup>
import {reactive, ref, watch} from 'vue';
import { Handle, Position } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import updateParams from '@/nodes/useDnD.js'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  parameters: {
    type: String,
    default: '',
  },
   id: {
    type: String,
     required: true,
   }
})

let localParams = props.parameters
defineEmits(['editParam'])

watch(() => props.parameters, (newValue) => {
  localParams.value = newValue;
});

// function updParam(id, localParams) {
//   console.log(id)
//   updateParams(id, localParams)
// }

function logParam (param) {
  console.log(param)
}

</script>

<template>
  <NodeToolbar
      style="display: flex; gap: 0.5rem; align-items: center"
      :is-visible="data.toolbarVisible"
      :position="data.toolbarPosition"
  >
    <!-- Replaced button with a small window -->
    <div class="node-data-dialog" >
      <div class="dialog-title">Параметры {{label}}</div>
      <input type="text" v-model="localParams" @input="logParam(localParams)" class="node-data-input" placeholder="Введите данные">
      <button class="node-data-save-button" @click="$emit('editParam', [id, localParams])">Сохранить</button>
    </div>
  </NodeToolbar>

  <div :style="{ padding: '10px 20px' }">
    {{ label }}
  </div>
  <template v-if="type === 'default'">
    <Handle type="target" :position="Position.Top" />
    <Handle type="source" :position="Position.Bottom" />
  </template>

  <template v-if="type === 'input'">
  <Handle type="target" :position="Position.Bottom" />
  <Handle type="source" :position="Position.Bottom" />
  </template>

  <template v-if="type === 'output'">
    <Handle type="target" :position="Position.Top" />
    <Handle type="source" :position="Position.Top" />
  </template>


</template>

<style scoped>
.node-data-dialog {
  position: relative;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.dialog-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
}

.node-data-input {
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  text-align: center;
}
</style>