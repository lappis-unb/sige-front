<template>
  <div class="q-pa-md">
    <total-cost-filter />
    <q-table
      title="Relatório por Período"
      :data="reports"
      :columns="columns"
      row-key="name"
      :pagination.sync="pagination"
    >
<!--       <template v-slot:bottom>
        Bottom
      </template> -->
    </q-table>
  </div>
</template>

<script>
import report from 'src/services/api/report'
import TotalCostFilter from '../components/TotalCostFilter/TotalCostFilter.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Report',
  components: {
    TotalCostFilter
  },
  computed: {
    ...mapGetters('totalCostStore', ['totalCostChart'])
  },
  created () {
    this.changePage('Relatório');
    this.getReports();
  },
  methods: {
    ...mapActions('userStore', ['changePage']),
    clickItem (row) {
      this.$router.push('transductor/' + row.serial_number)
    },
    async getReports(){
      this.reports = await report.getReports();
    }
  },
  data () {
    return {
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 10
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Item',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'valor_kwh', align: 'right', label: 'Valor', field: 'valor_kwh', sortable: true },
        { name: 'tarifa', label: 'Tarifa (R$ / kWh)', field: 'tarifa', sortable: true },
        { name: 'total', label: 'Total (R$)', field: 'total' }
      ],
      reports: []
    }
  },
}
</script>

<style>
  .q-table__top,
  thead tr th {
    background-color: #00417e !important;
    color: #fff;
    font-size: 1em !important;
  }

  thead tr.meter-header-group {
    height: 1em;
  }

  thead tr.meter-header-group th {
    border: none;
    padding: 0 0 4px;
  }

  .meter-header-group th.meter-table-header-group-cell-grouped {
    border-bottom: solid 1px #527ea7;
  }
</style>
