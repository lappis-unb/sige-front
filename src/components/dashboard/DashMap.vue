<template>
  <div class="map-wrapper">
    <l-map
      class="rounded-borders cursor-not-allowed map-dimension"
      :zoom="currentCampus.zoom_ratio || 16"
      :min-zoom="currentCampus.zoom_ratio || 16"
      :max-zoom="currentCampus.zoom_ratio || 16"
      :options="mapOptions"
      :center="mapCenter"
      id="region-map">

      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />

      <!-- for custom icons -->
      <l-marker
        v-for="transductor in transductorsWithOccurences"
        :key="transductor.id"
        :lat-lng="transductor.coordinates">
        <l-icon
          :icon-size="[16, 16]">
          <img :src="transductor.img_src">
        </l-icon>
      </l-marker>

      <l-circle
        v-for="transductor in transductorsWithoutOccurences"
        :key="transductor.id"
        :lat-lng="transductor.coordinates"
        :radius="14"
        :l-style="transductor.style"
        :hover="true"
      />

      <l-line
        v-for="line in lines"
        :key="line.id"
        :lat-lngs="line.coordinates"
        :color="line.color"
      />

    </l-map>
  </div>
</template>

<script>
import Vue2Leaflet from '../../services/ssr-import/leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  components: {
    'l-marker': Vue2Leaflet.LMarker,
    'l-icon': Vue2Leaflet.LIcon,
    'l-map': Vue2Leaflet.LMap,
    'l-circle': Vue2Leaflet.LCircle,
    'l-tile-layer': Vue2Leaflet.LTileLayer,
    'l-line': Vue2Leaflet.LPolyline
  },

  props: {
    transductors: {
      type: Array,
      required: true
    },
    occurences: {
      type: Array,
      required: true
    },
    unifilarDiagram: {
      type: Array,
      required: true
    },
    currentCampus: Object,
    selectedTransductor: Object
  },

  data () {
    return {
      url1: process.env,

      colors: [
        '#023E73',
        '#F29F05',
        '#088521'
      ],

      generation: [],

      // center: [-15.7650, -47.8665],
      center: [-15.7650, -47.8665],
      new_center: [-15.7658756, -47.8743207],

      mapOptions: {
        zoomControl: false,
        maxbounds: this.center
      },

      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      // url: 'https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png',
      attribution:
        '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      selectedPeriod: 'DIA'
    }
  },

  computed: {
    transductorsWithOccurences () {
      let mapOccurencesInTranductors = {}
      mapOccurencesInTranductors = this.getMapOccurencesInTranductors()
      let transductorsArray = []
      transductorsArray = []
      this.transductors.forEach(_transductor => {
        if (mapOccurencesInTranductors[_transductor.serial_number]) {
          transductorsArray.push({
            id: _transductor.id,
            name: _transductor.name,
            coordinates: [
              _transductor.geolocation_latitude,
              _transductor.geolocation_longitude
            ],
            img_src: mapOccurencesInTranductors[_transductor.serial_number]
          })
        }
      })
      return transductorsArray
    },
    transductorsWithoutOccurences () {
      let mapOccurencesInTranductors = {}
      mapOccurencesInTranductors = this.getMapOccurencesInTranductors()
      let transductorsArray = []
      transductorsArray = []
      this.transductors.forEach(_transductor => {
        if (!mapOccurencesInTranductors[_transductor.serial_number]) {
          transductorsArray.push({
            id: _transductor.id,
            name: _transductor.name,
            coordinates: [
              _transductor.geolocation_latitude,
              _transductor.geolocation_longitude
            ],
            style: {
              color: !_transductor.broken ? 'green' : '#CC0000',
              fillColor: !_transductor.broken ? 'lime' : '#FF0000',
              fillOpacity: 1
            }
          })
        }
      })
      return transductorsArray
    },
    lines () {
      let pointsArray = []
      pointsArray = []
      if (this.unifilarDiagram.lenght === 0) {
        return pointsArray
      }

      this.unifilarDiagram.forEach(line => {
        pointsArray.push({
          id: line.id,
          coordinates: [
            [line.start_lat, line.start_lng],
            [line.end_lat, line.end_lng]
          ],
          color: '#98274d'
        })
      })

      return pointsArray
    },
    mapCenter () {
      if (!(this.currentCampus.geolocation_latitude)) {
        if (this.currentCampus.name.toLowerCase().includes('gama')) {
          return [15.9894 - 48.0443] // gama's geo-pos
        } else {
          return [-15.7636, -47.8694] // darcy's geo-pos
        }
      }
      return [this.currentCampus.geolocation_latitude, this.currentCampus.geolocation_longitude]
    }
  },

  methods: {
    getMapOccurencesInTranductors () {
      let mapTransductors = {}
      mapTransductors = {}

      let i = 4 // Number of diferent type of occurences
      // Mark occurences in mapTransductors
      this.occurences.forEach(occurenceType => {
        occurenceType.forEach(occurence => {
          mapTransductors[occurence.transductor] = `statics/ic_ocorrencia_${i}.svg`
        })
        i -= 1
      })

      return mapTransductors
    },
    getColorStatus (isBroken) {
      return isBroken ? 'text-red-9' : 'text-green-9'
    }
  }
}

</script>

<style lang="scss" scoped>
  .map-dimension {
    height: 53.9vh;
  }

  .map-wrapper {
    padding-right: 16px;
  }

  @media screen and (max-width: 1440px) {
    .map-dimension {
      height: 100% !important;
    }
  }

  @media screen and (max-width: 800px) {
    .map-wrapper {
      padding-right: 0 !important;
    }

    .map-dimension {
      height: 53.9vh !important;
    }
  }
</style>
