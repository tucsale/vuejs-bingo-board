<template>
  <q-layout view="hHh lpR fFf" class="page">
    <header>
      <div class="logo parcudup">
        <!-- <img src="/squash.svg" class="logo" fit="contain" /> -->
      </div>
      <div class="typeOfGame" @click="changeTypeOfGame">{{ typeOfGame }}</div>
      <div class="logo runicalle">
        <!-- <img src="/runicalle.svg" class="logo" fit="contain" /> -->
      </div>
    </header>
    <section class="selectedNumberContainer">
      <div class="selectedNumber">{{ selectedNumber }}</div>
    </section>
    <section class="boardNumbers">
      <div
        v-for="number in listOfNumber" :key="number"
        :class="{ 'selectedNumbers': isInSelectedNumber(number), 'theNumber': isSelectedNumber(number) }"
        class="numbers">
        {{ number }}
      </div>
    </section>

    <footer class="footer">
      <q-btn outline autofocus icon="mdi-dice-multiple" ref="btnSelectRandomNumber" @click="selectRandomNumber" label="Tirage" class="q-ml-md"  />
      <q-space />
      <!-- DARK MODE -->
      <q-btn outline dense icon="mdi-archive-clock-outline" ref="btnResetGame" @click="showHistory = true" label="History"  class="q-mr-md"  />
      <q-toggle dense keep-color color="grey" checked-icon="light_mode" unchecked-icon="dark_mode" class="q-mr-md" v-model="isDark" />
      <q-btn outline dense icon="mdi-restart" ref="btnResetGame" @click="resetGame" label="Réinitialiser" class="q-mr-md" />
    </footer>
    <q-dialog v-model="showHistory">
      <q-card style="min-width: 600px; width: 70vw; max-height: 70vh;">
        <div class="q-pa-md">
          <q-list bordered>
            <q-item v-for="(game, index) in gameHistory" :key="game.dateOfGame">
              <q-item-section>
                <q-item-label>{{ game.typeOfGame }}</q-item-label>
                <q-item-label caption>{{ game.dateOfGame }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ game.selectedNumbers.join(', ') }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn flat dense icon="mdi-delete" @click="deleteGame(index)" />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useQuasar } from 'quasar'

defineOptions({
  name: 'MainLayout'
})
const listOfNumber = []
listOfNumber.push(90)

for (let i = 0; i <= 8; i++) {
  for (let j = 0; j <= 9; j++) {
    if (i === 0 && j === 0) continue
    listOfNumber.push(i * 10 + j)
  }
}

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

// Generate default unselected numbers
const defaultUnselectedNumbers = []
for (let i = 1; i <= 90; i++) {
  defaultUnselectedNumbers.push(i)
}
const selectedNumbers = ref($q.localStorage.getItem('selectedNumbers') || [])
const unselectedNumbers = ref($q.localStorage.getItem('unselectedNumbers') || defaultUnselectedNumbers)
const selectedNumber = ref($q.localStorage.getItem('selectedNumber') || 0)
const typeOfGame = ref($q.localStorage.getItem('typeOfGame') || 'Quine')
const gameHistory = ref($q.localStorage.getItem('gameHistory') || [])
const showHistory = ref(false)
const btnSelectRandomNumber = ref(null)
const btnResetGame = ref(null)

// Save selected and unselected numbers to local storage
const saveToLocalStorage = () => {
  $q.localStorage.setItem('unselectedNumbers', unselectedNumbers.value)
  $q.localStorage.setItem('selectedNumbers', selectedNumbers.value)
  $q.localStorage.setItem('selectedNumber', selectedNumber.value)
}
saveToLocalStorage()

const deleteGame = (index) => {
  $q.dialog({
    title: 'Supprimer le jeu',
    message: 'T\'es sûr de vouloir faire çà ?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    gameHistory.value.splice(index, 1)
    $q.localStorage.setItem('gameHistory', gameHistory.value)
  })
}
const changeTypeOfGame = () => {
  $q.dialog({
    title: 'Type de jeu',
    message: 'Choisis le type de jeu :',
    cancel: true,
    persistent: true,
    options: {
      type: 'radio',
      model: typeOfGame.value,
      items: [
        { label: 'Quine', value: 'Quine' },
        { label: 'Double Quine', value: 'Double Quine' },
        { label: 'Carton plein', value: 'Carton plein' }
      ]
    }
  }).onOk((data) => {
    typeOfGame.value = data
    $q.localStorage.setItem('typeOfGame', typeOfGame.value)
  })
}

// Reset the game by resetting the values
const resetGame = (el) => {
  console.log(el)
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
    btnSelectRandomNumber.value.$el.focus()
    btnResetGame.value.$el.blur()
    gameHistory.value.push({
      typeOfGame: typeOfGame.value,
      selectedNumbers: selectedNumbers.value,
      dateOfGame: new Date().toLocaleString()
    })
    $q.localStorage.setItem('gameHistory', gameHistory.value)

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
