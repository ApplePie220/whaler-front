<script setup>
import { Handle, Position } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

defineProps(['data', 'label' , 'type'])
</script>

<template>
  <NodeToolbar
      style="display: flex; gap: 0.5rem; align-items: center"
      :is-visible="data.toolbarVisible"
      :position="data.toolbarPosition"
  >
    <button>Action1</button>
    <button>Action2</button>
    <button>Action3</button>
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