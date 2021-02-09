<template>
  <div>
    <q-form
      class="q-gutter-md q-pa-lg shadow-1 form-box"
      @validation-success="login()"
      @submit.prevent>
      <h3 class="login-text">
        Entre com seus dados para acessar
      </h3>
      <forms-input
        v-model="email"
        label="Email"
        :rules="[val => val.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || 'Insira um email válido.']"
      />
      <forms-input
        v-model="password"
        label="Senha"
        type="password"
        :rules="[ val => val && val.length >= 8 || 'Insira uma senha com ao menos 8 caracteres.']"
      />
      <submit-button label="Entrar"/>
    </q-form>
    <div class="col-12 q-pa-md text-center">
      Não possui uma conta?
      <a href="/register">Cadastre-se</a>
    </div>
  </div>
</template>
<script>
import FormsInput from './FormsInput'
import { loginRequest } from '../utils/login'
import { mapActions } from 'vuex'
import SubmitButton from './SubmitButton.vue'

export default {
  name: 'LoginForm',
  components: {
    FormsInput,
    SubmitButton
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('userStore', ['saveUserInfo']),
    login () {
      loginRequest({
        email: this.email,
        password: this.password
      }, this.logged, this.errorOnLogin)
    },
    logged (user) {
      this.saveUserInfo(user)
      this.$q.notify({
        type: 'positive',
        message: 'Voce está autenticado.'
      })
      this.$router.push('/')
    },
    errorOnLogin (err) {
      console.log(err)
      this.$q.notify({
        type: 'negative',
        message: 'Falha ao acessar sua conta. Tente novamente.'
      })
    }
  }

}
</script>
<style lang="scss" scoped>
  .login-text {
    font-family: Roboto;
    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.25px;
    text-align: center;
    color: rgba(0, 0, 0, 0.6);
  }
</style>
