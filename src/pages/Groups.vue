<template>
  <div>
    <h3 class="title">Lista de Grupos </h3>
    <div class="btn">
      <q-btn
        size="1rem"
        label="Novo"
        color="primary"
        @click="handlePressButton('newGroup')"/>
    </div>
    <div class="container">
      <div class="lst-groups">
        <ul>
          <li v-for="(group,index) in groups" :key="index">
            <p class="lst-item">
              {{index}} - {{group.name}}
            <q-btn
              size="1rem"
              label="show"
              @click="handlePressButton('showGroup', group.id)"
              color="primary"/>
              </p>
          </li>
        </ul>
      </div>
      <div class="groups-info" v-if="isCreatingNew">
        <h3 class="login-text">
          Novo Grupo
        </h3>
        <q-form
          class="q-gutter-md"
          @submit="postGroup()"
          >
          <q-input
            outlined
            v-model="newGroup.name"
            label="Nome do Grupo"/>
          <q-select
            outlined
            v-model="newGroup.type"
            label="Tipo do Grupo"
            :options="groupTypes"
            option-value="url"
            option-label="name"
            emit-value
            map-options/>
          <div class="text-center q-mt-lg">
            <q-btn
              size="1rem"
              label="Enviar"
              type="submit"
              color="primary"/>
          </div>
        </q-form>
      </div>
      <div class="group-info" v-if="isSelectedGroup">
        <h3 class="login-text">
          Editar dados
        </h3>
        <p>Id: {{group.id}}</p>
        <q-form
        class="q-gutter-md"
        @submit="putGroup()"
        >
        <q-input
          outlined
          v-model="group.name"
          label="Nome do Group"/>
        <q-select
          outlined
          v-model="group.type"
          label="Tipo do Grupo"
          :options="groupTypes"
          option-value="url"
          option-label="name"
          emit-value
          map-options/>
        <div class="text-center q-mt-lg">
          <q-btn
            size="1rem"
            label="Salvar"
            type="submit"
            color="primary"/>
          <q-btn
            size="1rem"
            label="Deletar"
            @click="deleteGroup(group.id)"
            color="primary"/>
        </div>
      </q-form>
      </div>
    </div>
  </div>
</template>

<script>
import MASTER from '../services/masterApi/http-common'

export default {
  name: 'Groups',
  data () {
    return {
      groups: [],
      group: {},
      isSelectedGroup: false,
      isCreatingNew: false,
      newGroup: {},
      groupTypes: []
    }
  },
  created () {
    this.getGroups()
    this.getGroupTypes()
  },
  methods: {
    handlePressButton (type, id = null) {
      const buttonActions = {
        newGroup: () => {
          this.isSelectedGroup = false
          this.isCreatingNew = !this.isCreatingNew
        },
        showGroup: () => {
          this.isSelectedGroup = true
          this.isCreatingNew = false
          this.getGroupById(id)
        }
      }
      if (buttonActions[type]) buttonActions[type]()
    },
    getGroups () {
      MASTER
        .get('groups/')
        .then(({ data: groupsList }) => {
          this.groups = groupsList
        })
        .catch(error => console.log('Error in getGroups: ', error))
    },
    getGroupById (id) {
      MASTER
        .get(`groups/${id}`)
        .then(({ data: group }) => {
          this.group = group
          this.isSelectedGroups = true
        })
        .catch(error => console.log('Error in getGroups: ', error))
    },
    putGroup () {
      const { id } = this.group
      MASTER
        .put(`groups/${id}`, this.group)
        .then(({ data: updatedGroup }) => {
          this.group = updatedGroup
          this.updateGroupList(updatedGroup)
          this.$q.notify({
            type: 'positive',
            message: 'Seus dados foram atualizados.'
          })
        })
        .catch(error => {
          console.log('Error in putGroup: ', error)
          this.$q.notify({
            type: 'negative',
            message: 'Falha ao editar seus dados. Tente novamente.'
          })
        })
    },
    deleteGroup (id) {
      MASTER
        .delete(`groups/${id}`)
        .then(res => {
          this.removeGroupFromList(id)
          this.groups = this.groups.filter((group) => group.id !== id)
          this.$q.notify({
            type: 'positive',
            message: 'Groups deletado com sucesso.'
          })
          this.isSelectedGroup = false
          this.group = {}
          console.log(res.data)
        })
        .catch(error => console.log('Error in deleteGroup: ', error))
    },
    postGroup () {
      MASTER
        .post('groups/', this.newGroup)
        .then(({ data: newGroup }) => {
          this.groups.push(newGroup)
          this.newGroup = {}
        })
        .catch(error => console.log('Error in postGroup: ', error))
    },
    getGroupTypes () {
      MASTER
        .get('group-types/', this.groupTypes)
        .then(({ data: groupTypeList }) => {
          this.groupTypes = groupTypeList
        })
        .catch(error => console.log('Error in getGroupTypes: ', error))
    },
    updateGroupList (updatedGroup) {
      this.groups = this.groups.map((group) => group.id === updatedGroup.id ? updatedGroup : group)
    },
    removeGroupFromList (groupId) {
      this.groups = this.groups.filter((group) => group.id !== groupId)
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
.groups-info {
  padding   : 20px;
}
.title {
  padding-left: 20px;
}
.btn {
  padding   : 20px;
}

</style>
