<template>
  <div class="map-wrapper">
    <l-map
      class="rounded-borders cursor-not-allowed map-dimension"
      :bounds="mapBounds"
      :options="mapOptions"
      :zoom="zoom_ratio"
      :center="center"
      id="region-map">

      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />

      <l-marker
        v-for="transductor in transductors_points"
        :key="transductor.id"
        :lat-lng="transductor.coordinates">
        <l-icon
          :icon-size="[16, 16]">
          <img :src="transductor.img_src">
        </l-icon>
      </l-marker>

      <l-marker
        v-for="switchPoint in switchesPoints"
        :key="switchPoint.id"
        :lat-lng="switchPoint.latLng">
        <l-icon
          :icon-size="[16, 16]">
          <img src="../../statics/ic_ocorrencia_4.svg">
        </l-icon>
      </l-marker>

      <l-line
      v-for="item in unifilarDiagram"
          :key="item.key"
          :lat-lngs="item.points"
          :color=getColorStatus(item.status)
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
    switches: {
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

      center: [-15.7650, -47.8665],
      new_center: [-15.7658756, -47.8743207],
      zoom_ratio: 16,

      mapOptions: {
        zoomControl: true
      },

      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      selectedPeriod: 'DIA',
    }
  },

  computed: {
    transductors_points () {
      const arr = []
      if (this.transductors === 0) {
        return [[], []]
      }

      const mapTrans = {}
      let i = 4
      // Mark occurences in mapTrans
      this.occurences.forEach(occ => {
        occ.forEach(o => {
          mapTrans[o.transductor] = `statics/ic_ocorrencia_${i}.svg`
        })
        i -= 1
      })

      this.transductors.forEach(t => {
        if (mapTrans[t.id]) {
          arr.push({
            id: t.id,
            name: t.name,
            coordinates: [t.geolocation_latitude, t.geolocation_longitude],
            img_src: mapTrans[t.id]
          })
        } else {
          arr.push({
            id: t.id,
            name: t.name,
            coordinates: [t.geolocation_latitude, t.geolocation_longitude],
            img_src: 'statics/ic_sem_ocorrencia.svg'
          })
        }
      })

      return arr
    },

    switchesPoints(){
        return this.switches.map(item => {
          return {
            id:item.id,
            latLng: [item.destination_station_latitude,item.destination_station_longitude]
          };
        })
    },

    mapBounds () {
      const arr = []
      this.transductors.forEach((point) => {
        const latlng = []
        latlng.push(point.geolocation_latitude)
        latlng.push(point.geolocation_longitude)
        arr.push(latlng)
      })
      return arr
    }
  },

  methods: {
    getColorStatus (isWorking) {
      return isWorking ? 'green' : 'red'
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
  ::v-deep .leaflet-layer {
    filter: invert(100%) hue-rotate(180deg) brightness(100%) contrast(85%);
  }
  .vue2leaflet-map {
    background: #23201C;
  }
</style>
