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
              <q-table title="Transducers" :columns="columns" :data="occs" row-key="name" />
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
        columns : [
          { name: 'info', align: 'center', label: 'Fase/Nível de Energia', field: 'info', sortable: true },
          { name: 'type', align: 'center', label: 'Tipo', field: 'type', sortable: true },
          { name: 'writtenStartTime', align: 'center', label: 'Data', field: 'writtenStartTime', sortable: true },  
        ],
        rows : [
        ]
      }
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
      getDataRows () {
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
      }
    }
  }

</script>

<style>

</style>