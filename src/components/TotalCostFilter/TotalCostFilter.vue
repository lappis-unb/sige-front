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
          clearable
          :options="optionsCampus"
          @filter="filterCampus"
          class="col-4 elem select"
          @input="getGroups(); filterByCampus(campusModel);"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">Nenhum dado encontrado</q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          v-model="optionsModel"
          use-input
          map-options
          emit-value
          option-value="id"
          option-label="acronym"
          input-debounce="0"
          label="Unidade"
          :options="optionsGroup"
          @filter="filterFn"
          class="col-4 elem select"
          @input="filterByGroup(optionsModel);"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section v-if="!campusModel" class="text-grey">Selecione o campus</q-item-section>
              <q-item-section v-else class="text-grey">Nenhum dado encontrado</q-item-section>
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
              {label: 'DIA', value: 'daily'},
              {label: 'MÊS', value: 'monthly'},
              {label: 'ANO', value: 'yearly'}
            ]"
            @input="changePeriodicity(model);"
          />
        </div>
        <div class="dateFilter">
          <q-input
            v-model="filteredDate.from"
            dense
            outlined
            :mask="mask"
            label="Período: Início"
            class="elem input"
            :rules="[dateFormatRule, startDateGreaterThanCurrentDateRule]"
            @input="verifyClearInput"
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer calendar" size="xs">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="filteredDate"
                    mask="DD/MM/YYYY"
                    range
                    @input="changeStartDate(filteredDate.from)"
                    :locale="ptBR_Locale"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="ok" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
            <template v-slot:append>
              <q-icon
                v-if="filteredDate.from !== ''"
                name="close"
                @click="filteredDate = { from: '', to: '' }"
                class="cursor-pointer"
              />
            </template>
          </q-input>
          <q-input
            v-model="filteredDate.to"
            dense
            outlined
            :mask="mask"
            label="Período: Fim"
            class="elem input"
            :rules="[dateFormatRule, endDateLessThanStartDateRule]"
            @input="verifyClearInput"
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer calendar" size="xs">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="filteredDate"
                    mask="DD/MM/YYYY" 
                    range
                    @input="changeEndDate(filteredDate.to)"
                    :locale="ptBR_Locale"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="ok" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <q-btn
          class="apply_button"
          size="1rem"
          label="Aplicar"
          type="button"
          @click="applyFilter()"
          color="primary"
        />
      </div>
    </div>
    <div class="adjust-toggle">
      <q-toggle v-model="value" class="subtitle" label="Ajustar para datas de faturamento"/>
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
  name: 'TotalCostFilter',
  data () {
    return {
      model: 'daily',
      campusModel: null,
      optionsCampus: allCampus,
      optionsModel: null,
      optionsGroup: [],
      filteredDate: {
        from: '',
        to: ''
      },
      ptBR_Locale: {
        days: 'Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado'.split('_'),
        daysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
        months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembo'.split('_'),
        monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
        firstDayOfWeek: 0, // 0-6, 0 - Domingo, 1 Segunda, ...
        format24h: true,
        pluralDay: 'dias'
      },
      mask: '##/##/####',
      value: false
    }
  },
  props: {},
  async created () {
    allCampus = await campiService.getAllCampiInfo()
    this.optionsCampus = allCampus
    this.filteredDate.from = moment().startOf('month').format('DD-MM-YYYY')
    this.filteredDate.to = moment().format('DD-MM-YYYY')
    this.getChart()
  },
  computed: {
    ...mapGetters('totalCostStore', ['errorStartDate', 'errorEndDate', 'getUrl'])
  },
  methods: {
    ...mapActions('totalCostStore', [
      'changePeriodicity', 'changeStartDate', 'changeEndDate', 'filterByCampus',
      'filterByGroup', 'clearStartDate', 'clearEndDate', 'updateChart'
    ]),
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
      if(selectedCampus){
        selectedCampus.children.forEach(group => {
          const alreadyInUpdatedGroups = updatedGroups.find(subGroup => subGroup.name === group.name)
          if (!alreadyInUpdatedGroups) {
            updatedGroups.push(group)
          }
        })
      }
      this.optionsModel = null
      this.optionsGroup = updatedGroups
    },

    dateFormatRule(date) {
      if(date){
        const validation = moment(date, "DD/MM/YYYY").isValid()
        return validation || 'Data em formato inválido'
      }
    },

    endDateLessThanStartDateRule(endDate){
      const validation =
        moment(this.filteredDate.from, 'DD/MM/YYYY').isAfter(moment(endDate, 'DD/MM/YYYY'))
      return !validation || 'Data menor que data inicial'
    },

    startDateGreaterThanCurrentDateRule(startDate){
      const validation = moment(startDate, 'DD/MM/YYYY').isAfter(moment())
      return !validation || 'Data maior que a data atual'
    },

    /**
     * Verifica os valores dos campos de Data
     * e chama funções para alterar os parâmetros
     * da URL de filtragem na API
     */
    verifyClearInput () {
      if (!this.filteredDate.from) {
        this.clearStartDate()
      } else {
        if (moment(this.filteredDate.from, 'DD-MM-YYYY').isValid()) {
          this.changeStartDate(this.filteredDate.from)
        }
      }

      if (!this.filteredDate.to) {
        this.clearEndDate()
      } else {
        if (moment(this.filteredDate.to, 'DD-MM-YYYY').isValid()) {
          this.changeEndDate(this.filteredDate.to)
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
    },

    applyFilter(){
      if (!this.filteredDate.from || !this.filteredDate.to) {
        this.$q.notify({
          type: 'negative',
          message: 'Selecione uma data de início e de fim',
          position: 'top'
        })
        return
      }

      this.getChart();
    }
  }
}

</script>

<style lang="scss" scoped src='./styles.scss'/>
