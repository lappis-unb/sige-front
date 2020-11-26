<template>
    <q-input
      outlined
      :label="label"
      lazy-rules
      :rules="rules"
      :type="type"
      :value="value"
      v-on:input="updateValue"
    />

</template>
<script>

export default {
  name: 'LoginInput',
  props: [
    'label',
    'rules',
    'type',
    'value'
  ],
  data () {
    return {
      input: ''
    }
  },
  methods: {
    updateValue (newVal) {
      this.$emit('input', newVal)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
