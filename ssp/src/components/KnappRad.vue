<script setup>
//import { ref } from 'vue'

const props = defineProps(['knappar'])
const emit = defineEmits(['valdaKnappar'])

function spelarval(e) {
  let buttons = document.getElementsByClassName('alternativ')
  for (let b of buttons) {
    b.classList.remove('spelarval')
  }
  e.target.classList.add('spelarval')
  emit('valdaKnappar', { spelare: e.target.textContent, dator: datorval() })
}

function datorval() {
  let val = Math.floor(Math.random() * props.knappar.length)
  let buttons = document.getElementsByClassName('alternativ')
  for (let b of buttons) {
    b.classList.remove('datorval')
    b.title = ''
    if (b.textContent == props.knappar[val]) {
      b.classList.add('datorval')
      b.title = 'Datorns val'
    }
  }
  return props.knappar[val]
}
</script>
<template>
  <div class="knapprad">
    <button v-for="knapp in props.knappar" class="alternativ" :key="knapp" @click="spelarval">
      {{ knapp }}
    </button>
  </div>
</template>
<style scoped>
button {
  padding: 0.6em 1.2em;
  font-size: 1.2em;
  background-color: rgb(255, 255, 255);
  border: 1px solid #000000;
  border-radius: 5px;
  cursor: pointer;
}
button.spelarval {
  background-color: greenyellow;
}
button.datorval {
  border: red solid 2px;
}
.knapprad {
  display: flex;
  justify-content: center;
  gap: 0.6em;
}
</style>
