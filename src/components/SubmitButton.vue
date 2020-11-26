<template>
  <div class="text-center q-mt-lg">
  <q-btn
    size="1rem"
    :label="label"
    type="submit"
    color="primary"/>
</div>
</template>

<script>
export default {
  name: 'SubmitButton',
  props: [
    'label'
  ]
}
</script>
