<template>
  <q-page class="flex flex-center">
    <div class="row justify-center q-pa-md">
      <project-info/>
    <div class="col-md-4 col-lg-5 q-pa-lg">
      <login-form />
    </div>
  </div>
  </q-page>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
import ProjectInfo from '../components/ProjectInfo.vue'
export default {
  name: 'Login',
  components: {
    LoginForm,
    ProjectInfo
  }
}
</script>
