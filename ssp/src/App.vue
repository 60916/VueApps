<script setup>
import { ref } from 'vue';

const score = ref({ spelare: 3, dator: 0});
const resultat = ref('Du vann din nååb')

function spelarval(e) {
  let buttons = document.getElementsByClassName('alternativ')
  for (let b of buttons) {
    b.classList.remove('spelarval')
  }
  e.target.classList.add('spelarval')
  datorval()
}
function datorval () {
  let val =Math.floor(Math.random() * 3)
  let alternativ = ['Sten', 'Sax', 'Påse']
  let buttons = document.getElementsByClassName('alternativ')
  for (let b of buttons) {
    b.classList.remove('datorval')
    b.title=""
    if(b.textContent == alternativ[val]) {
      b.classList.add('datorval')
      b.title="Datorns val"
    }
  }
}

</script>

<template>
  <header>
    <h1>Sten, sax påse!</h1>
  </header>

  <main>
    <div class="knapprad">
      <button class="alternativ" @click="spelarval">Sten</button>
      <button class="alternativ" @click="spelarval">Sax</button>
      <button class="alternativ" @click="spelarval">Påse</button>
    </div>
    <div class="resultat">
      <p id="resultat">{{resultat}}</p>
    </div>
    <div class="score">
      <p>
        <span id="spelare">{{ score.spelare }}</span> - 
        <span id="dator">{{ score.dator }}</span>
      </p>
    </div>
  </main>
</template>

<style scoped>
header {
  text-align: center;
  margin-bottom: 1.2em;
}
button {
  padding: .6em 1.2em;
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
  gap: .6em;
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
