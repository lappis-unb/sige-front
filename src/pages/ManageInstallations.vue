<template>
  <!-- Cards da pagina de administrador -->
  <q-page class="flex flex-start column q-pa-md">
    <div
      class="q-pa-sm"
      v-for="item in graphData"
      :key="item.name"
    >
      <a :href="item.link" style="text-decoration: none">
        <q-card class="installation-card">
          <q-list>
            <q-item clickable>
              <q-item-section avatar>
              <!-- A partir do nome do item um icone e carregado -->
                <Icons :name="item.name" ></Icons>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ item.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </a>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
import Icons from 'src/components/Icons.vue'

export default {
  name: 'ManageInstallations',
  data () {
    return {
      graphData: [
        {
          // rota e nome do card
          link: '/campi',
          name: 'Campi'
        },
        {
          link: '/group_type',
          name: 'Tipos de Agrupamento'
        },
        {
          link: '/groups',
          name: 'Agrupamentos'
        },
        {
          link: '/slaves',
          name: 'Servidores Distribuídos'

        },
        {
          link: '/transductors',
          name: 'Medidores'
        },
        {
          link: '/tariffs',
          name: 'Tarifas'
        }
      ]
    }
  },
  created () {
    this.changePage('Gerenciar Instalações')
  },
  components:{
    Icons
  },
  methods: {
    ...mapActions('userStore', ['changePage'])
  }
}
</script>

<style>
.installation-card {
  width: 250px;
}
</style>