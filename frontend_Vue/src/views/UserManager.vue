<template>
<!-- <h1>Users</h1> -->

  <div id="outer-grid" >
    <ul class="breadcrumb">
      <li><a href="index1.html">Strona główna</a></li>
      <li>Lista użytkowników</li>
    </ul>

    <div id="middle-inner-grid">
    <div id="left"></div>

    <div id="center" class="List" v-if="!ShowForm">
    <div class="scrollit">
      <table >
        <thead>
          <tr class="visibleTable">
            <th class="visibleTable">Imię</th>
            <th class="visibleTable">Nazwisko</th>
            <th class="visibleTable">Opcje</th>
          </tr>
        </thead>
        <tbody v-for="user in users" v-bind:key="user.Id">
          <tr class="visibleTable">
            <td>{{user.FirstName}}</td>
            <td>{{user.LastName}}</td>
            <td>
              <router-link :to="`/users/${user.Id}`"><img src="../assets/icons/details.svg" class="icon"></router-link> |
              <a href="#" @click.prevent="deleteUser(user.Id)" ><img src="../assets/icons/delete.svg" class="icon" /></a>
            </td>
          </tr>
        </tbody>
      </table>
      </div>

      <div class="rightSide">
        <div class="leftSide">
        </div>
      </div>

      <div class="rightSide">
        <button href="#" class="registerbutton" @click="ShowForm = true">+ Dodaj</button>
      </div>
    </div>

    <div id="center" class="Form_center" v-if="ShowForm">
      <form id="myForm">
        <span class="Form_left">
          <tr>
            <label>Imię</label>
          </tr>
          <tr>
            <input v-model="newUser.FirstName" type="text" id="firstname"/>
            <label id="firstnameError" style="display: inline; color: red; font-weight: bold;" class="error_msg"></label>
          </tr>
          <tr>
            <label>Nazwisko</label>
          </tr>
          <tr>
            <input v-model="newUser.LastName" type="text" id="lastname"/>
            <label id="lastnameError" style="display: block; color: red; font-weight: bold;" class="error_msg"></label>
          </tr>
          <tr>
            <label>Data urodzenia</label>
          </tr>
          <tr>
            <input v-model="newUser.Birthdate" type="date" id="bday"/>
            <label id="bdayError" style="display: block; color: red; font-weight: bold;" class="error_msg"></label>
          </tr>
          <tr>
            <label>Waga</label>
          </tr>
          <tr>
            <input v-model="newUser.Weight" type="number" id="weight"/>
            <label id="weightError" style="display: block; color: red; font-weight: bold;" class="error_msg"></label>
          </tr>
          <tr>
            <label>Adres email</label>
          </tr>
          <tr>
            <input v-model="newUser.Email" type="email" id="email"/>
            <label id="emailError" style="display: block; color: red; font-weight: bold;" class="error_msg"></label>
          </tr>
          <tr>
            <div style="display: inline; max-width: 100%;">
              <button @click="ShowForm = false" class="formButton">Powrót</button>
              <button class="formButton" type="button" @click="foo()">Dodaj</button>
            </div>
          </tr>
        </span>
        <p id="summary" style="color: red;"></p>
      </form>
    </div>
    <div id="right"></div>
  </div>
</div>

</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      loading: false,
      users: [],
      newUser: {
        FirstName: '',
        LastName: '',
        Birthdate: '',
        Weight: null,
        Email: ''
      },
      ShowForm: false
    }
  },
  async created () {
    this.refreshUsers()
  },
  methods: {
    async deleteUser (id) {
      if (confirm('Czy na pewno chcesz usunąć użytkownika?')) {
        await api.deleteUser(id)
        await this.refreshUsers()
      }
    },
    async refreshUsers () {
      this.loading = true
      this.users = await api.getUsers()
      this.loading = false
    },
    async foo () {
      if (this.validate()) {
        this.createUser()
      }
    },
    async createUser () {
      await api.createUser(this.newUser)
      this.refreshUsers()
      this.ShowForm = false
    },
    validate () {
      const form = document.getElementById('myForm')
      var errors = []

      var name = form.elements['firstname'].value
      var lastname = form.elements['lastname'].value
      var bday = form.elements['bday'].value
      var email = form.elements['email'].value
      var weight = form.elements['weight'].value

      const textReg = /^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźżŻ]{3,}$/
      // eslint-disable-next-line no-useless-escape
      const mailReg = new RegExp('^[0-9a-z_.-]+@[0-9a-z.-]+\.[a-z]{2,3}$', 'i')
      const weightReg = /^[0-9]{2,3}$/
      const currDate = new Date()

      checkField('firstname', 'Imię', name, !textReg.test(name), 'Imię powinno zawierać conajmniej 3 znaki nie będące liczbami')
      checkField('bday', 'Data urodzenia', bday, !(currDate.getTime() >= Date.parse(bday)), 'Data urodzenia musi być z przeszłości')
      checkField('lastname', 'Nazwisko', lastname, !textReg.test(lastname), 'Nazwisko powinno zawierać conajmniej 3 znaki nie będące liczbami')
      checkField('email', 'Email', email, !mailReg.test(email), 'Email powinien posiadać format [znaki] @ [znaki] . [znaki]')
      checkField('weight', 'Waga użytkownika', weight, !weightReg.test(weight), 'Waga powinna składać się z od 2 do 3 cyfr')

      if (!errors.length) {
        document.getElementById('summary').innerHTML = ''
        return true
      } else {
        document.getElementById('summary').innerHTML = '<b>Niepoprawne dane:</b> <li>' + errors.join('<li>')
        return false
      }

      function checkField (fieldName, fieldPrettyName, field, incorrect, errorMsg) {
        // eslint-disable-next-line eqeqeq
        if (field == '') {
          showError(fieldName, 'To pole nie może być puste')
          errors.push('Wartość w polu ' + fieldPrettyName + ' nie jest poprawna')
        } else if (incorrect) {
          showError(fieldName, errorMsg)
          errors.push('Wartość w polu ' + fieldPrettyName + ' nie jest poprawna')
        } else {
          hideError(fieldName)
        }
      }
      function showError (field, msg) {
        document.getElementById(field).style.backgroundColor = 'pink'
        document.getElementById(field + 'Error').style.display = 'inline'
        document.getElementById(field + 'Error').innerHTML = msg
      }
      function hideError (field) {
        document.getElementById(field).style.backgroundColor = 'white'
        document.getElementById(field + 'Error').style.display = 'none'
      }
    }
  }
}
</script>

<style>
@import '../../public/style/buttons.css';
@import '../../public/style/form.css';
@import '../../public/style/style.css';
</style>
