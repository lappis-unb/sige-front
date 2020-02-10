<template>
  <div id="q-app">
    <div class="q-pa-md">
      <q-table
        title="Medidores"
        :data="data"
        :columns="columns"
        row-key="name"
        :pagination.sync="pagination"
        :filter="filter"
        :rows-per-page-options="[15, 30, 60, 0]"
        binary-state-sort
        no-data-label="Nenhum medidor cadastrado"
        no-results-label="Nenhum medidor com esse filtro"
        rows-per-page-label="Itens por página"
      >
        <template v-slot:top-right>
          <q-input dark dense debounce="300" v-model="filter" placeholder="Filtrar">
            <q-icon slot="append" name="search" />
          </q-input>
        </template>

        <template v-slot:header="props">
          <q-tr class="meter-header-group">
            <q-th colspan="2"></q-th>
            <q-th colspan="3" class="meter-table-header-group-cell-grouped">Ocorrências</q-th>
            <q-th colspan="3"></q-th>
          </q-tr>
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th>
          </q-tr>
        </template>

        <template v-slot:body-cell-eventcrit="props">
          <q-td :props="props">
            <q-chip v-if="props.value > 0" color="red" text-color="white">{{ props.value }}</q-chip>
            <template v-else>-</template>
          </q-td>
        </template>

        <template v-slot:body-cell-eventprec="props">
          <q-td :props="props">
            <q-chip v-if="props.value > 0" color="amber">{{ props.value }}</q-chip>
            <template v-else>-</template>
          </q-td>
        </template>

        <template v-slot:body-cell-event72h="props">
          <q-td :props="props">
            <template v-if="props.value > 0">{{ props.value }}</template>
            <template v-else>-</template>
          </q-td>
        </template>

        <template v-slot:body-cell-groups="props">
          <q-td :props="props">
            <div style="white-space:normal">{{ props.value }}</div>
          </q-td>
        </template>

        <template v-slot:body-cell-active="props">
          <q-td :props="props">
            <q-icon v-if="props.value == 1" name="flash_on" size="sm" class="text-green"></q-icon>
            <q-icon v-else name="flash_off" size="sm" class="text-red"></q-icon>
          </q-td>
        </template>
        <template v-slot:no-data="{ icon, message }">
          <div class="full-width row flex-center q-gutter-sm">{{ message }}</div>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
