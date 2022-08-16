<template>
  <button v-on:click="toggleModalEvents">
    <q-icon name="open_in_new" size="100px" />
    <q-tooltip anchor="center left">
      <div class="tooltip">Eventos do Transducer</div>
    </q-tooltip>
    <div class="q-pa-md q-gutter-sm">
      <!-- <p>{{ occs }}</p> -->
      <q-dialog v-model="fixed" style="max-width: 650px">
        <q-card>
          <q-card-section>
            <div class="text-h6">Lista de Transducers</div>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 100vh" class="scroll">
            <div class="q-pa-md">
              <q-table 
                title="Transducers" 
                :columns="columns" 
                :data="filteredOccs" 
                row-key="name" 
                @row-click="getTensionGraphic"
                virtual-scroll
                :rows-per-page-options="[0]" :pagination.sync="pagination" 
                :filter="optionSelected"
                :filter-method="filterFn">
                <template v-slot:top-right>
                  <q-select outlined v-model="optionSelected" :options="optionsType" option-label="type"
                    option-value="id" input-debounce="0" emit-value map-options label="Tipos">
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-select>
                </template>
              </q-table>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn flat label="Fechar" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </button>
</template>

<script>

export default {
    props: {
      occs: {
        type: Array
      }
    },
    data: function () { 
      return {
        pagination: {
          rowsPerPage: 0
      },
        fixed: false,
        filteredOccs: this.occs,
        optionSelected: '',
        optionsType : ['','Tensão precária', 'Tensão Crítica', 'Queda de Fase',  'Falha de comunicação'], 
        columns : [
          { name:'start_time', 
            align: 'center', 
            label: 'Data', 
            field: 'start_time', 
            format: val => `${val}`,
            sortable: true},  
          { name: 'info', align: 'center', label: 'Fase/Nível de Energia', field: 'info', sortable: false },
          { name: 'type', align: 'center', label: 'Tipo', field: 'type', sortable: false },
        ],
        rows : [
        ],
      }
    },
    methods: {
      toggleModalEvents () {
        this.fixed = !this.fixed
      },
      getTensionGraphic (e, row) {
        if (e.target.nodeName === 'TD') {
          this.fixed = !this.fixed;
          this.$root.$emit('getTensionGraph', {
            start_time: row.start_time,
            end_time: this.getEndTimeMock()
          })
        } 
      },
      getEndTimeMock () {
        let date = new Date()
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); 
        const yyyy = date.getFullYear();

        return dd + '/' + mm + '/' + yyyy
      },
       filterFn(rows, optionSelected, cols, cellValue) {
        const lowerTerms = optionSelected ? optionSelected.toLowerCase() : ''
        return rows.filter(
          row => cols.some(col => (cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1)
        )
      }
    }
  }

</script>

<style>
button {
   border-top-left-radius: 0.2em;
   border-bottom-left-radius: 0.2em;
}

q-tooltip {
  background-color: blue;
}

.tooltip {
  font-size: 20px;
}
</style>