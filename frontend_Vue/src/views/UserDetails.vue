<template>
  <div v-if="loaded">
    <h3>Szczegóły użytkownika</h3>
    <div id="middle-inner-grid">
      <div></div>
      <div id="center">
        <span class="Form_center">
          <table class="transparent">
            <tr>
              <td align="right"><label>Imię</label></td>
              <td><input v-model="user.FirstName" :disabled="!editing"></td>
            </tr>
            <tr>
              <td align="right"><label>Nazwisko</label></td>
              <td><input v-model="user.LastName" :disabled="!editing"></td>
            </tr>
            <tr>
              <td align="right"><label>Data urodzenia</label></td>
              <td><input v-model="user.Birthdate" :disabled="!editing"  type="date"/></td>
            </tr>
            <tr>
              <td align="right"><label>Waga</label></td>
              <td><input v-model="user.Weight" :disabled="!editing"/></td>
            </tr>
            <tr>
              <td align="right"><label>Adres email</label></td>
              <td><input v-model="user.Email" :disabled="!editing"/></td>
            </tr>
            <tr>
              <td>
                <a @click="$router.go(-1)" class="formButton">Powrót</a>
              </td>
              <td>
                <a @click="editing = !editing" v-if="!editing" class="formButton">Edytuj</a>
                <a @click="editing = !editing; refreshData()" v-if="editing" class="formButton">Anuluj</a>
                <a @click="editing = !editing; updateUser()" v-if="editing" class="formButton">Zapisz</a>
              </td>
            </tr>
          </table>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  data () {
    return {
      user: null,
      tmpUser: null,
      loaded: false,
      editing: false,
      model: {},
      id: 0
    }
  },
  methods: {
    copyUser () {
      this.tmpUser = JSON.parse(JSON.stringify(this.user))
    },
    async updateUser (user) {
      api.updateUser(this.id, this.user)
      this.refreshData()
    },
    refreshData () {
      this.loaded = false
      this.$router.go(0)
      this.loaded = true
    },
    getDetails (id) {
      api.getUser(this.id)
        .then((payload) => {
          this.user = payload[0]
        })
        .then((e) => {
          this.user.Birthdate = this.user.Birthdate.substring(0, 10)
        })
    },
    trimDate () {
      this.user.Birthdate = this.user.Birthdate.substring(0, 10)
    }
  },
  created () {
    this.loaded = false
    this.id = this.$route.params.id
    this.getDetails()
    this.loaded = true
  }
}
</script>

<style>
@import '../../public/style/buttons.css';
@import '../../public/style/form.css';
@import '../../public/style/style.css';
</style>
