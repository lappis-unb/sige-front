<template>
  <q-page class="flex flex-center">
    <div class="row justify-center q-pa-md q-pa-xl-md-up">
      <div class="col-12 col-md-8 col-lg-5 bg-white q-pa-md shadow-1">
        <q-form
          class="q-gutter-md form-box"
          @validation-success="register"
          @submit.prevent="register">
          <div class="text-center helper-text">
            Cadastro reservado para servidores e colaboradores da Universidade de Brasília
          </div>
          <q-input
            outlined
            v-model="fullname"
            label="Nome completo"
            lazy-rules
            :rules="[ 
              val => !!val || 'Insira seu nome completo.', 
              val => /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(val) || 'Nome inválido. Use apenas letras e espaços.',
              val => val.length >= 3 || 'O nome deve ter no mínimo 3 caracteres.' ]"/>
          <q-input
            outlined
            v-model="email"
            label="Email"
            lazy-rules
            :rules="[ val => val.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || 'Insira um email válido.']"/>
          <div class="password-container">
            <div class="password-fields">
              <q-input
                outlined
                v-model="password"
                label="Senha"
                lazy-rules
                password
                type="password"
                :rules="passwordRules"
                class="password-input"/>
              <q-input
                outlined
                v-model="password_confirmation"
                label="Confirme a senha"
                lazy-rules
                password
                type="password"
                :rules="[ val => val === password || 'Confirmação deve ser igual à senha informada']"
                class="confirm-password-input"/>
            </div>
            <div class="password-requirements-wrapper">
              <PasswordRequirements class="password-requirements" :password="password" :fullname="fullname" />
            </div>
          </div>
          <div class="text-center q-mt-lg">
            <q-btn
              size="1rem"
              label="Cadastrar"
              type="submit"
              color="primary"/>
          </div>
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
import { mapActions } from 'vuex'
import PasswordRequirements from './PasswordRequirements.vue'

export default {
  name: 'Register',
  components: {
    PasswordRequirements
  },
  created () {
    this.changePage('Cadastro')
  },
  data () {
    return {
      fullname: '',
      email: '',
      password: '',
      password_confirmation: '',
      user_type: 'general',
      passwordRules: [
        val => val && val.length >= 8,
        val => /[A-Z]/.test(val),
        val => /[a-z]/.test(val),
        val => /[0-9]/.test(val),
        val => !val.includes(this.fullname)
      ]
    }
  },
  methods: {
    ...mapActions('userStore', ['changePage', 'saveUserInfo']),
    register () {
      this.$refs.form.validate().then(success => {
        if (success) {
          MASTER
            .post('users/', {
              email: this.email,
              password: this.password,
              name: this.fullname,
              user_type: this.user_type
            })
            .then(res => {
              MASTER
                .post('login/', {
                  email: this.email,
                  password: this.password
                })
                .then(res => {
                  this.saveUserInfo({
                    userToken: res.data.token,
                    userID: res.data.user.id,
                    username: res.data.user.name,
                    useremail: res.data.user.email
                  })
                  this.$router.push('/')
                  this.$q.notify({
                    type: 'positive',
                    message: 'Sua conta foi criada com sucesso.'
                  })
                })
                .catch(err => {
                  console.log(err)
                  this.$router.push('/login')
                  this.$q.notify({
                    type: 'positive',
                    message: 'Acesse sua conta.'
                  })
                })
            })
            .catch(err => {
              console.log(err)
              this.$q.notify({
                type: 'negative',
                message: 'Falha ao criar sua conta. Tente novamente, por favor.'
              })
            })
        } else {
          this.$q.notify({
            type: 'negative',
            message: 'Por favor, preencha todos os campos corretamente.'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.col-12.col-md-8.col-lg-5.bg-white.q-pa-md.shadow-1 {
  width: 100%;
  max-width: 600px;
  margin: 0 auto; 
  padding: 20px;
}

@media (min-width: 1440px) {
  .col-12.col-md-8.col-lg-5.bg-white.q-pa-md.shadow-1{
    max-width: 800px;
  }
}

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
.password-container {
  display: flex;
  flex-direction: column;
}
.password-fields {
  flex: 1;
}
.password-input {
  margin-bottom: 1rem;
}
.password-requirements-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem; /* Espaço entre critérios e confirmação de senha */
}
.confirm-password-input {
  margin-top: 1rem;
}
@media (min-width: 600px) {
  .password-container {
    flex-direction: row;
    align-items: flex-start;
  }
  .password-requirements-wrapper {
    margin-top: 0;
    margin-left: 1rem;
    justify-content: flex-start;
  }
}
</style>