<script setup>
import { Panel, useVueFlow } from '@vue-flow/core'

const flowKey = 'dockercompose_flow'

const { toObject, fromObject } = useVueFlow()

function onSave() {
  localStorage.setItem(flowKey, JSON.stringify(toObject(),null, 4))
}

function onRestore() {
  const flow = JSON.parse(localStorage.getItem(flowKey))

  if (flow) {
    fromObject(flow)
  }
}

</script>

<template>
  <Panel position="top-center" class="save-restore-controls">

    <button style="background-color: #ffffff " @click="onSave" class="offset_button">Запомнить состояние</button>

    <button style="background-color: #ffffff" @click="onRestore" >Восстановить</button>

  </Panel>
</template>

<style scoped>
.offset_button {
  margin-left: 500px;
}
</style>