<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps(['vinnare', 'reset'])
const score = ref({ spelare: 0, dator: 0 })

const stats = ref({
  vinster: 0, // Antal vinster för spelaren
  förluster: 0, // Antal förluster för spelaren
  oavgjorda: 0 // Antal oavgjorda matcher
})

// Beräkna det totala antalet matcher
const totalMatches = computed(
  () => stats.value.vinster + stats.value.förluster + stats.value.oavgjorda // Summera alla matcher
)

const resetStats = () => {
  stats.value.vinster = 0
  stats.value.förluster = 0
  stats.value.oavgjorda = 0
  score.value.spelare = 0
  score.value.dator = 0
}

watch(
  () => props.vinnare, // Observera 'vinnare' från props
  (NyVinnare) => {
    if (NyVinnare === 'spelare') {
      stats.value.vinster++ // Öka spelarens vinster
      score.value.spelare++ // Uppdatera poängen
    } else if (NyVinnare === 'dator') {
      stats.value.förluster++ // Öka spelarens förluster
      score.value.dator++ // Uppdatera poängen
    } else if (NyVinnare === 'oavgjort') {
      stats.value.oavgjorda++ // Öka oavgjorda
    }
  }
)

// Beräkna vinstprocenten
const winPercentage = computed(() => {
  // Om det finns matcher spelade, räkna ut vinstprocenten, annars 0
  return totalMatches.value > 0 ? ((stats.value.vinster / totalMatches.value) * 100).toFixed(2) : 0
})

watch(props, () => {
  if (props.vinnare === 'spelare') {
    score.value.spelare++
  } else if (props.vinnare === 'dator') {
    score.value.dator++
  }
})

watch(
  () => props.reset,
  () => {
    if (props.reset) {
      score.value.spelare = 0
      score.value.dator = 0
    }
  }
)
</script>
<template>
  <div class="score">
    <p>
      <span id="spelare">
        {{ score.spelare }}
      </span>
      -
      <span id="dator">
        {{ score.dator }}
      </span>
    </p>
  </div>
  <div class="statistics">
  <h3>Statistik</h3>
  <p>Vinster: {{ stats.vinster }}</p>
  <p>Förluster: {{ stats.förluster }}</p>
  <p>Oavgjorda: {{ stats.oavgjorda }}</p>
  <p>Vinstprocent: {{ winPercentage }}%</p>
  <button @click="resetStats">Återställ statistik</button>
</div>
</template>
<style scoped></style>
