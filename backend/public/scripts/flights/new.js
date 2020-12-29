new Vue({
    el: '#app',

    data() {
        return {
          DepDate: '',
          ArrDate: '',
          Description: '',
          Origin: '',
          Destination: ''
        };
    },
    methods: {
        formSubmit(e) {
            e.preventDefault();
            let currentObj = this;
            this.axios.post('http://localhost:3000/flights', {
                DepDate: this.DepDate,
                ArrDate: this.ArrDate,
                Description: this.Description,
                Origin: this.Origin,
                Destination: this.Destination
            })
            .then(function (response) {
                currentObj.output = response.data;
            })
            .catch(function (error) {
                currentObj.output = error;
            });
        }
    }
})