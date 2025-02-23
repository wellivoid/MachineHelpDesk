<template>
  <div class="p-1 flex h-screen gap-1 bg-gray-400">
    <div class="h-full w-44 md:w-60  bg-gray-200 rounded-md">
      <MenuMyPanelMenu />
    </div>
    <div class=" w-full flex flex-col  gap-1">
      <div class="h-10 bg-gray-200 rounded-md ">
        <h1>Machine HelpDesk</h1>
      </div>
      <div class="flex-1 bg-gray-200 rounded-md">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>

</style>
