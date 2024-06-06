<template>
  <section class="page-board col column">
    <div class="col grids">
      <div class="flex flex-center ">
        <div class="selectedNumber shadow-2">{{ selectedNumber }}</div>
      </div>
      <div class="board flex flex-center">
        <div class="col boardNumbers">
          <div
            v-for="number in 90" :key="number"
            :class="{ 'selectedNumbers': isInSelectedNumber(number), 'theNumber': isSelectedNumber(number) }"

            class="numbers q-ma-sm">
            {{ number }}
          </div>
        </div>
      </div>
    </div>

    <footer class="flex footer">
      <q-btn flat icon="mdi-dice-multiple" @click="selectRandomNumber" label="Tirage" />
      <q-space />
      <q-btn flat dense icon="mdi-restart" @click="resetGame" label="Réinitialiser" />
    </footer>
  </section>
</template>
<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
const $q = useQuasar()

defineOptions({
  name: 'bingoBoard'
})

// Generate default unselected numbers
const defaultUnselectedNumbers = []
for (let i = 1; i <= 90; i++) {
  defaultUnselectedNumbers.push(i)
}
const selectedNumbers = ref($q.localStorage.getItem('selectedNumbers') || [])
const unselectedNumbers = ref($q.localStorage.getItem('unselectedNumbers') || defaultUnselectedNumbers)
const selectedNumber = ref($q.localStorage.getItem('selectedNumber') || 0)

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
    title: 'Confirm',
    message: 'Would you like to reset the game ?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    unselectedNumbers.value = defaultUnselectedNumbers
    selectedNumbers.value = []
    selectedNumber.value = 0
    saveToLocalStorage()
    $q.notify({ message: 'Game reseted' })
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
