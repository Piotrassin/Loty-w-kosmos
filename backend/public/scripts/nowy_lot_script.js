function validate(){
    const form = document.getElementById("myForm");

    form.addEventListener('submit', function(e) {
        e.preventDefault(); //przerywamy domyślną wysyłkę
        var errors = [];

        var date1 = form.elements["date1"].value;        
        var date2 = form.elements["date2"].value;        
        const start = document.querySelector('select[name="start"]');
        const landing = document.querySelector('select[name="landing"]');
        // const ships = document.querySelector('select[name="ships"]');
        const currDate = new Date();
        // const textReg = /^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźżŻ]{3,}$/;
        // name = name[0].toUpperCase()+name.slice(1)
        
        checkField ("date1", "Data startu", date1, currDate.getTime() >= Date.parse(date1), "Data nie może być wcześniejsza niż dzisiejsza");
        checkField ("date2", "Data lądowania", date2, Date.parse(date1) >= Date.parse(date2), "Data nie może być wcześniejsza niż data startu");
        checkSelectBox("start", start, "Wybierz miejsce startu z listy");
        checkSelectBox("landing", landing, "Wybierz miejsce lądowania z listy");
        // checkSelectBox("ships", ships, "Wybierz statek z listy");

        if(!errors.length) {
            document.getElementById("summary").innerHTML = "";
            // this.submit();
            formSubmit(seats, date1, date2, start, landing);
        } else {
            document.getElementById("summary").innerHTML = "<b>Wpisałeś błędne dane:</b> <li>" + errors.join("<li>");
        }

        function checkSelectBox(selectName, select, errorMsg){
            if(select.value == "-1"){
                showError(selectName, "Wybierz jedną z opcji");
                errors.push(errorMsg);
            }else{
                hideError(selectName);
            }
        }
        function checkField(fieldName, fieldPrettyName, field, incorrect, errorMsg){
            if(field == ''){
                showError(fieldName, "To pole nie może być puste");
                errors.push("Wartość w polu " + fieldPrettyName + " nie jest poprawna");
            }
            else if(incorrect){
                showError(fieldName, errorMsg)
                errors.push("Wartość w polu " + fieldPrettyName + " nie jest poprawna");
            }else{
                hideError(fieldName);
            }
        }
        function showError(field, msg){
            document.getElementById(field).style.backgroundColor = "pink";
            document.getElementById(field + "Error").style.display = "inline";
            document.getElementById(field + "Error").innerHTML = msg
        }
        function hideError(field){
            document.getElementById(field).style.backgroundColor = "white";
            document.getElementById(field + "Error").style.display = "none"
        }
    });


}
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
        formSubmit(date1, date2, start, landing) {
            e.preventDefault();
            let currentObj = this;
            this.axios.post('http://localhost:3000/flights', {
                DepDate: date1,
                ArrDate: date2,
                // Description: this.Description,
                Origin: start,
                Destination: landing
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