<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronUpIcon } from '@heroicons/vue/20/solid'
import {Panel} from "@vue-flow/core";
</script>

<template>
  <Panel position="top-left" >
  <div class="disclore">
  <Disclosure v-slot="{ open }">
    <DisclosureButton
        class="flex justify-between rounded-lg bg-gray-200 px-4 py-2 text-left text-sm font-sm text-red-950 hover:bg-gray-400 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
    >
      <span>Немного о FROM</span>
      <ChevronUpIcon
          :class="open ? 'rotate-180 transform' : ''"
          class="h-5 w-5 text-red-950"
      />
    </DisclosureButton>
    <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500 disclosure-panel">
      If you're unhappy with your purchase for any reason, email us within
      90 days and we'll refund you in full, no questions asked.
    </DisclosurePanel>
  </Disclosure>
  <Disclosure as="div" class="mt-2" v-slot="{ open }">
    <DisclosureButton
        class="flex w-full justify-between rounded-lg bg-gray-200 px-4 py-2 text-left text-sm font-sm text-red-950 hover:bg-gray-400 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
    >
      <span>Немного о COPY</span>
      <ChevronUpIcon
          :class="open ? 'rotate-180 transform' : ''"
          class="h-5 w-5 text-red-950"
      />
    </DisclosureButton>
    <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500 disclosure-panel">
      No.
    </DisclosurePanel>
  </Disclosure>
  <Disclosure as="div" class="mt-2" v-slot="{ open }">
    <DisclosureButton
        class="flex w-full justify-between rounded-lg bg-gray-200 px-4 py-2 text-left text-sm font-sm text-red-950 hover:bg-gray-400 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
    >
      <span>Немного об ADD</span>
      <ChevronUpIcon
          :class="open ? 'rotate-180 transform' : ''"
          class="h-5 w-5 text-red-950"
      />
    </DisclosureButton>
    <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500 disclosure-panel">
      Yes.
    </DisclosurePanel>
  </Disclosure>
  <Disclosure as="div" class="mt-2" v-slot="{ open }">
    <DisclosureButton
        class="flex w-full justify-between rounded-lg bg-gray-200 px-4 py-2 text-left text-sm font-sm text-red-950 hover:bg-gray-400 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
    >
      <span>Немного о CMD</span>
      <ChevronUpIcon
          :class="open ? 'rotate-180 transform' : ''"
          class="h-5 w-5 text-red-950"
      />
    </DisclosureButton>
    <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500 disclosure-panel">
      MHMM.
    </DisclosurePanel>
  </Disclosure>
    <Disclosure as="div" class="mt-2" v-slot="{ open }">
      <DisclosureButton
          class="flex w-full justify-between rounded-lg bg-gray-200 px-4 py-2 text-left text-sm font-sm text-red-950 hover:bg-gray-400 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
      >
        <span>Немного об ENTRYPOINT</span>
        <ChevronUpIcon
            :class="open ? 'rotate-180 transform' : ''"
            class="h-5 w-5 text-red-950"
        />
      </DisclosureButton>
      <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500 disclosure-panel">
        Ой-ей
      </DisclosurePanel>
    </Disclosure>
  </div>
    </Panel>
</template>

<style scoped>
.disclore {
  display: flex;
  word-break: break-word;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  vertical-align: top;
  flex-direction: column;
  max-width: 190px;
  background: rgba(241, 241, 241, 0.5);  /* Изменим цвет на немного темнее фона */
}

.disclosure-panel {
  width: 100%; /* Make the disclosure panel take up the full width of the container */
  word-break: break-word; /* Allow the text to wrap to a new line */
  overflow-wrap: break-word; /* Allow the text to wrap to a new line (for older browsers) */
}
</style>