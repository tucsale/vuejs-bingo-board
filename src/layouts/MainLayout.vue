<template>
  <q-layout view="hHh lpR fFf">
    <div class="fit page">
      <header class="row">
        <img src="/parducup.png" class="logo qx-mx-md" fit="contain" />
        <q-space />
        <div class="text-h1 text-black">A la ligne</div>
        <q-space />
        <!-- DARK MODE -->
        <q-toggle dense keep-color color="grey" checked-icon="light_mode" unchecked-icon="dark_mode" class="q-mx-md"
          v-model="isDark" />
        <img src="/runicalle.png" class="logo" />
      </header>
      <router-view />
    </div>
  </q-layout>
</template>

<script setup>
import { computed, onBeforeMount } from 'vue'
import { useQuasar } from 'quasar'

defineOptions({
  name: 'MainLayout'
})

const $q = useQuasar()
const isDark = computed({
  get () {
    return $q.dark.isActive
  },

  set (val) {
    $q.dark.set(val)
    $q.localStorage.set('bingo-dark-mode', val)
  }
})
onBeforeMount(() => {
  const isDarkLS = $q.localStorage.getItem('bingo-dark-mode')
  $q.dark.set(isDarkLS)
})

</script>
