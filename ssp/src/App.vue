<script setup>
import { onMounted, ref } from 'vue'
import KnappRad from './components/KnappRad.vue'
import ResultatRad from './components/ResultatRad.vue'
import PoangRad from './components/PoangRad.vue'

const knappar = ref(['Sten', 'Sax', 'Påse'])
const resultat = ref({})
const vinnare = ref('')
const reset = ref(true)

// Objekt som innehåller temainställningar för olika teman
const themes = {
  default: { background: '#ffffff', text: '#000000' }, // Standardtema med vit bakgrund och svart text
  dark: { background: '#1e1e1e', text: '#ffffff' }, // Mörkt tema med mörk bakgrund och vit text
  green: { background: '#2e8b57', text: '#ffffff' } // Grön bakgrund och vit text
}

// Skapar en variabel för att lagra det valda temat, med 'default' som startvärde
const ValtTema = ref('default')

// Funktion för att ändra tema
function BytTema(temaNamn) {
  ValtTema.value = temaNamn // Uppdatera det valda temat
  const theme = themes[temaNamn] // Hämta inställningarna för det valda temat
  document.body.style.backgroundColor = theme.background // Ändra bakgrundsfärgen på sidan
  document.body.style.color = theme.text // Ändra textfärgen på sidan
}

onMounted(() => {
  BytTema(ValtTema.value) // Sätt temat till standardtemat när appen laddas
})

function hittaVinnare(valdaKnappar) {
  reset.value = false
  vinnare.value = ''
  let spelare = knappar.value.indexOf(valdaKnappar.spelare)
  let dator = knappar.value.indexOf(valdaKnappar.dator)
  resultat.value = { spelare: spelare, dator: dator }

  if (spelare === dator) {
    vinnare.value = 'oavgjort';
  }
}
function raknaPoang(v) {
  vinnare.value = v
}
onMounted(() => {
  BytTema(ValtTema.value)
})
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
    <div class="theme-selector">
      <label for="themes">Välj tema:</label>
      <select id="themes" @change="BytTema($event.target.value)">
        <option value="default">Standard</option>
        <option value="dark">Mörkt läge</option>
        <option value="green">Grönt</option>
      </select>
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
