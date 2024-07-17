<template>
  <q-card class="status-card">
    <q-card-section :class="getStatusHeader.class">
      <div class="status-title">
        <q-icon :name="getStatusHeader.icon" />
        {{ getStatusHeader.label}}
      </div>
    </q-card-section>
    <div class="card-content">
      <p class="campus" v-if="this.campusName !== ''">
        Campus {{ this.campusName }}
      </p>
      <q-btn
        v-if="latitude !== null && longitude !== null"
        outline
        class="map-button"
        label="Ver no mapa"
        @click="map()"
      />
    </div>
    <map-modal :center="[latitude, longitude]" />
  </q-card>
</template>

<script>
import MASTER from '../../services/masterApi/http-common'
import mapModal from '../MapModal'
import { mapActions } from 'vuex'

export default {
  name: 'ActiveBox',
  components: {
    mapModal: mapModal
  },
  props: ['id'],
  data() {
    return {
      active: '',
      latitude: null,
      longitude: null,
      name: '',
      campusName: '',
      campusId: ''
    }
  },
  async created() {
    await this.getTransductors()
    await this.getCampus()
  },
  methods: {
    ...mapActions('transductorStore', ['changeMapStatus']),
    map() {
      this.changeMapStatus()
    },
    async getTransductors() {
      try {
        const response = await MASTER.get(`/energy-transductors/${this.id}/`)
        if (response) {
          this.active = response.data.is_generator
          this.latitude = response.data.geo_location.latitude
          this.longitude = response.data.geo_location.longitude
          this.name = response.data.name
          this.campusId = response.data.campus
        }
      } catch (error) {
        console.log("deu merda", error)
      }
    },
    async getCampus() {
      try {
        const response = await MASTER.get(`/entities/`)
        console.log("RESPOSTA DAHORA", response.data[0].children[0].name)
        this.campusName = response.data[0].children[0].name
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    getStatusHeader() {
      if (this.broken) return { label: 'Quebrado', icon: 'flash_off', class: 'broken' }
      if (this.active) return { label: 'Ativo', icon: 'flash_on', class: 'active' }
      return  { label: 'Inativo', icon: 'flash_off', class: 'inactive' }
    }
  }
}
</script>
<style lang="scss" src="./styles.scss" scoped />


