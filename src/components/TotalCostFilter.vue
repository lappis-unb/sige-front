<template>
  <div class="containerFilter">
    <div class="adjust">
      <div class="filter">
        <q-select
          v-model="selectedCampus"
          use-input
          map-options
          emit-value
          option-value="id"
          option-label="name"
          input-debounce="0"
          label="Campus"
          :options="campusOptions"
          class="col-4 elem select"
          @input="getGroups(); filterByCampus(selectedCampus); getChart();"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">No results</q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          v-model="selectedGroup"
          use-input
          map-options
          emit-value
          option-value="id"
          option-label="name"
          input-debounce="0"
          label="Filtro"
          :options="groupOptions"
          class="col-4 elem select"
          @input="filterByGroup(selectedGroup); getChart();"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">No results</q-item-section>
            </q-item>
          </template>
        </q-select>
        <div class="vision">
          <a class="caption">Visão</a>
          <br />
          <q-btn-toggle
            v-model="periodicity"
            toggle-color="primary"
            class="elem toggle"
            :options="[
          {label: 'DIA', value: 'daily'},
          {label: 'MÊS', value: 'monthly'},
          {label: 'ANO', value: 'yearly'}
        ]"
        @input="changePeriodicity(periodicity); getChart();"
          />
        </div>
        <q-input v-model="startDate" :mask="mask" label="Período: Início" class="elem input" :error="errorStartDate" @input="validateStartDate(); getChart();">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer calendar">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date @input="changeStartDate(startDate); getChart();" v-model="startDate" mask="DD/MM/YYYY" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input v-model="endDate" :mask="mask" label="Período: Fim" class="elem input" :error="errorEndDate" @input="validateEndDate(); getChart();">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer calendar">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date @input="changeEndDate(endDate); getChart();" v-model="endDate" mask="DD/MM/YYYY" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <div class="adjust-toggle">
      <q-toggle v-model="value" />
      <a class="subtitle">Ajustar para datas de faturamento</a>
    </div>
  </div>
</template>

<script>
import MASTER from '../services/masterApi/http-common'
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
import { dimensions } from '../utils/transductorGraphControl'

const allCampus = []
const groups = []

export default {
  name: 'TotalCostFilter',
  data () {
    return {
      periodicity: 'daily',
      selectedCampus: null,
      campusOptions: allCampus,
      selectedGroup: null,
      groupOptions: groups,
      startDate: '',
      endDate: '',
      mask: '##/##/####',
      value: false
    }
  },
  props: {},
  async created () {
    this.getCampus()
    this.getChart()
  },
  computed: {
    ...mapGetters('totalCostStore', ['errorStartDate', 'errorEndDate', 'getUrl'])
  },
  methods: {
    ...mapActions('totalCostStore', ['changePeriodicity', 'changeStartDate', 'changeEndDate', 'filterByCampus', 'filterByGroup', 'clearStartDate', 'clearEndDate', 'updateChart']),
    async getCampus () {
      await MASTER.get('campi/')
        .then(res => {
          res.data.forEach(elem => {
            allCampus.push(elem)
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    getGroups () {
      while (groups.length) {
        groups.pop()
      }
      this.selectedGroup = null
      allCampus.filter(campus => campus.id === this.selectedCampus)[0].groups_related.map(group => {
        if (groups.filter(subGroup => subGroup.name === group.name).length === 0) {
          groups.push(group)
        }
      })
    },
    validateStartDate () {
      if (moment(this.startDate, 'DD-MM-YYYY').isValid()) {
        this.changeStartDate(this.startDate)
      }
    },
    validateEndDate () {
      if (moment(this.endDate, 'DD-MM-YYYY').isValid()) {
        this.changeEndDate(this.endDate)
      }
    },
    getChart () {
      MASTER
        .get(this.getUrl)
        .then((res) => {
          var chart = {
            values: res.data.cost,
            min: res.data.min,
            max: res.data.max,
            status: true,
            unit: 'R$',
            dimension: dimensions[1]
          }
          this.updateChart(chart)
          this.$parent.location.campus = this.campusOptions.find(campus => campus.id === this.selectedCampus).acronym
          this.$parent.location.group = this.groupOptions.find(group => group.id === this.selectedGroup).name
        })
        .catch((err) => {
          console.log('catch', err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.containerFilter {
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0;
}
.adjust {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}
.filter {
  background-color: white;
  display: flex;
  align-items: initial;
  justify-content: space-around;
  flex-direction: row;
  margin-top: 1%;
  width: 100%;
  padding: 0;
}
.input {
  padding-bottom: 0;
}
.calendar {
  color: rgba(0, 0, 0, 0.54);
}
.elem {
  margin: 1.7%;
}
.caption {
  font-family: Roboto;
  font-size: 1.8vh;
  line-height: 1.33;
  letter-spacing: 0.4px;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 3.5%;
}
.toggle {
  margin-top: 1%;
  border: 1px solid $primary;
  border-color: $primary;
}
.vision {
  align-self: center;
}
.campus {
  width: 18%;
}
.subtitle {
  font-family: Roboto;
  font-size: 1.8vh;
  line-height: 1.33;
  letter-spacing: 0.4px;
  color: rgba(0, 0, 0, 0.87);
}
.adjust-toggle {
  display: none;
  margin-left: 39%;
  margin-top: -1.5%;
}
.select {
  max-width: 20%;
}
.input {
  padding-bottom: 0;
}
</style>
