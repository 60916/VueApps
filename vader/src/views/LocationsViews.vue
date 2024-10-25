<script setup>
import router from '@/router'
import { getPosition } from '@/services/positioningService'
import { onMounted, ref } from 'vue'

const location = ref({
  name: '',
  position: { lat: 0, long: 0 },
  default: false,
})

const locationsList = ref([])

onMounted(() => {
  locationsList.value = JSON.parse(localStorage.getItem('locations'))
  let current = locationsList.value.find(loc => {
    return loc.name === 'Current location'
  })
  if (!current) {
    current = {
      name: 'Current location',
      position: { lat: 0, long: 0 },
      default: false,
    }
    locationsList.value.unshift(current)
  }

  getPosition()
    .then(response => {
      current.position = response.position
      let index = locationsList.value.findIndex(loc => {
        return loc.name === 'Current location'
      })
      locationsList.value.splice(index, 1, current)
      localStorage.setItem('locations', JSON.stringify(locationsList.value))
    })
    .catch(err => {
      let index = locationsList.value.findIndex(loc => {
        return loc.name === 'Current location'
      })
      locationsList.value.splice(index, 1)
      console.log(err)
    })
})

function addLocation() {
  const newLocation = {
    name: location.value.name,
    position: {
      lat: location.value.position.lat,
      long: location.value.position.long,
    },
    default: locationsList.value.length === 0 ? true : false,
  }

  locationsList.value.push(newLocation)

  location.value = { name: '', position: { lat: 0, long: 0 }, default: false }
  localStorage.setItem('locations', JSON.stringify(locationsList.value))
}
function resetLocation() {
  location.value = { name: '', position: { lat: 0, long: 0 }, default: false }
}

function removeLocation(index) {
  if (locationsList.value[index].default) {
    locationsList.value.splice(index, 1)

    if (locationsList.value.length > 0) {
      locationsList.value[0].default = true
    }
  } else {
    locationsList.value.splice(index, 1)
  }
  localStorage.setItem('locations', JSON.stringify(locationsList.value))
}
function setDefaultLocation(index) {
  locationsList.value.forEach((loc, i) => {
    loc.default = i === index ? true : false
  })
  localStorage.setItem('locations', JSON.stringify(locationsList.value))
  router.push(`/forecast/${locationsList.value[index].name}`)
}
</script>
<template>
  <h2>Locations</h2>
  <label>Namn: <input type="text" v-model="location.name" /></label>
  <label
    >Lat:
    <input
      type="number"
      max="90"
      min="-90"
      step=".1"
      size="5"
      v-model="location.position.lat"
  /></label>
  <label
    >Long:
    <input
      type="number"
      max="180"
      min="-180"
      step=".1"
      size="8"
      v-model="location.position.long"
  /></label>
  <button @click="addLocation">Save</button>
  <button @click="resetLocation">Reset</button>
  <hr />
  <h3>List</h3>
  <ul>
    <li
      v-for="(loc, index) in locationsList"
      :key="loc"
      :class="loc.default ? 'default' : ''"
      @click="setDefaultLocation(index)"
    >
      {{ loc.name }}, ( {{ Math.abs(loc.position.lat).toFixed(2) }}°{{
        loc.position.lat > 0 ? 'N' : 'S'
      }}
      {{ Math.abs(loc.position.long).toFixed(2) }}°{{
        loc.position.long > 0 ? 'E' : 'W'
      }})
      <span
        class="remove"
        @click.stop="removeLocation(index)"
        v-show="loc.name !== 'Current location'"
        >x</span
      >
    </li>
  </ul>
</template>

<style scoped>
label {
  display: block;
  width: 15em;
  padding-top: 0.5em;
}
.remove {
  display: inline-block;
  padding: 5px 10px;
  margin-left: 10px; /* Skapar lite avstånd från texten */
  color: white; /* Textfärg */
  background-color: #ff4d4d; /* Röd bakgrundsfärg */
  border: none; /* Ingen kantlinje */
  border-radius: 5px; /* Rundade hörn */
  cursor: pointer; /* Visar en hand när musen svävar över knappen */
  transition: background-color 0.3s ease; /* Mjuk övergång för bakgrundsfärgen */
}

.remove:hover {
  background-color: #ff1a1a; /* Mörkare röd vid hover */
}

.remove:active {
  background-color: #cc0000; /* Ännu mörkare röd vid klick */
}
.default {
  font-weight: bold;
}
ul {
  display: grid;
  grid-template-columns: auto;
}
li {
  margin-top: 1em;
  display: inline-block;
}
</style>
