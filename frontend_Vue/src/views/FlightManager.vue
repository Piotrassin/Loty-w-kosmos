<template>
<div>
 <div id="outer-grid" >
    <!-- <ul class="breadcrumb">
      <li><a href="index1.html">Strona główna</a></li>
      <li>Lista lotów</li>
    </ul> -->

    <div id="middle-inner-grid">
    <div id="left"></div>
    <div id="center" v-if="!ShowForm">
      <div class="scrollit">
        <table >
          <thead>
            <tr class="visibleTable">
              <th class="visibleTable">Data startu</th>
              <th class="visibleTable">Data lądowania</th>
              <th class="visibleTable">Miejsce startu</th>
              <th class="visibleTable">Miejsce lądowania</th>
              <th class="visibleTable">Opcje</th>
            </tr>
          </thead>
          <tbody v-for="flight in flights" v-bind:key="flight.Id">
            <tr class="visibleTable">
              <td>{{flight.DepDate}}</td>
              <td>{{flight.ArrDate}}</td>
              <td>{{flight.Origin}}</td>
              <td>{{flight.Destination}}</td>
              <td>
                <!-- <router-link :to="`/flights/${flight.Id}`"><img src="../assets/icons/details.svg" class="icon"></router-link> | -->
                <a @click.prevent="showDetails(flight.Id)"><img src="../assets/icons/details.svg" class="icon"></a> |
                <a href="#" @click.prevent="deleteFlight(flight.Id)" ><img src="../assets/icons/delete.svg" class="icon"></a>
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
        <a @click="newFlight()" class="registerbutton">Nowy lot</a>
      </div>
    </div>

    <div v-if="ShowForm">
      <form id="myForm">
          <span class="Form_left">
            <table class="transparent">
              <tr>
                <td align="right"><label>Data startu:</label></td>
                <td><input v-model="currentFlight.DepDate" :disabled="!editing" class="inputWidth" type="date" id="dateStart"/></td>
                <td><label id="dateStartError" style="display: block; color: red; font-weight: bold;" class="error_msg"></label></td>
              </tr>
              <tr>
                <td align="right"><label>Data lądowania:</label></td>
                <td><input v-model="currentFlight.ArrDate" :disabled="!editing" class="inputWidth" type="date" id="dateLanding"/></td>
                <td><label id="dateLandingError" style="display: block; color: red; font-weight: bold;" class="error_msg"></label></td>
              </tr>
              <tr>
                <td align="right"><label>Miejsce startu:</label></td>
                <td><select v-model="currentFlight.Origin" :disabled="!editing" class="inputWidth" name="start" id="start">
                  <option value="-1" selected="selected">Wybierz miejsce startu</option>
                  <option value="Mars">Mars</option>
                  <option value="Pluton">Pluton</option>
                  <option value="Ziemia">Ziemia</option>
                  <option value="Neptun">Neptun</option>
                  <option value="Księżyc">Księżyc</option>
                  <option value="Merkury">Merkury</option>
                  <option value="Uran">Uran</option>
                  <option value="Saturn">Saturn</option>
                </select></td>
                <td><label id="startError" style="display: block; color: red; font-weight: bold;" class="error_msg"></label></td>
              </tr>
              <tr>
                <td align="right"><label>Miejsce lądowania:</label></td>
                <td><select v-model="currentFlight.Destination" :disabled="!editing" class="inputWidth" id="landing" name="landing">
                  <option value="-1" selected="selected">Wybierz miejsce lądowania</option>
                  <option value="Pluton">Pluton</option>
                  <option value="Ziemia">Ziemia</option>
                  <option value="Mars">Mars</option>
                  <option value="Neptun">Neptun</option>
                  <option value="Księżyc">Księżyc</option>
                  <option value="Merkury">Merkury</option>
                  <option value="Uran">Uran</option>
                  <option value="Saturn">Saturn</option>
                </select></td>
                <td><label id="landingError" style="display: block; color: red; font-weight: bold;" class="error_msg"></label></td>
              </tr>
              <tr>
                <td align="right"><label>Opis:</label></td>
                <td><input v-model="currentFlight.Description" :disabled="!editing" class="inputWidth" type="textarea" name="description" id="description"/></td>
                <td><label id="descriptionError" style="display: block; color: red; font-weight: bold;" class="error_msg"></label></td>
              </tr>
            </table>
          </span>
          <div style="display: inline; max-width: 100%;">
            <!-- <button class="formButton" v-if="editing" @click="ShowForm = true; editing = true">Edytuj</button> -->
            <button class="formButton" @click="ShowForm = false; editing = false">Powrót</button>
            <button class="formButton"  type="button" @click="foo()">Zatwierdź</button>
          </div>
          <p id="summary" style="color: red;"></p>
        </form>
    </div>
    <div id="right"></div>
  </div>
