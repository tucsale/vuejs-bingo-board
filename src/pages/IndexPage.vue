<template>
  <q-page class="col column">
    <div class="grid col">
      <div class="bg-green"></div>
      <div class="bg-red"></div>

    </div>
    <footer class="flex footer">
      <q-btn color="primary" label="Start a new Game" @click="gotoBoard()"></q-btn>
      <q-space />
      <q-btn color="primary" label="Start a new Game" @click="gotoBoard()"></q-btn>
    </footer>
  </q-page>
</template>
<style lang="sass">
.grid
  display: grid
  grid-template-columns: 1fr 1fr
  grid-gap: 10px

</style>
<script setup>
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
const $q = useQuasar()

const router = useRouter()
defineOptions({
  name: 'IndexPage'
})
const gotoBoard = () => {
  $q.localStorage.set('unselectedNumbers', null)
  $q.localStorage.set('selectedNumbers', null)
  $q.localStorage.set('selectedNumber', null)
  router.push('/board')
}
</script>
