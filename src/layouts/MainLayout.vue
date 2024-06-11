<template>
  <q-layout view="hHh lpR fFf" class="page">
    <header>
      <div class="logo parcudup">
      <!-- <img src="/squash.svg" class="logo" fit="contain" /> -->
    </div>
      <div class="typeOfGame">{{ typeOfGame }}</div>
    <div class="logo runicalle">
      <!-- <img src="/runicalle.svg" class="logo" fit="contain" /> -->
    </div>
    </header>
    <section class="selectedNumberContainer">
      <div class="selectedNumber shadow-2">{{ selectedNumber }}</div>
    </section>
    <section class="boardNumbers">
      <div
        v-for="number in 90" :key="number"
        :class="{ 'selectedNumbers': isInSelectedNumber(number), 'theNumber': isSelectedNumber(number) }"
        class="numbers">
        {{ number }}
      </div>
    </section>

    <footer class="footer">
      <q-btn flat icon="mdi-dice-multiple" ref="btnSelectRandomNumber" @click="selectRandomNumber" label="Tirage" />
      <q-space />
      <!-- DARK MODE -->
      <q-toggle dense keep-color color="grey" checked-icon="light_mode" unchecked-icon="dark_mode" class="q-mr-md" v-model="isDark" />
      <q-btn flat dense icon="mdi-restart" @click="resetGame" label="Réinitialiser" />
    </footer>
  </q-layout>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue'
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
  console.log('onBeforeMount', selectedNumber.value, $q.localStorage.getItem('selectedNumber'))
})

// Generate default unselected numbers
const defaultUnselectedNumbers = []
for (let i = 1; i <= 90; i++) {
  defaultUnselectedNumbers.push(i)
}
const selectedNumbers = ref($q.localStorage.getItem('selectedNumbers') || [])
const unselectedNumbers = ref($q.localStorage.getItem('unselectedNumbers') || defaultUnselectedNumbers)
const selectedNumber = ref($q.localStorage.getItem('selectedNumber') || 0)
const typeOfGame = ref($q.localStorage.getItem('typeOfGame') || 'Quine')
const btnSelectRandomNumber = ref(null)

// Save selected and unselected numbers to local storage
const saveToLocalStorage = () => {
  $q.localStorage.setItem('unselectedNumbers', unselectedNumbers.value)
  $q.localStorage.setItem('selectedNumbers', selectedNumbers.value)
  $q.localStorage.setItem('selectedNumber', selectedNumber.value)
}
saveToLocalStorage()

// Reset the game by resetting the values
const resetGame = () => {
  $q.dialog({
    title: 'Nouveau jeu',
    message: '<b>T\'es sûr de vouloir faire çà ?</b><br> Si oui, choisis le type de jeu :',
    cancel: true,
    persistent: true,
    html: true,
    options: {
      type: 'radio',
      model: 'Quine',
      // inline: true
      items: [
        { label: 'Quine', value: 'Quine' },
        { label: 'Double Quine', value: 'Double Quine' },
        { label: 'Carton plein', value: 'Carton plein' }
      ]
    }
  }).onOk((data) => {
    unselectedNumbers.value = defaultUnselectedNumbers
    selectedNumbers.value = []
    selectedNumber.value = 0
    btnSelectRandomNumber.value.focus()
    saveToLocalStorage()
    typeOfGame.value = data
    $q.localStorage.setItem('typeOfGame', typeOfGame.value)
    $q.notify({ message: 'Jeux réinitialisé' })
  })
}

// Select a random number from the unselected numbers list
const selectRandomNumber = async () => {
  const delayAsync = (ms) => new Promise(resolve => setTimeout(resolve, ms))
  let counter = 0
  const animate = async () => {
    if (counter < 75) {
      const randomIndex = Math.floor(Math.random() * unselectedNumbers.value.length)
      selectedNumber.value = unselectedNumbers.value[randomIndex]
      counter++
      await delayAsync(10)
      await animate()
    }
  }
  await animate()
  // Add the selected number to the selected numbers list
  const randomIndex = Math.floor(Math.random() * unselectedNumbers.value.length)
  selectedNumber.value = unselectedNumbers.value[randomIndex]
  selectedNumbers.value.push(selectedNumber.value)
  // Remove the selected number from the unselected numbers list
  unselectedNumbers.value.splice(randomIndex, 1)
  saveToLocalStorage()
}

// Check if a number is selected on the board
const isInSelectedNumber = (number) => {
  return selectedNumbers.value.includes(number)
}
const isSelectedNumber = (number) => {
  return number === selectedNumber.value
}

const keyboardEvent = (e) => {
  if (e.which === 32) {
    selectRandomNumber()
  }
}
window.addEventListener('keyup', keyboardEvent)

</script>
