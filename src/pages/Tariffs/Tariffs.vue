<template>
  <div>
    <h3 class="title">Lista de Campi</h3>
    <div class="container">
      <div class="q-pa-md">
        <q-table
          title="Campi"
          :data="campi"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body="props">
              <q-tr :props="props" @click="goTo(props.row.id)">
                <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                <q-td key="name" :props="props">{{ props.row.name }}</q-td>
              </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script>
import MASTER from '../../services/masterApi/http-common'

export default {
  name: 'Campi',
  data () {
    return {
      campi: [],
      campus: {},
      columns: [
        { name: 'id', label: 'ID', align: 'left', field: row => row.id, sortable: true, style: 'width: 55px' },
        { name: 'name', label: 'Nome', align: 'left', field: row => row.name, sortable: true }
      ]
    }
  },
  created () {
    this.getCampi()
  },
  methods: {
    getCampi () {
      MASTER
        .get('campi/', {})
        .then(res => {
          this.campi = res.data
        })
        .catch(err => {
          this.err = err
          console.log('err')
        })
    },
    goTo (id) {
      this.$router.push(`/tariffs/${id}`)
    }
  }
}
</script>
<style lang="scss" src="./styles.scss" scoped>

</style>
