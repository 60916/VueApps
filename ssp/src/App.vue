<script setup>
import { ref } from 'vue'
import KnappRad from './components/KnappRad.vue'

const score = ref({ spelare: 0, dator: 0 })
const resultat = ref('Låt oss börja')
const knappar = ref(['Sten', 'Sax', 'Påse'])

function hittaVinnare() {
  let buttons = document.getElementsByClassName('alternativ')
  for (let b of buttons) {
    if (b.classList.contains('spelarval')) {
      var spelarval = b.textContent
    }
    if (b.classList.contains('datorval')) {
      var datorval = b.textContent
    }
  }
  if (spelarval == datorval) {
    resultat.value = 'Oavgjort'
  } else if (
    (spelarval == 'Sten' && datorval == 'Sax') ||
    (spelarval == 'Sax' && datorval == 'Påse') ||
    (spelarval == 'Påse' && datorval == 'Sten')
  ) {
    resultat.value = 'Du vann!!'
    score.value.spelare++
  } else {
    resultat.value = 'Du förlorade!'
    score.value.dator++
  }
}
function reset() {
  score.value.spelare = 0
  score.value.dator = 0
  let buttons = document.getElementsByClassName('alternativ')
  for (let b of buttons) {
    b.classList.remove('spelarval')
    b.classList.remove('datorval')
    resultat.value = 'Låt oss börja'
  }
}
</script>

<template>
  <header>
    <h1>Sten, sax påse!</h1>
  </header>

  <main>
    <KnappRad :knappar="knappar" @valda-knappar="hittaVinnare" />
    <div class="resultat">
      <p id="resultat">{{ resultat }}</p>
    </div>
    <div class="score">
      <p>
        <span id="spelare">{{ score.spelare }}</span> -
        <span id="dator">{{ score.dator }}</span>
      </p>
    </div>
    <div class="score">
      <button id="nolla" @click="reset">Nollställ poäng</button>
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
.resultat {
  font-size: 1.2em;
  text-align: center;
  margin: 1.2em 0;
}
.score {
  font-size: 1.2em;
  text-align: center;
}
</style>
