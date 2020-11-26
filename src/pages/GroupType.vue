<template>
  <div>
    <h3 class="title">Lista de GroupType </h3>
    <div class="btn">
      <q-btn
        size="1rem"
        label="Novo"
        color="primary"
        @click="handlePressButton('new')"/>
    </div>
    <div class="container">
      <div class="lst-groupType">
        <ul>
          <li v-for="(groupType,index) in groupTypes" :key="index">
            <p class="lst-item">
              {{index}} - {{groupType.name}}
            <q-btn
              size="1rem"
              label="show"
              @click="handlePressButton('show', groupType.id)"
              color="primary"/>
              </p>
          </li>
        </ul>
      </div>
      <div class="groupType-info" v-if="isCreatingNew">
        <h3 class="login-text">
          Novo GroupType
        </h3>
        <q-form
          class="q-gutter-md"
          @submit="postGroupType()"
          >
          <q-input
            outlined
            v-model="newGroupType.name"
            label="Nome do GroupType"/>
          <div class="text-center q-mt-lg">
            <q-btn
              size="1rem"
              label="Enviar"
              type="submit"
              color="primary"/>
          </div>
        </q-form>
      </div>
      <div class="groupType-info" v-if="isSelectedGroupType">
        <h3 class="login-text">
          Editar dados
        </h3>
        <p>Id: {{groupType.id}}</p>
        <q-form
        class="q-gutter-md"
        @submit="putGroupType()"
        >
        <q-input
          outlined
          v-model="groupType.name"
          label="Nome do GroupType"/>
        <div class="text-center q-mt-lg">
          <q-btn
            size="1rem"
            label="Salvar"
            type="submit"
            color="primary"/>
          <q-btn
            size="1rem"
            label="Deletar"
            @click="deleteGroupType(groupType.id)"
            color="primary"/>
        </div>
      </q-form>
      </div>
    </div>
  </div>
</template>

<script>
import MASTER from '../services/masterApi/http-common'
// import { mapActions } from 'vuex'

export default {
  name: 'GroupTypes',
  data () {
    return {
      groupTypes: [],
      groupType: {},
      isSelectedGroupType: false,
      isCreatingNew: false,
      newGroupType: {}
    }
  },
  created () {
    this.getGroupTypes()
  },
  methods: {
    handlePressButton (type, id = null) {
      const buttonActions = {
        new: () => {
          this.isSelectedGroupType = false
          this.isCreatingNew = !this.isCreatingNew
        },
        show: () => {
          this.isSelectedGroupType = true
          this.isCreatingNew = false
          this.getGroupTypeById(id)
        }
      }
      if (buttonActions[type]) buttonActions[type]()
    },
    getGroupTypes () {
      MASTER
        .get('group-types/')
        .then(({ data: groupTypeList }) => {
          this.groupTypes = groupTypeList
        })
        .catch(error => console.log('Error in getGroupTypes: ', error))
    },
    getGroupTypeById (id) {
      MASTER
        .get(`group-types/${id}`)
        .then(({ data: groupType }) => {
          this.groupType = groupType
          this.isSelectedGroupType = true
        })
        .catch(error => console.log('Error in getGroupTypeById: ', error))
    },
    putGroupType () {
      const { id } = this.groupType
      MASTER
        .put(`group-types/${id}`, this.groupType)
        .then(({ data: updatedGroupType }) => {
          this.groupType = updatedGroupType
          this.updateGroupTypeList(updatedGroupType)
          this.$q.notify({
            type: 'positive',
            message: 'Seus dados foram atualizados.'
          })
        })
        .catch(error => {
          console.log('Error in putGroupType: ', error)
          this.$q.notify({
            type: 'negative',
            message: 'Falha ao editar seus dados. Tente novamente.'
          })
        })
    },
    deleteGroupType (id) {
      MASTER
        .delete(`group-types/${id}`)
        .then(() => {
          this.removeGroupTypeFromList(id)
          this.$q.notify({
            type: 'positive',
            message: 'GroupType deletado com sucesso.'
          })
          this.isSelectedGroupType = false
          this.groupType = {}
        })
        .catch(error => console.log('Error in deleteGroupType: ', error))
    },
    postGroupType () {
      MASTER
        .post('group-types/', this.newGroupType)
        .then(({ data: newGroupType }) => {
          this.groupTypes.push(newGroupType)
          this.newGroupType = {}
        })
        .catch(error => console.log('Error in postGroupType: ', error))
    },
    updateGroupTypeList (updatedGroupType) {
      this.groupTypes = this.groupTypes.map((groupType) => groupType.id === updatedGroupType.id ? updatedGroupType : groupType)
    },
    removeGroupTypeFromList (id) {
      this.groupTypes = this.groupTypes.filter((groupType) => groupType.id !== id)
    }
  }
}
</script>
<style>
.container {
  display               : grid;
  font-size             : 25px;
  grid-template-columns : 30% 1fr;
  gap                   : 10px;
  height                : 100vh;
  max-width             : 100vw;
  padding               : 10px;;
}
.groupType-info {
  padding   : 20px;
}
.title {
  padding-left: 20px;
}
.btn {
  padding   : 20px;
}

</style>
