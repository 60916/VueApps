<script setup>
import { ref } from 'vue'
import KnappRad from './components/KnappRad.vue'
import ResultatRad from './components/ResultatRad.vue'
import PoangRad from './components/PoangRad.vue'

const knappar = ref(['Sten', 'Sax', 'Påse'])
const resultat = ref({})
const vinnare = ref('')
const reset = ref(true)

function hittaVinnare(valdaKnappar) {
  reset.value = false
  vinnare.value = ''
  let spelare = knappar.value.indexOf(valdaKnappar.spelare)
  let dator = knappar.value.indexOf(valdaKnappar.dator)
  resultat.value = { spelare: spelare, dator: dator }
}
function raknaPoang(v) {
  vinnare.value = v
}
</script>

<template>
  <header>
    <h1>Sten, sax påse!</h1>
  </header>

  <main>
    <KnappRad :knappar="knappar" @valda-knappar="hittaVinnare" :reset="reset" />
    <ResultatRad :valda-knappar="resultat" @vinnare="raknaPoang" :reset="reset" />
    <PoangRad :vinnare="vinnare" :reset="reset" />
    <div class="score">
      <button id="nolla" @click="reset = true">Nollställ poäng</button>
    </div>
  </main>
</template>

<style scoped>
header {
  text-align: center;
  margin-bottom: 1.2em;
}
#nolla {
  margin-top: 2em;
  padding: 0.3em 0.6em;
  font-size: 0.8em;
}
button {
  padding: 0.6em 1.2em;
  font-size: 1.2em;
  background-color: rgb(255, 255, 255);
  border: 1px solid #000000;
  border-radius: 5px;
  cursor: pointer;
}
.score {
  font-size: 1.2em;
  text-align: center;
}
</style>
