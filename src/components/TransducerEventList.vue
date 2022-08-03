<template>
  <button v-on:click="toggleEventList">
    <div class="q-pa-md q-gutter-sm">
      <!-- <p>{{ occs }}</p> -->
      <q-dialog v-model="fixed">
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
              > 
                <template v-slot:top-right>
                  <q-select 
                    outlined
                    v-model="optionSelected"
                    :options="optionsType"
                    input-debounce="0"
                    emit-value
                    map-options
                    label="Tipos"
                    @filter="filterFn"
                  >
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
    components: {
          
    },
    props: {
      occs: {
        type: Array
      }
    },
    data: function () { 
      return {
        fixed: false,
        filteredOccs: [],
        optionSelected: '',
        optionsType : ['','Tensão precária', 'Tensão Crítica', 'Queda de Fase',  'Falha de comunicação'], 
        columns : [
          { name:'start_time', 
            align: 'center', 
            label: 'Data', 
            field: 'start_time', 
            format: val => `${val}`,
            sortable: true},  
          { name: 'info', align: 'center', label: 'Fase/Nível de Energia', field: 'info', sortable: true },
          { name: 'type', align: 'center', label: 'Tipo', field: 'type', sortable: true },
        ],
        rows : [
        ]
      }
    },
    created () {

    },
    methods: {
      toggleEventList () {
        this.fixed = !this.fixed
        console.log('Dados: ', this.occs)
        console.log('Occs: ', this.occs)
        this.occs.forEach((item) => {
          console.log('Item: ', item.info)
          console.log('Item: ', item.type)
          console.log('Item: ', item.start_time)
          return {
            info: item.info,
            tipo: item.type,
            data: item.start_time
          }
        })
      },
      filterFn(val, update) {
        console.log('Opcao selecionada: ', val)
        if (this.optionSelected === '') {
          update(() => {
            this.filteredOccs = this.occs
          })
        }
 
        update(() => {
          const needle = this.optionSelected.toLowerCase()
          this.filteredOccs = this.occs.filter(v => v.type.toLowerCase().indexOf(needle) > -1)
        })
      }
    }
  }

</script>

<style>

</style>