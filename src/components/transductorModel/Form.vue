<template>
  <div class="row justify-center">
    <div class="col-md-4 col-lg-5 q-pa-md">
      <q-form
        class="q-gutter-md"
        @validation-success="send">
        <h3 class="text-secondary">
          Novo modelo de transdutor
        </h3>
        <span
          v-if="response"
          :class="'text-capitalize text-' + messageType">
          {{ message }}
        </span>
        <q-input
          outlined
          name="model_name"
          v-model="transModelName"
          label="Nome do modelo"
          :rules="[ val => val.length > 0 && val.length <= 50 || 'Esse campo deve conter entre 1 e 50 caracteres' ]"/>
        <q-input
          outlined
          name="model_name"
          v-model="transModelSerial"
          label="Protocolo serial"
          :rules="[ val => val.length > 0 && val.length <= 50 || 'Esse campo deve conter entre 1 e 50 caracteres' ]"/>
        <q-input
          outlined
          name="model_name"
          v-model="transModelTransport"
          label="Protocolo de transporte"
          :rules="[ val => val.length > 0 && val.length <= 50 || 'Esse campo deve conter entre 1 e 50 caracteres' ]"/>
        <q-btn
          size="1rem"
          label="Enviar"
          color="primary"
          type="submit"
          :loading="loading"/>
        <q-btn
          size="1rem"
          @click="reset_fields()"
          label="Cancelar"
          color="negative"
          type="reset"/>
      </q-form>
    </div>
  </div>
</template>

<script>
import HTTP from '../../services/masterApi/http-common'

export default {
  data () {
    return {
      transModelName: '',
      transModelSerial: '',
      transModelTransport: '',
      message: '',
      messageType: '',
      response: false,
      loading: false
    }
  },

  methods: {
    send () {
      const masterAddress = 'http://192.168.100.24:8001' || process.env.MASTER_URL
      const data = {
        name: this.transModelName,
        serial_protocol: this.transModelSerial,
        transport_protocol: this.transModelTransport
      }

      console.log(data)
      this.loading = true

      HTTP
        .post(`${masterAddress}/transductor_models/`, data)
        .then((res) => {
          this.loading = false
          console.log(res)
          this.messageType = 'success'
          this.message = 'Criado com sucesso!'
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
          this.messageType = 'negative'
          this.message = err.message
        })
    },
    reset_fields () {
      this.transModelName = ''
      this.transModelSerial = ''
      this.transModelTransport = ''
    }
  }
}
</script>

<style>
</style>
