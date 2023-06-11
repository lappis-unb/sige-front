<template>
    <div class="containerFilter">
      <div class="adjust">
        <div class="filter">
          <q-select
            v-model="campusModel"
            use-input
            map-options
            emit-value
            option-value="id"
            option-label="name"
            input-debounce="0"
            label="Campus"
            :options="optionsCampus"
            @filter="filterCampus"
            class="col-4 elem select"
            @input="getGroups(); filterByCampus(campusModel);"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">No results</q-item-section>
              </q-item>
            </template>
          </q-select>
  
            <q-select
            v-model="optionsModel"
            use-input
            map-options
            emit-value
            option-value="id"
            option-label="name"
            input-debounce="0"
            label="Filtro"
            :options="optionsGroup"
            @filter="filterFn"
            class="col-4 elem select"
            @input="filterByGroup(optionsModel);"
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
              v-model="model"
              toggle-color="primary"
              class="elem toggle"
              :options="[
            {label: 'MÊS', value: 'monthly'}
          ]"
          @input="changePeriodicity(model);"
            />
          </div>
          <q-input v-model="startDate" :mask="mask" label="Período" class="elem input" :error="errorStartDate" @input="verifyClearInput">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer calendar">
                <q-popup-proxy ref="monthPicker" transition-show="scale" transition-hide="scale">
                  <!-- <q-date minimal mask="MM/YYYY" emit-immediately default-view="Years" v-model="startDate" @input="changeStartDate(startDate);" -->
                    <q-date minimal mask="MM/YYYY" emit-immediately default-view="Years" v-model="startDate" @input="verifyClearInput"
                />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-btn
              class="apply_button"
              size="1rem"
              label="Aplicar"
              type="button"
              @click="getChart()"
              color="primary"
          />
        </div>
      </div>
      <div class="adjust-toggle">
        <q-toggle v-model="value" />
        <a class="subtitle">Ajustar para datas de faturamento</a>
      </div>
    </div>
  </template>
  
  <script>
  
  import { mapActions, mapGetters } from 'vuex'
  import moment from 'moment'
  import { dimensions } from '../../utils/transductorGraphControl'
  import CampiService from '../../services/CampiService'
  import ChartService from '../../services/ChartService'
  
  let allCampus = []
  const campiService = new CampiService()
  const chartService = new ChartService()
  
  export default {
    name: 'ReportFilter',
    data () {
      return {
        model: 'monthly',
        campusModel: null,
        optionsCampus: allCampus,
        optionsModel: null,
        optionsGroup: [],
        startDate: '',
        mask: '##/####',
        value: false
      }
    },
    props: {},
    async created () {
      allCampus = await campiService.getAllCampiInfo()
      this.optionsCampus = allCampus
      this.getChart()
    },
    computed: {
      ...mapGetters('totalCostStore', ['errorStartDate', 'getUrl'])
    },
    methods: {
      ...mapActions('totalCostStore', ['changePeriodicity', 'changeStartDate', 'filterByCampus', 'filterByGroup', 'clearStartDate', 'updateChart']),
      filterFn (val, update) {
        update(() => {
          const needle = val.toLowerCase()
          this.optionsCampus = allCampus.filter(
            v => v.name.toLowerCase().indexOf(needle) > -1
          )
        })
      },
      filterCampus (val, update) {
        update(() => {
          const needle = val.toLowerCase()
          this.optionsCampus = allCampus.filter(
            v => v.name.toLowerCase().indexOf(needle) > -1
          )
        })
      },
  
      getGroups () {
        const updatedGroups = []
        const selectedCampus = allCampus.find(campus => campus.id === this.campusModel)
        selectedCampus.groups_related.forEach(group => {
          const alreadyInUpdatedGroups = updatedGroups.find(subGroup => subGroup.name === group.name)
          if (!alreadyInUpdatedGroups) {
            updatedGroups.push(group)
          }
        })
        this.optionsModel = null
        this.optionsGroup = updatedGroups
      },
  
      verifyClearInput (val, reason, details) {
        if (reason === 'month') {
          this.$refs.monthPicker.hide()
        }
        if (!this.startDate) {
          this.clearStartDate()
          this.getChart()
        } else {
          if (moment(this.startDate, 'MM-YYYY').isValid()) {
            this.changeStartDate(this.startDate)
            this.getChart()
          }
        }
      },
      getChart () {
        chartService.getChartData(this.getUrl, 'R$', dimensions[1])
          .then((chart) => {
            this.updateChart(chart)
            this.$parent.location.campus = this.optionsCampus.find(campus => campus.id === this.campusModel).acronym
            this.$parent.location.group = this.optionsGroup.find(group => group.id === this.optionsModel).name
          })
          .catch(() => console.log('Falha ao atualizar o gráfico!'))
      }
    }
  }
  
  </script>
  
  <style lang="scss" scoped src='./styles.scss'/>
  