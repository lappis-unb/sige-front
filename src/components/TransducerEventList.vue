<template>
  <button v-on:click="toggleEventList">
    <div class="q-pa-md q-gutter-sm">
      <p>{{ occurrence.type }}</p>
      <p>{{ occurrence.info }}</p>
      <p>{{ occurrence.writtenStartTime }}</p>
      <q-dialog v-model="fixed">
        <q-card>
          <q-card-section>
            <div class="text-h6">Lista de Transducers</div>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 100vh" class="scroll">
            <div class="q-pa-md">
              <q-table title="Transducers" :columns="columns" :data="rows" row-key="name" />
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
      occurrence: {
        type: Object
      }
    },
    data: function () { 
      return {
        fixed: false, 
        columns : [
          { name: 'energia', align: 'center', label: 'Letra/Nível de Energia', field: 'energia', sortable: true },
          { name: 'tipo', align: 'center', label: 'Tipo', field: 'tipo', sortable: true },
          { name: 'data', align: 'center', label: 'Data', field: 'data', sortable: true },
          
        ],
        rows : [
          {
            energia: this.occurrence.info,
            tipo: this.occurrence.type,
            data: this.occurrence.writtenStartTime,
          },
        ]
      }
    },
    methods: {
      toggleEventList () {
        this.fixed = !this.fixed
      }
    },
  }


</script>

<style>

</style>