<template>
  <linechart
    title="Tension"
    url="total_reactive_power"
    y_min="-300"
    y_max="300"
    graphic_type="1"/>
</template>

<script>
import LineChart from 'components/charts/LineChart.vue'

export default {
  components: {
    linechart: LineChart
  }
}
</script>

<style>

</style>
