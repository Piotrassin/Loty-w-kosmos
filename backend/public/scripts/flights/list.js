new Vue({
    el: '#app',

    data() {
        return {
            flights: null
        }
    },

    mounted() {
        axios
            .get('http://localhost:3000/api/flights')
            .then(response => 
                (this.flights = response.data))
            .catch(e => console.log(e))
    }
})