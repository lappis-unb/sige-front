<template>
    <div>
      <div class="btn">
        <q-btn
          size="1rem"
          label="Adicionar"
          color="primary"
          @click="handlePressButton('new')"/>
      </div>
      
      <div class="container">
        <q-form class="q-gutter-md form-box" @submit="submitTransmissionLineForm">
            <h4 class="form-title">Cadastro de Linhas de transmissão</h4>
            <q-select
                class="inputField"
                outlined
                :options="campi"
                option-value="id"
                option-label="name"
                v-model="queryCampus"
                label="Campus"
                @input="getLocationFromCampus"
              />
            <q-select
              outlined
              v-model="transmissionLine.origin_station"
              :options="locations"
              class="inputField"
              option-label="name"
              option-value="id"
              label="Origem"
              emit-value
              map-options

            />
            <q-select
              outlined
              class="inputField"
              v-model="transmissionLine.destination_station"
              :options="locations"
              option-label="name"
              option-value="id"
              map-options
              emit-value
              label="Destino"
            />
            <div class="text-center q-mt-lg">
              <q-btn 
                size="1rem" 
                label="Cadastrar Linha de Transmissão" 
                type="submit" 
                color="primary" />
            </div>
          </q-form>

          <hr class="divider">

          <q-form class="q-gutter-md form-box" @submit="submitTransmissionSwitchForm">
            <h4 class="form-title">Cadastro de Chaves</h4>
            <q-select
                class="inputField"
                outlined
                :options="campi"
                option-value="id"
                option-label="name"
                v-model="queryCampus"
                label="Campus"
                @input="getLocationFromCampus"
              />
            <q-select
              outlined
              :options="locations"
              option-value="id"
              v-model="switchSelected.origin_station"
              emit-value
              map-options
              option-label="name"
              label="Linha de transmissão"
            />
            <q-select
              outlined
              :options="locations"
              option-value="id"
              v-model="switchSelected.destination_station"
              emit-value
                  map-options
              option-label="name"
              label="Ponto da chave"
            />
            <div class="text-center q-mt-lg">
              <q-btn size="1rem" label="Cadastrar Chave" type="submit" color="primary" />
            </div>
          </q-form>

          <hr class="divider">

            <div class="illustration-container">
                <h4 class="illustration-title">Mapa Ilustrativo</h4>
                <div class="illustration-content">
                <p>linha1 -> linha2 -> linha3 -> chaveA -> chaveB.</p>
                </div>
            </div>
        
        <q-dialog v-model="isCreatingNew" class="dialog">
          <q-card>
            <q-card-section>
              <div class="text-h6">Nova Localização</div>
            </q-card-section>
  
            <q-card-section class="q-pt-none">
              <q-form
              class="q-gutter-md"
              @submit="postLocation()"
              id="post-form"
              >
                <div class="inputDiv">
                  <label>Nome: </label>
                  <q-input
                  class="inputField"
                  outlined
                  v-model="newLocation.name"
                  label="Nome dessa localização"/>
                </div>
  
                <div class="inputDiv">
                  <label>Latitude: </label>
                  <q-input
                  class="inputField"
                  outlined
                  v-model="newLocation.latitude"
                  label="Latitude"/>
                </div>
  
                <div class="inputDiv">
                  <label>Longitude: </label>
                  <q-input
                  class="inputField"
                  outlined
                  v-model="newLocation.longitude"
                  label="Longitude"/>
                </div>
  
                <div class="inputDiv">
                  <label>Campus: </label>
                  <q-select
                  class="inputField"
                  outlined
                  :options="campi"
                  option-value="id"
                  option-label="name"
                  emit-value
                  map-options
                  v-model="newLocation.campus"
                  label="Campus"/>
                </div>
              </q-form>
            </q-card-section>
  
            <q-card-actions align="right">
              <q-btn
                size="1rem"
                label="Salvar"
                type="submit"
                color="primary"
                form="post-form"/>
              <q-btn
                size="1rem"
                label="Cancelar"
                color="primary"
                v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </template>
  
  <script>
  import MASTER from '../services/masterApi/http-common'

  export default {
    data () {
      return {
          transductors: [],
          transductor: {},
          isCreatingNew: false,
          campi: [],
          queryCampus: undefined,
          switchSelected: {
            origin_station:"",
            destination_station: ""
          },
          newLocation: {
          name: "",
          latitude: "",
          longitude: "",
          campus: ""
          },
          locations: [],

          transmissionLine: {
            origin_station: "",
            destination_station: "",
            active: true,
          },
      }
    },
    async created () {
      await this.getCampi()
    },
    methods: {
      getCampi () {
        return new Promise((resolve) => {
          MASTER
            .get('campi/', this.campi)
            .then(res => {
              this.campi = res.data
              resolve()
            })
            .catch(err => {
              console.log(err)
              resolve()
            })
        })
      },
      handlePressButton (type, id = null) {
        const options = {
          new: () => {
            this.isCreatingNew = !this.isCreatingNew
          },
          show: () => {
            this.isCreatingNew = false
            this.getTransductor(id)
          }
        }
        if (options[type]) options[type]()
      },
      getLocationFromCampus () {
        return new Promise((resolve) => {
          MASTER
            .get(`location/?campus=${this.queryCampus.id}`, {})
            .then(res => {
              this.locations = res.data
              resolve()
            })
            .catch(err => {
              console.log(err)
              resolve()
            })
        })
      },
      submitTransmissionSwitchForm(){
        // Validação dos campos
        if (
          !this.switchSelected.origin_station ||
          !this.switchSelected.destination_station
        ) {
          this.$q.notify({
              type: 'negative',
              message: 'Preencha os campos corretamente.'
            })
          return;
        }
        MASTER
          .post('switch/', this.switchSelected)
          .then(res => {
            console.log(res)
            this.$q.notify({
              type: 'positive',
              message: 'Switch adicionada com sucesso.'
            })
          })
          .catch(err => {
            this.$q.notify({
              type: 'negative',
              message: 'Falha ao adicionar Switch. Tente novamente.'
            })
            console.log(err)
          })

      },
      submitTransmissionLineForm(){
         // Validação dos campos
         if (
          !this.transmissionLine.origin_station ||
          !this.transmissionLine.destination_station
        ) {
          this.$q.notify({
              type: 'negative',
              message: 'Preencha os campos corretamente'
            })
          return;
        }
        MASTER
          .post('lines/', this.transmissionLine)
          .then(res => {
            console.log(res)
            this.$q.notify({
              type: 'positive',
              message: 'Linha de transmissão adicionada com sucesso.'
            })
          })
          .catch(err => {
            this.$q.notify({
              type: 'negative',
              message: 'Falha ao adicionar Linha de transmissão. Tente novamente.'
            })
            console.log(err)
          })

      },
      postLocation() {
        // Validação dos campos
        if (
          !this.newLocation.name ||
          !this.newLocation.latitude ||
          !this.newLocation.longitude || 
          !this.newLocation.campus
        ) {
          this.$q.notify({
              type: 'negative',
              message: 'Preencha os campos corretamente.'
            })
          return;
        }
        MASTER
          .post('location/', this.newLocation)
          .then(res => {
            console.log(res)
            this.$q.notify({
              type: 'positive',
              message: 'Location adicionada com sucesso.'
            })
          })
          .catch(err => {
            this.$q.notify({
              type: 'negative',
              message: 'Falha ao adicionar Location. Tente novamente.'
            })
            console.log(err)
          })

      },
    },
  };
  </script>
  <style lang="scss" scoped>

.btn {
  margin-top  : 54px;
  margin-right : 25px;
  text-align  : right;
}
  .container {
    font-size: 25px;
    grid-template-columns: 30% 1fr;
    gap: 10px;
    height: 100vh;
    max-width: 100vw;
    padding: 10px;
  }

  .illustration-container {
  width: 100%;
  max-width: 100vw;
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  margin-top: 20px;
}

.illustration-title {
  text-align: center;
  margin-bottom: 10px;
}

.illustration-content {
  margin-top: 10px;
  color: #555;
}
.q-card {
  width: 50% !important;
}

</style>