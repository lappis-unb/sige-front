<template>
  <div>
    <div class="btn">
      <q-btn
        size="1rem"
        label="Adicionar"
        color="primary"
        @click="handlePressButton('new')"/>
    </div>
    <div class="container">

      <div class="q-pa-md table">
        <q-table
          title="Linhas"
          :data="lines"
          :columns="columns"
          row-key="name">

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="start_lat" :props="props">{{ props.row.start_lat }}</q-td>
              <q-td key="start_lng" :props="props">{{ props.row.start_lng }}</q-td>
              <q-td key="end_lat" :props="props">{{ props.row.end_lat }}</q-td>
              <q-td key="end_lng" :props="props">{{ props.row.end_lng }}</q-td>
              <q-td key="campus" :props="props">{{ props.row.campus }}</q-td>
              <q-td key="edit" :props="props">
                <q-btn
                  flat
                  round
                  icon="edit"
                  size="1rem"
                  @click="handlePressButton('show', props.row.id)"
                  color="primary"/>
              </q-td>
              <q-td key="delete" :props="props">
                <q-btn
                  flat
                  round
                  icon="delete"
                  size="1rem"
                  @click="handlePressButton('delete', props.row.id)"
                  color="primary"/>
              </q-td>
            </q-tr>
          </template>

        </q-table>
      </div>

      <q-dialog v-model="isCreatingNew" class="dialog">
        <q-card>
          <q-card-section>
            <div class="text-h6">Nova Linha</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-form
            class="q-gutter-md"
            @submit="postLine()"
            id="post-form"
            >
              <div class="inputDiv">
                <label>Latitude de Origem: </label>
                <q-input
                class="inputField"
                outlined
                v-model="newLine.start_lat"
                label="Latitude de Origem"/>
              </div>

              <div class="inputDiv">
                <label>Longitude de Origem: </label>
                <q-input
                class="inputField"
                outlined
                v-model="newLine.start_lng"
                label="Longitude de Origem"/>
              </div>

              <div class="inputDiv">
                <label>Latitude de Destino: </label>
                <q-input
                class="inputField"
                outlined
                v-model="newLine.end_lat"
                label="Latitude de Destino"/>
              </div>

              <div class="inputDiv">
                <label>Longitude de Destino: </label>
                <q-input
                class="inputField"
                outlined
                v-model="newLine.end_lng"
                label="Longitude de Destino"/>
              </div>

              <div class="inputDiv">
                <label>Campus: </label>
                <q-select
                class="inputField"
                outlined
                :options="campi"
                option-value="url"
                option-label="name"
                emit-value
                map-options
                v-model="newLine.campus"
                label="Campus"/>
              </div>
            </q-form>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              size="1rem"
              label="Salvar"
              type="submit"
              color="primary"
              form="post-form"/>
            <q-btn
              size="1rem"
              @click="handlePressButton('cancel')"
              label="Cancelar"
              color="primary"
              v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="isSelectLine" class="dialog">
        <q-card>
          <q-card-section>
            <div class="text-h6">Editar Linha</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-form
            class="q-gutter-md"
            @submit="putLine()"
            id="post-form"
            >
              <div class="inputDiv">
                <label>Latitude de Origem: </label>
                <q-input
                class="inputField"
                outlined
                v-model="line.start_lat"
                label="Latitude de Origem"/>
              </div>

              <div class="inputDiv">
                <label>Longitude de Origem: </label>
                <q-input
                class="inputField"
                outlined
                v-model="line.start_lng"
                label="Longitude de Origem"/>
              </div>

              <div class="inputDiv">
                <label>Latitude de Destino: </label>
                <q-input
                class="inputField"
                outlined
                v-model="line.end_lat"
                label="Latitude de Destino"/>
              </div>

              <div class="inputDiv">
                <label>Longitude de Destino: </label>
                <q-input
                class="inputField"
                outlined
                v-model="line.end_lng"
                label="Longitude de Destino"/>
              </div>

              <div class="inputDiv">
                <label>Campus: </label>
                <q-select
                class="inputField"
                outlined
                :options="campi"
                option-value="url"
                option-label="name"
                emit-value
                map-options
                v-model="line.campus"
                label="Campus"/>
              </div>
            </q-form>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              size="1rem"
              label="Salvar"
              type="submit"
              color="primary"
              form="post-form"/>
            <q-btn
              size="1rem"
              label="Cancelar"
              @click="handlePressButton('cancel')"
              color="primary"
              v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
  import MASTER from '../../services/masterApi/http-common'
  import { mapActions } from 'vuex'

  export default {
    name: 'Lines',
    data () {
      return {
        lines: [],
        line: {},
        isCreatingNew: false,
        isSelectLine: false,
        newLine: {},
        campi: [],
        columns: [
          { name: 'start_lat', label: 'Latitude de Origem', align: 'left', field: row => row.start_lat, sortable: true },
          { name: 'start_lng', label: 'Longitude de Origem', align: 'center', field: row => row.start_lng, sortable: true },
          { name: 'end_lat', label: 'Latitude de Destino', align: 'center', field: row => row.end_lat, sortable: true },
          { name: 'end_lng', label: 'Longitude de Destino', align: 'center', field: row => row.end_lng, sortable: true },
          { name: 'campus', label: 'Campus URL', align: 'center', field: row => row.campus, sortable: true },
          { name: 'edit', label: 'Editar', align: 'center', format: () => 'Editar', sortable: false, style: 'width: 55px' },
          { name: 'delete', label: 'Excluir', align: 'center', format: () => 'Excluir', sortable: false, style: 'width: 55px' }
        ]
      }
    },
    async created () {
      this.changePage('Gerenciar Instalações - Linhas')
      this.lines = await this.getLines()
    },
    methods: {
      ...mapActions('userStore', ['changePage']),
      handlePressButton (type, id = null) {
        const options = {
          new: () => {
            this.isSelectLine = false
            this.isCreatingNew = !this.isCreatingNew
            this.getCampi()
          },
          show: () => {
            this.isSelectLine = true
            this.isCreatingNew = false
            this.getCampi()
            this.getLine(id)
          },
          cancel: () => {
            this.isSelectLine = this.isCreatingNew = false
            this.newLine = this.line = {}
          },
          delete: () => {
            this.deleteLine(id)
          }
        }
        if (options[type]) options[type]()
      },
      ...mapActions('userStore', ['changePage']),

      async getLines () {
        try {
          const { data } = await MASTER.get('lines/')
          return data
        } catch (err) {
          this.$q.notify({
            type: 'negative',
            message: 'Falha ao carregar Linhas. Tente novamente.'
          })
          console.log(err)
        }
      },

      async getLine(id) {
        try {
          const { data } = await MASTER.get(`lines/${id}/`, {})
          this.line = data
          this.isSelectLine = true
        } catch(err) {
          this.$q.notify({
            type: 'negative',
            message: 'Falha ao carregar Linhas. Tente novamente.'
          })
          console.log(err)
        }
      },

      async putLine() {
        try {
          const { data } = await MASTER.put(`lines/${this.line.id}/`, this.line)
          this.lines = this.lines.map((line) => this.line.id === line.id ? data : line)
          this.isSelectLine = false
          this.$q.notify({
            type: 'positive',
            message: 'Seus dados foram atualizados.'
          })
        } catch(err) {
          console.log(err)
          this.$q.notify({
            type: 'negative',
            message: 'Falha ao editar seus dados. Tente novamente.'
          })
        }
      },

      async postLine () {
        try {
          const { data } = await MASTER.post('lines/', this.newLine)
          this.lines.push(data)
          this.isCreatingNew = false
          this.newLine = {}
          this.$q.notify({
            type: 'positive',
            message: 'Linha adicionada com sucesso.'
          })
        } catch (err) {
          this.$q.notify({
            type: 'negative',
            message: 'Falha ao adicionar Linha. Tente novamente.'
          })
          console.log(err)
        }
      },

      async deleteLine (id) {
        try {
          await MASTER.delete(`lines/${id}/`, {})
          this.lines = this.lines.filter((line) => line.id !== id)
          this.$q.notify({
            type: 'positive',
            message: 'Linha removida com sucesso.'
          })
          this.isSelectLine = false
          this.line = {}
        } catch(err) {
          this.$q.notify({
            type: 'negative',
            message: 'Falha ao remover Linha. Tente novamente.'
          })
          console.log(err)
        }
      },

      async getCampi () {
        try {
          const { data } = await MASTER.get('campi/', this.campi)
          this.campi = data
        } catch (err) {
          this.$q.notify({
            type: 'negative',
            message: 'Não foi carregar Campus. Tente novamente.'
          })
          console.log(err)
        }
      }
    }
  }
</script>

<style lang="scss" scoped src='./styles.scss'/>
