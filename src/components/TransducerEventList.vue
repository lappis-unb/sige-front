<template>
  <button v-on:click="buttonTeste">
    Teste
  </button>
</template>

<script>
export default {
  components: {

  },
  data() {
    return {

    }
  },
  methods: {
    buttonTeste: function () {
      console.log("Botão apertar")
    }
  }   
}
</script>

<style>

</style>