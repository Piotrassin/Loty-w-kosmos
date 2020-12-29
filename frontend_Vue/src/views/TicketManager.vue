<template>
<div>
 <div id="outer-grid" >
    <!-- <ul class="breadcrumb">
      <li><a href="index1.html">Strona główna</a></li>
      <li>Lista użytkowników</li>
    </ul> -->

    <div id="middle-inner-grid">

    <div v-if="!ShowForm">
      <div id="left"></div>
      <div id="center" class="List">
        <div class="scrollit">
          <table >
            <thead>
              <tr class="visibleTable">
                <th class="visibleTable">Imię</th>
                <th class="visibleTable">Nazwisko</th>
                <th class="visibleTable">Data startu</th>
                <th class="visibleTable">Miejsce start</th>
                <th class="visibleTable">Data lądowania</th>
                <th class="visibleTable">Miejsce lądowania</th>
                <th class="visibleTable">Opcje</th>
              </tr>
            </thead>
            <tbody v-for="ticket in tickets" v-bind:key="ticket.Id">
              <tr class="visibleTable">
                <td>{{ticket.FirstName}}</td>
                <td>{{ticket.LastName}}</td>
                <td>{{ticket.DepDate | trimSingleDate}}</td>
                <td>{{ticket.Origin}}</td>
                <td>{{ticket.ArrDate | trimSingleDate}}</td>
                <td>{{ticket.Destination}}</td>
                <td>
                  <a @click.prevent="showDetails(ticket.Id)">
                    <img src="../assets/icons/details.svg" class="icon">
                  </a> |
                  <a href="#" @click.prevent="deleteTicket(ticket.Id)">
                    <img src="../assets/icons/delete.svg" class="icon">
                  </a>
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
          <button class="registerbutton" @click="newTicket(); refreshAll()">+ Dodaj</button>
        </div>
      </div>
      <div id="right"></div>
    </div>

    <div></div>
    <div  v-if="ShowForm">
      <form id="myForm">
      <div id="left">
      </div>

      <div id="center" class="Form_center">
          <span class="Form_left">
            <tr>
              <label>Użytkownik</label>
            </tr>
            <tr>
              <td>
                <select v-model="currentTicket.User_Id" class="inputWidth" id="pax" name="pax">
                  <option  v-for="user in users" v-bind:value="user.Id" v-bind:key="user.Id">{{user.FirstName}}</option>
                </select>
                <label id="paxError" style="display: inline; color: red; font-weight: bold;" class="error_msg"></label>
              </td>
            </tr>
            <tr>
              <label>Lot</label>
            </tr>
            <tr>
              <td>
                <select v-model="currentTicket.Flight_Id" class="inputWidth" id="flight" name="flight">
                  <option  v-for="flight in flights" v-bind:value="flight.Id" v-bind:key="flight.Id">
                    {{flight.Origin}} => {{flight.Destination}}, start: {{flight.DepDate | trimSingleDate}}
                  </option>
                </select>
                <label id="flightError" style="display: inline; color: red; font-weight: bold;" class="error_msg"></label>
              </td>
            </tr>
            <tr>
              <label>Numer miejsca</label>
            </tr>
            <tr>
              <input v-model="currentTicket.SeatNumber" type="number" id="seatnumber"/>
              <label id="seatnumberError" style="display: inline; color: red; font-weight: bold;" class="error_msg"></label>
            </tr>
            <tr>
              <label>Cena</label>
            </tr>
            <tr>
              <input v-model="currentTicket.Price" type="number" id="price"/>
              <label id="priceError" style="display: inline; color: red; font-weight: bold;" class="error_msg"></label>
            </tr>
            <tr>
              <label>Masa bagażu</label>
            </tr>
            <tr>
              <input v-model="currentTicket.LuggageMass" type="number" id="luggagemass"/>
              <label id="luggagemassError" style="display: inline; color: red; font-weight: bold;" class="error_msg"></label>
            </tr>
            <tr>
              <label>Długość bagażu</label>
            </tr>
            <tr>
              <input v-model="currentTicket.LuggageX" type="number" id="luggageX"/>
              <label id="luggageXError" style="display: inline; color: red; font-weight: bold;" class="error_msg"></label>
            </tr>
            <tr>
              <label>Szerokość bagażu</label>
            </tr>
            <tr>
              <input v-model="currentTicket.LuggageY" type="number" id="luggageY"/>
              <label id="luggageYError" style="display: inline; color: red; font-weight: bold;" class="error_msg"></label>
            </tr>
                      <tr>
              <label>Wysokość bagażu</label>
            </tr>
            <tr>
              <input v-model="currentTicket.LuggageZ" type="number" id="luggageZ"/>
              <label id="luggageZError" style="display: inline; color: red; font-weight: bold;" class="error_msg"></label>
            </tr>

            <tr>
              <div style="display: inline; max-width: 100%;">
                <button @click="ShowForm = false; editing = false" class="formButton">Powrót</button>
                <button @click="foo()" class="formButton" type="button">Zatwierdź</button>
              </div>
            </tr>
          </span>
          <p id="summary" style="color: red;"></p>
        </div>
        <div id="right"></div>
      </form>

    </div>
  </div>