const data = [
  {
    campus: 'Ceilândia',
    name: 'Prédio A m1',
    eventcrit: 0,
    eventprec: 0,
    groups: 'Prédio A',
    event72h: 0,
    active: 1,
    model: 'XPTO123'
  },
  {
    campus: 'Ceilândia',
    name: 'Prédio A m2',
    eventcrit: 0,
    eventprec: 0,
    groups: 'Prédio A',
    event72h: 0,
    active: 1,
    model: 'XPTO123'
  },
  {
    campus: 'Ceilândia',
    name: 'Prédio B m1',
    eventcrit: 0,
    eventprec: 0,
    groups: 'Prédio B',
    event72h: 0,
    active: 1,
    model: 'XPTO123'
  },
  {
    campus: 'Ceilândia',
    name: 'Prédio B m2',
    eventcrit: 0,
    eventprec: 0,
    groups: 'Prédio B',
    event72h: 0,
    active: 1,
    model: 'XPTO123'
  },
  {
    campus: 'Gama',
    name: 'Bloco A m1',
    eventcrit: 0,
    eventprec: 1,
    groups: 'Bloco A',
    event72h: 3,
    active: 1,
    model: 'XPTO123'
  },
  {
    campus: 'Gama',
    name: 'Bloco A m2',
    eventcrit: 0,
    eventprec: 2,
    groups: 'Bloco A',
    event72h: 4,
    active: 1,
    model: 'XPTO123'
  },
  {
    campus: 'Gama',
    name: 'Bloco A m3',
    eventcrit: 0,
    eventprec: 0,
    groups: 'Bloco B',
    event72h: 0,
    active: 0,
    model: 'XPTO123'
  },
  {
    campus: 'Gama',
    name: 'Bloco B m1',
    eventcrit: 1,
    eventprec: 0,
    groups: 'Bloco B',
    event72h: 6,
    active: 1,
    model: 'XPTO123'
  },
  {
    campus: 'Darcy Ribeiro A',
    name: 'Biblioteca m1',
    eventcrit: 0,
    eventprec: 0,
    groups: 'Biblioteca',
    event72h: 45,
    active: 1,
    model: 'XPTZ789'
  },
  {
    campus: 'Darcy Ribeiro A',
    name: 'BSA Norte m1',
    eventcrit: 1,
    eventprec: 0,
    groups: 'BSA Norte',
    event72h: 3,
    active: 1,
    model: 'XPTO123'
  },
  {
    campus: 'Darcy Ribeiro A',
    name: 'BSA Norte m2',
    eventcrit: 0,
    eventprec: 1,
    groups: 'BSA Norte',
    event72h: 0,
    active: 1,
    model: 'XPTO123'
  },
  {
    campus: 'Darcy Ribeiro A',
    name: 'BSA Sul m1',
    eventcrit: 0,
    eventprec: 0,
    groups: 'BSA Sul',
    event72h: 0,
    active: 1,
    model: 'XPTO123'
  },
  {
    campus: 'Darcy Ribeiro A',
    name: 'FT m1',
    eventcrit: 0,
    eventprec: 0,
    groups: 'FT; Faculdade de tecnologia',
    event72h: 0,
    active: 1,
    model: 'XPTO123'
  },
  {
    campus: 'Darcy Ribeiro A',
    name: 'ICC Norte m1',
    eventcrit: 0,
    eventprec: 1,
    groups: 'ICC Norte',
    event72h: 4,
    active: 1,
    model: 'XPTO123'
  },
  {
    campus: 'Darcy Ribeiro A',
    name: 'ICC Norte m2',
    eventcrit: 0,
    eventprec: 0,
    groups: 'ICC Norte',
    event72h: 3,
    active: 1,
    model: 'XPTO123'
  },
  {
    campus: 'Darcy Ribeiro A',
    name: 'ICC Norte m3',
    eventcrit: 1,
    eventprec: 0,
    groups: 'ICC Norte',
    event72h: 8,
    active: 1,
    model: 'XPTO123'
  },
  {
    campus: 'Darcy Ribeiro A',
    name: 'ICC Norte m4',
    eventcrit: 0,
    eventprec: 0,
    groups: 'ICC Norte',
    event72h: 30,
    active: 1,
    model: 'XPTO123'
  },
  {
    campus: 'Darcy Ribeiro A',
    name: 'ICC Sul m1',
    eventcrit: 0,
    eventprec: 0,
    groups: 'ICC Sul',
    event72h: 0,
    active: 1,
    model: 'XPTO123'
  },
  {
    campus: 'Darcy Ribeiro A',
    name: 'ICC Sul m2',
    eventcrit: 0,
    eventprec: 1,
    groups: 'ICC Sul',
    event72h: 0,
    active: 1,
    model: 'XPTO123'
  },
  {
    campus: 'Darcy Ribeiro A',
    name: 'ICC Sul m3',
    eventcrit: 0,
    eventprec: 0,
    groups: 'ICC Sul',
    event72h: 0,
    active: 0,
    model: 'XPTO123'
  },
  {
    campus: 'Darcy Ribeiro A',
    name: 'ICC Sul m4',
    eventcrit: 2,
    eventprec: 3,
    groups: 'ICC Sul',
    event72h: 48,
    active: 0,
    model: 'XPTO123'
  },
  {
    campus: 'Darcy Ribeiro A',
    name: 'PAT m1',
    eventcrit: 0,
    eventprec: 0,
    groups: 'Pavilhões',
    event72h: 0,
    active: 0,
    model: 'XPTO123'
  },
  {
    campus: 'Darcy Ribeiro A',
    name: 'PJC m1',
    eventcrit: 1,
    eventprec: 0,
    groups: 'Pavilhões',
    event72h: 5,
    active: 1,
    model: 'XPTO123'
  }
]
export default {
  data () {
    return {
      data,
      filter: '',
      pagination: {
        sortBy: 'campus',
        rowsPerPage: 15
      },
      columns: [
        {
          name: 'campus',
          label: 'Campus',
          align: 'left',
          field: 'campus',
          sortable: true
        },
        {
          name: 'name',
          label: 'Nome',
          align: 'left',
          field: 'name',
          sortable: true,
          style: 'font-weight:bold'
        },
        {
          name: 'eventcrit',
          align: 'center',
          label: 'Graves',
          field: 'eventcrit',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: 'eventprec',
          align: 'center',
          label: 'Leves',
          field: 'eventprec',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },

        {
          name: 'event72h',
          align: 'center',
          label: 'Últ. 72h',
          field: 'event72h',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: 'groups',
          align: 'left',
          label: 'Grupos',
          field: 'groups',
          sortable: true
        },
        {
          name: 'active',
          align: 'center',
          label: 'Ativo',
          field: 'active',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: 'model',
          align: 'left',
          label: 'Modelo',
          field: 'model',
          sortable: true
        }
      ]
    }
  }
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
