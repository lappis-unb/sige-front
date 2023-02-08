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
          <q-input
            outlined
            v-model="fullname"
            label="Nome completo"
            lazy-rules
            :rules="[  val => !!val || 'Insira seu nome completo.']"/>
          <q-input
            outlined
            v-model="email"
            label="Email"
            lazy-rules
            :rules="[  val => val.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || 'Insira um email válido.']"/>
          <q-input
            outlined
            v-model="password"
            label="Senha"
            lazy-rules
            password
            type="password"
            :rules="[ val => val && val.length >= 8 || 'Insira uma senha com ao menos 8 caracteres.']"/>
          <q-input
            outlined
            v-model="password_confirmation"
            label="Confirme a senha"
            lazy-rules
            password
            type="password"
            :rules="[ val => val && val.length >= 8 || 'Insira uma senha com ao menos 8 caracteres.', val => val === this.password || 'Confirmação deve ser iqual a senha informada']"/>
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

require('./style/Register.css')

export default {
  name: 'Register',
  created () {
    this.changePage('Cadastro')
  },
  data () {
    return {
      fullname: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  },
  methods: {
    ...mapActions('userStore', ['changePage', 'saveUserInfo']),
    register () {
      MASTER
        .post('users/', {
          email: this.email,
          password: this.password,
          name: this.fullname
        })
        .then(res => {
          console.log(res)
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
            message: 'Falha ao criar sua conta. Tente novamente.'
          })
        })
    }
  }
}
</script>