</div>
</div>

</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      loading: false,
      flights: [],
      currentFlight: {
        Id: null,
        DepDate: '',
        ArrDate: '',
        Description: '',
        Origin: '',
        Destination: ''
      },
      ShowForm: false,
      editing: false
    }
  },
  async created () {
    this.refreshFlights()
  },
  methods: {
    newFlight () {
      this.currentFlight = {}
      this.ShowForm = true
      this.editing = true
    },
    async showDetails (id) {
      await this.getDetails(id)
      this.ShowForm = true
      this.editing = true
    },
    async deleteFlight (id) {
      if (confirm('To spowoduje usunięcie lotu wraz ze wszystkimi biletami na niego.')) {
        await api.deleteFlight(id)
        await this.refreshFlights()
      }
    },
    async refreshFlights () {
      this.loading = true
      this.flights = await api.getFlights()
      this.flights.forEach(flight => {
        this.trimDate(flight)
      })
      this.loading = false
    },
    async updateFlight (currentFlight) {
      api.updateFlight(this.id, this.user)
      this.refreshData()
    },
    refreshData () {
      this.loaded = false
      this.$router.go(0)
      this.loaded = true
    },
    getDetails (id) {
      api.getFlight(id)
        .then((payload) => {
          this.currentFlight = payload[0]
        }).then(e => {
          this.trimDate(this.currentFlight)
        })
    },
    trimDate (flight) {
      flight.DepDate = flight.DepDate.substring(0, 10)
      flight.ArrDate = flight.ArrDate.substring(0, 10)
    },
    async foo () {
      if (this.validate()) {
        await this.createFlight()
        this.ShowForm = false
        this.editing = false
      }
    },
    async createFlight () {
      if (this.currentFlight.Id) {
        await api.updateFlight(this.currentFlight.Id, this.currentFlight)
        // this.editing = false
      } else {
        await api.createFlight(this.currentFlight)
        // this.ShowForm = false
        // this.editing = false
      }
      await this.refreshFlights()
    },
    validate () {
      const form = document.getElementById('myForm')
      var errors = []

      var date1 = form.elements['dateStart'].value
      var date2 = form.elements['dateLanding'].value
      const start = document.querySelector('select[name="start"]')
      const landing = document.querySelector('select[name="landing"]')
      var description = form.elements['description'].value
      const currDate = new Date()
      // const textReg = /^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźżŻ]{3,}$/;
      // name = name[0].toUpperCase()+name.slice(1)

      checkField('dateStart', 'Data', date1, currDate.getTime() >= Date.parse(date1), 'Data startu nie może być wcześniejsza niż dzisiejsza')
      checkField('dateLanding', 'Data', date2, Date.parse(date1) >= Date.parse(date2), 'Data lądowania nie może być wcześniejsza niż start')
      checkField('description', 'Opis', description, description.length >= 127, 'Opis nie może przekraczać 127 znaków')
      checkSelectBox('start', start, 'Wybierz miejsce startu z listy')
      checkSelectBox('landing', landing, 'Wybierz miejsce lądowania z listy')

      if (!errors.length) {
        document.getElementById('summary').innerHTML = ''
        return true
      } else {
        document.getElementById('summary').innerHTML = '<b>Wpisano błędne dane:</b> <li>' + errors.join('<li>')
        return false
      }

      function checkSelectBox (selectName, select, errorMsg) {
        if (select.value === '-1' || select.value === '') {
          showError(selectName, 'Wybierz jedną z opcji')
          errors.push(errorMsg)
        } else {
          hideError(selectName)
        }
      }
      function checkField (fieldName, fieldPrettyName, field, incorrect, errorMsg) {
        if (field === '') {
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
