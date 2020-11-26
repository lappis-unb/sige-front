<template>
  <div>
    <h3 class="title">Lista de Campi </h3>
    <div class="btn">
      <q-btn
        size="1rem"
        label="Novo"
        color="primary"
        @click="handlePressButton('newCampi')"/>
    </div>
    <div class="container">
      <div class="lst-campi">
        <ul>
          <li v-for="(campi,index) in campis" :key="index">
            <p class="lst-item">
              {{index}} - {{campi.name}} - {{campi.acronym}}
            <q-btn
              size="1rem"
              label="show"
              @click="handlePressButton('showCampi', campi.id)"
              color="primary"/>
              </p>
          </li>
        </ul>
      </div>
      <div class="campi-info" v-if="isCreatingNew">
        <h3 class="login-text">
          Novo Campi
        </h3>
        <q-form
          class="q-gutter-md"
          @submit="postCampi()"
          >
          <q-input
            outlined
            v-model="newCampi.name"
            label="Nome do Campi"/>
          <q-input
            outlined
            v-model="newCampi.acronym"
            label="Acronym"/>
          <q-input
            outlined
            v-model="newCampi.geolocation_latitude"
            label="Latitude"/>
          <q-input
            outlined
            v-model="newCampi.geolocation_longitude"
            label="Longitude"/>
          <q-input
            outlined
            v-model="newCampi.zoom_ratio"
            label="Map Zoom"/>
          <div class="text-center q-mt-lg">
            <q-btn
              size="1rem"
              label="Enviar"
              type="submit"
              color="primary"/>
          </div>
        </q-form>
      </div>
      <div class="campi-info" v-if="isSelectedCampi">
        <h3 class="login-text">
          Editar dados
        </h3>
        <p>Id: {{campi.id}}</p>
        <p>Transductors: {{campi.transductors}}</p>
        <q-form
        class="q-gutter-md"
        @submit="putCampi()"
        >
        <q-input
          outlined
          v-model="campi.name"
          label="Nome do Campi"/>
        <q-input
          outlined
          v-model="campi.acronym"
          label="Acronym"/>
        <q-input
          outlined
          v-model="campi.geolocation_latitude"
          label="Latitude"/>
        <q-input
          outlined
          v-model="campi.geolocation_longitude"
          label="Longitude"/>
        <q-input
          outlined
          v-model="campi.zoom_ratio"
          label="Map Zoom"/>
        <div class="text-center q-mt-lg">
          <q-btn
            size="1rem"
            label="Salvar"
            type="submit"
            color="primary"/>
          <q-btn
            size="1rem"
            label="Deletar"
            @click="deleteCampi(campi.id)"
            color="primary"/>
        </div>
      </q-form>
      </div>
    </div>
  </div>
</template>

<script>
import MASTER from '../services/masterApi/http-common'
// import { mapActions } from 'vuex'

export default {
  name: 'Campis',
  data () {
    return {
      campis: [],
      campi: {},
      isSelectedCampi: false,
      isCreatingNew: false,
      newCampi: {}
    }
  },
  created () {
    this.getCampisList()
  },
  methods: {
    handlePressButton (type, id = null) {
      const buttonActions = {
        newCampi: () => {
          this.isSelectedCampi = false
          this.isCreatingNew = !this.isCreatingNew
        },
        showCampi: () => {
          this.isSelectedCampi = true
          this.isCreatingNew = false
          this.getCampiById(id)
        }
      }
      if (buttonActions[type]) buttonActions[type]()
    },
    getCampisList () {
      MASTER
        .get('campi/')
        .then(({ data: campisList }) => {
          this.campis = campisList
        })
        .catch(error => console.log('Error in getCampisList: ', error))
    },
    getCampiById (campiId) {
      MASTER
        .get(`campi/${campiId}`)
        .then(({ data: campi }) => {
          this.campi = campi
          this.isSelectedCampi = true
        })
        .catch(error => console.log('Error in getCampiById: ', error))
    },
    putCampi () {
      const { id: campiId } = this.campi
      MASTER
        .put(`campi/${campiId}`, this.campi)
        .then(({ data: updatedCampi }) => {
          this.campi = updatedCampi
          this.updateCampiList({ ...updatedCampi, id: campiId })
          this.$q.notify({
            type: 'positive',
            message: 'Seus dados foram atualizados.'
          })
        })
        .catch(error => {
          console.log('Error in putCampi: ', error)
          this.$q.notify({
            type: 'negative',
            message: 'Falha ao editar seus dados. Tente novamente.'
          })
        })
    },
    deleteCampi (campiId) {
      MASTER
        .delete(`campi/${campiId}`)
        .then(() => {
          this.removeCampiFromList(campiId)
          this.$q.notify({
            type: 'positive',
            message: 'Campi deletado com sucesso.'
          })
          this.isSelectedCampi = false
          this.campi = {}
        })
        .catch(error => console.log('Error in deleteCampi: ', error))
    },
    postCampi () {
      MASTER
        .post('campi/', this.newCampi)
        .then(({ data: newCampi }) => {
          this.campis.push(newCampi)
          this.newCampi = {}
        })
        .catch(error => console.log('Error in postCampi: ', error))
    },
    updateCampiList (updatedCampi) {
      this.campis = this.campis.map((campi) => campi.id === updatedCampi.id ? updatedCampi : campi)
    },
    removeCampiFromList (campiId) {
      this.campis = this.campis.filter((campi) => campi.id !== campiId)
    }
  }
}
</script>
<style>
.container {
  display               : grid;
  font-size             : 25px;
  grid-template-columns : 30% 1fr;
  gap                   : 10px;
  height                : 100vh;
  max-width             : 100vw;
  padding               : 10px;;
}
.campi-info {
  padding   : 20px;
}
.title {
  padding-left: 20px;
}
.btn {
  padding   : 20px;
}

</style>