</div>
</div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      tickets: [],
      users: [],
      flights: [],
      currentTicket: {
        Id: null,
        SeatNumber: null,
        Price: null,
        LuggageMass: null,
        LuggageX: null,
        LuggageY: null,
        LuggageZ: null,
        Flight_Id: null,
        User_Id: null
      },
      loading: false,
      ShowForm: false,
      editing: false
    }
  },
  async created () {
    this.refreshTickets()
    this.refreshUsers()
  },
  methods: {
    async refreshTickets () {
      this.loading = true
      this.tickets = await api.getTickets()
      this.currentTicket = {}
      this.loading = false
    },
    async refreshUsers () {
      this.loading = true
      this.users = await api.getUsers()
      this.loading = false
    },
    async refreshFlights () {
      this.loading = true
      this.flights = await api.getFlights()
      this.flights.forEach(flight => {
        this.trimDate(flight)
      })
      this.loading = false
    },
    async refreshAll () {
      this.loading = true
      await this.refreshTickets()
      await this.refreshUsers()
      await this.refreshFlights()
      this.loading = false
    },
    newTicket () {
      this.currentTicket = {}
      this.ShowForm = true
      this.editing = true
    },
    async showDetails (id) {
      await this.getDetails(id)
      this.ShowForm = true
      this.editing = true
    },
    async deleteTicket (id) {
      if (confirm('To spowoduje nieodwracalne usunięcie biletu.')) {
        await api.deleteTicket(id)
        await this.refreshTickets()
      }
    },
    async updateTicket (currentTicket) {
      api.updateTicket(this.id, this.currentTicket)
      this.refreshData()
    },
    refreshData () {
      this.loaded = false
      this.$router.go(0)
      this.loaded = true
    },
    async getDetails (id) {
      let abc = await api.getTicket(id)
        .then((payload) => {
          this.currentTicket = payload[0]
        })
      console.log(abc)
    },
    async foo () {
      if (this.validate()) {
        console.log('foo is true')
        await this.createTicket()
        this.ShowForm = false
        this.editing = false
      }
    },
    async createTicket () {
      console.log('creating')
      console.log(this.currentTicket.Id)
      if (this.currentTicket.Id) {
        await api.updateTicket(this.currentTicket.Id, this.currentTicket)
        console.log('updated?')
      } else {
        await api.createTicket(this.currentTicket)
      }
      await this.refreshAll()
    },
    trimDate (ticket) {
      ticket.DepDate = ticket.DepDate.substring(0, 10)
      ticket.ArrDate = ticket.ArrDate.substring(0, 10)
    },
    validate () {
      const form = document.getElementById('myForm')
      var errors = []

      var pax = form.querySelector('select[name=pax]')
      var flight = form.querySelector('select[name=flight]')
      var seatnumber = form.elements['seatnumber'].value
      var price = form.elements['price'].value
      var luggageMass = form.elements['luggagemass'].value
      var luggageX = form.elements['luggageX'].value
      var luggageY = form.elements['luggageY'].value
      var luggageZ = form.elements['luggageZ'].value

      checkField('seatnumber', 'siedzenie', seatnumber, !(seatnumber > 0 && seatnumber <= 50), 'Numery siedzeń należą do przedziału 1 - 50')
      checkField('price', 'cena biletu', price, !(price > 7999 && seatnumber <= 20000), 'Cena biletu musi należeć do przedziału 8 000 - 20 000 zł')
      checkField('luggagemass', 'waga bagażu', luggageMass, !(luggageMass > 0 && luggageMass <= 100), 'Dozwolona waga bagażu należy do przedziału 1 - 100kg')
      checkField('luggageX', 'długość bagażu', luggageX, !(luggageX > 0 && luggageX < 100), 'Dozwolona długość bagażu należy do przedziału 1 - 100cm')
      checkField('luggageY', 'szerokość bagażu', luggageY, !(luggageY > 0 && luggageY < 100), 'Dozwolona szerokość bagażu należy do przedziału 1 - 100cm')
      checkField('luggageZ', 'wysokość bagażu', luggageZ, !(luggageZ > 0 && luggageZ < 100), 'Dozwolona wysokość bagażu należy do przedziału 1 - 100cm')
      checkSelectBox('pax', pax, 'Wybierz użytkownika z listy')
      checkSelectBox('flight', flight, 'Wybierz lot z listy')

      if (!errors.length) {
        document.getElementById('summary').innerHTML = ''
        return true
      } else {
        document.getElementById('summary').innerHTML = '<b>Niepoprawne dane:</b> <li>' + errors.join('<li>')
        return false
      }

      function checkSelectBox (selectName, select, errorMsg) {
        if (select.value === '-1' || select.value === '' || select.value === null) {
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
  },
  filters: {
    trimSingleDate (value) {
      return value.substring(0, 10)
    }
  }
}
</script>
