<script setup>
import { ref, watchEffect } from 'vue'
import { getForecast } from '@/services/forecastService'
import ForecastResult from '@/components/ForecastResult.vue'
import { getCurrent } from '@/services/currentService'
import CurrentResult from '@/components/CurrentResult.vue'

const currentLocation = ref({
  lat: 60.0,
  long: 20.0,
  name: 'Nuvarande position',
})
const forecast = ref({})
const current = ref({})
const props = defineProps(['location'])

watchEffect(() => {
  let locationsList = JSON.parse(localStorage.getItem('locations'))
  if (props.location) {
    currentLocation.value = locationsList.find(loc => {
      return loc.name.toLocaleLowerCase() === props.location.toLocaleLowerCase()
    })
  } else {
    currentLocation.value = locationsList.find(loc => {
      return loc.default
    })
  }
  if (currentLocation.value) {
    getForecast(currentLocation.value)
      .then(response => {
        forecast.value = response
      })
      .catch(err => {
        console.log(err)
      })
    getCurrent(currentLocation.value)
      .then(response => {
        current.value = response
      })
      .catch(err => {
        console.log(err)
      })
  }
})
</script>

<template>
  <template v-if="!currentLocation">
    <h2>Angiven plats saknas</h2>
    <p>{{ props.location }} finns inte i listan över platser</p>
  </template>
  <template v-else>
    <h2>{{ currentLocation.name }}</h2>
    <p class="location">
      Lat: <span>{{ currentLocation.position.lat.toFixed(3) }}</span>
    </p>
    <p class="location">
      Long: <span>{{ currentLocation.position.long.toFixed(3) }}</span>
    </p>
    <h3>Idag:</h3>
    <CurrentResult :current="current" />
    <h3>Denna Vecka:</h3>
    <ForecastResult :forecast="forecast" />
  </template>
</template>
<style scoped>
.location {
  display: inline-block;
  margin: 0 1em;
}
</style>
