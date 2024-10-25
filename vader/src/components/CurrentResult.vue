<script setup>
import wc from '@/assets/data/weatherCodes.json'
import { ref } from 'vue'

const props = defineProps(['current'])
const weatherCodes = ref(wc)

function getText(code) {
  let wcText =
    weatherCodes.value.find(itm => {
      return itm.code == code
    }).description ?? 'Unknown'
  return wcText
}
</script>

<template>
  <ul>
    <li>Date</li>
    <li>Temp</li>
    <li>Precip</li>
    <li>Wind</li>
    <li>Humidity</li>
    <li>Coverage</li>
    <li>Pressure</li>
  </ul>
  <ul v-for="day in props.current.weather" :key="day.date">
    <li>
      {{ new Date(day.date).getDate() }}.{{ new Date(day.date).getMonth() + 1 }}
      <br />
      {{ getText(day.code) }}
    </li>
    <li>
      {{ day.temp.current_temp }} °C<br />
      feels like {{ day.temp.app_temp }} °C
    </li>
    <li>{{ day.precipitation }}mm<br /></li>
    <li>
      {{ Math.round(day.wind.speed) }} ({{
        Math.round(day.wind.gusts)
      }})m/s<br />
      {{ day.wind.direction }}{{ day.wind.direction_unit }}
    </li>
    <li>{{ day.humidity }}%</li>
    <li>{{ day.cloud }}%</li>
    <li>{{ day.pressure }}hPa</li>
  </ul>
</template>

<style scoped>
ul {
  padding: 0;
  display: grid;
  grid-template-columns: 10% 10% 10% 10% 10% 10% auto;
}
ul:nth-child(even) {
  background-color: aqua;
}
ul:nth-child(odd) {
  background-color: antiquewhite;
}
li {
  padding: 0 0.5em;
  list-style-type: none;
  display: inline-block;
  color: black;
  vertical-align: top;
  border: 1px solid black;
}
</style>
