<script setup>
import { ref } from 'vue'

const list = ref([])
const itemText = ref('')

function addItem() {
  let listItem = { text: itemText.value, done: false }
  list.value.push(listItem)
  itemText.value = ''
}
function radera(listItem) {
  list.value = list.value.filter((obj)=> {
    return obj !== listItem 
  })
}
</script>

<template>
  <header>
    <h1>ToDo-Lista</h1>
    <input type="text" v-model="itemText" placeholder="Ny uppgift" />
    <button v-on:click="addItem">Lägg till</button>
  </header>

  <main>
    <h3 id="todo">Att göra:</h3>
    <ul>
      <template v-for="itm in list" v-bind:key="itm">
        <li v-if="!itm.done" class="todoItm" @click="itm.done = !itm.done">
          {{ itm.text }}<span title="Radera" @click="radera(itm)">X</span>
        </li>
      </template>
    </ul>
    <h3 id="klart">Klart:</h3>
    <ul>
      <template v-for="itm in list"  v-bind:key="itm">
        <li v-if="itm.done" class="todoItm done" @click="itm.done = !itm.done">
          {{ itm.text }}<span title="Radera" @click="radera(itm)">X</span>
        </li>
      </template>
    </ul>
  </main>
</template>

<style scoped>
header {
  color: purple;
}
  body {
    background-color: rgb(221, 73, 221);
  }
.todoItm {
  font-weight: bold;
  padding: 0.5em;
  list-style-type: none;
  cursor: pointer;
}
.todoItm:nth-child(odd) {
  background-color: green;
  color: black;
}
.todoItm:nth-child(even) {
  background-color:purple;
  color: black;
}
.done {
  text-decoration: line-through solid black;
}
#klart {
  color: purple;
}
#todo {
  color: green;
}
li span {
  display: inline-block;
  position: absolute;
  right: 3em;
  background-color: rgb(224, 13, 224) ;
  color: wheat;
  padding-left: 0.5em;
  padding-right: 0.5em;
}
</style>

