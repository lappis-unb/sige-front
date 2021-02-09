<template>
  <q-page class="flex flex-center">
    <div class="row justify-center q-pa-xl">
      <div class="col-9 col-lg-5 bg-white q-pa-md shadow-1">
        <q-form
          class="q-gutter-md form-box"
          @validation-success="register()"
          @submit.prevent>
          <div class="text-center helper-text">
            Cadastro reservado para servidores e colaboradores da Universidade de Brasília
          </div>

          <div v-for="item in form" :key="item.label">
            <forms-input
              v-model="item.value"
              :label="item.label"
              :type="item.type"
              :rules="item.rules"
              />
          </div>

          <submit-button label="Cadastrar"/>
        </q-form>
      </div>
    <div class="col-12 q-pa-md text-center">
      Já tem uma conta?
      <a href="/login">Acesse agora</a>
    </div>
  </div>
  </q-page>
</template>

<script>
import MASTER from '../services/masterApi/http-common'
import { loginRequest } from '../utils/login'
import { mapActions } from 'vuex'
import FormsInput from '../components/FormsInput.vue'
import SubmitButton from '../components/SubmitButton.vue'

export default {
  name: 'Register',
  components: { SubmitButton, FormsInput },
  created () {
    this.changePage('Cadastro')
  },
  data () {
    return {
      form: {
        fullname: {
          value: '',
          label: 'Nome completo',
          rules: [val => !!val || 'Insira seu nome completo.']
        },
        email: {
          value: '',
          label: 'Email',
          rules: [val => val.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || 'Insira um email válido.']
        },
        password: {
          value: '',
          label: 'Senha',
          type: 'password',
          rules: [val => (val && val.length >= 8) || 'Insira uma senha com ao menos 8 caracteres.']
        },
        password_confirmation: {
          value: '',
          label: 'Confirme a senha',
          type: 'password',
          rules: [val => (val && val.length >= 8) || 'Insira uma senha com ao menos 8 caracteres.',
            val => val === this.form.password.value || 'Confirmação deve ser iqual a senha informada']
        }
      }
    }
  },
  methods: {
    ...mapActions('userStore', ['changePage', 'saveUserInfo', 'logUser']),
    register () {
      var user = {
        email: this.form.email.value,
        password: this.form.password.value,
        name: this.form.fullname.value
      }
      MASTER
        .post('users/', user)
        .then(res => {
          console.log(res)
          loginRequest(user, this.logged, this.errorOnLogin)
        })
        .catch(err => {
          console.log(err)
          this.$q.notify({
            type: 'negative',
            message: 'Falha ao criar sua conta. Tente novamente.'
          })
        })
    },
    logged (user) {
      this.saveUserInfo(user)
      this.$router.push('/')
      this.$q.notify({
        type: 'positive',
        message: 'Sua conta foi criada com sucesso.'
      })
    },
    errorOnLogin (err) {
      console.log(err)
      this.$router.push('/login')
      this.$q.notify({
        type: 'positive',
        message: 'Acesse sua conta.'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .secondary-text {
    font-size: 1.3em;
  }
  .primary-text {
    font-size: 2em;
  }
  .driver-text {
    color: rgba(0, 64, 126, 100%);
    font-size: 2em;
    text-align: center;
    padding-left: 5%;
    padding-right: 5%;
  }
  .login-text {
    color: rgba(100, 100, 100, 100%);
  }
  .helper-text {
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
