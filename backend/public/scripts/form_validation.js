function validate(){
    const form = document.getElementById("myForm");
    var errors = [];

    form.addEventListener('submit', function(e) {
        e.preventDefault(); //przerywamy domyślną wysyłkę

        // var name = form.elements["name"].value;
        // var lastname = form.elements["lastname"].value;
        // var email = form.elements["email"].value;
        // var pesel = form.elements["pesel"].value;
        // var weight = form.elements["weight"].value; 
        var paxRadio = form.querySelectorAll('input[name=pax]');

        var seats = form.elements["seats"].value; 
        var date = form.elements["date"].value;        
        const start = document.querySelector('select[name="start"]');
        const landing = document.querySelector('select[name="landing"]');
        const ships = document.querySelector('select[name="ships"]');


        const textReg = /^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźżŻ]{3,}$/;
        const mailReg = new RegExp('^[0-9a-z_.-]+@[0-9a-z.-]+\.[a-z]{2,3}$', 'i');
        const peselReg = /^[0-9]{11}$/;
        const weightReg = /^[0-9]{2,3}$/;
        const seatsReg = /^[0-9]{1,3}$/;
        const currDate = new Date();

        // name = name[0].toUpperCase()+name.slice(1)
        
        // checkField ("name", name, !textReg.test(name), "Imię powinno zawierać conajmniej 3 znaki nie będące liczbami");
        // checkField ("lastname", lastname, !textReg.test(lastname), "Nazwisko powinno zawierać conajmniej 3 znaki nie będące liczbami");
        // checkField ("email", email, !mailReg.test(email), "Email powinien posiadać format [znaki] @ [znaki] . [znaki]");
        // checkField ("pesel", pesel, !peselReg.test(pesel), "Pesel powinien składać się z 11 cyfr");
        // checkField ("weight", weight, !weightReg.test(weight), "Waga powinna składać się z od 2 do 3 cyfr");
        checkField ("date", date, currDate.getTime() >= Date.parse(date), "Data nie może być wcześniejsza niż dzisiejsza");
        checkField ("seats", seats, !(seats > 0 && seats < 1000), "Liczba miejsc leży w przedziale 1 - 999");


        checkRadioButton("pax", pax, "Wybierz pasażera");
        checkSelectBox("start", start, "Wybierz miejsce startu z listy");
        checkSelectBox("landing", landing, "Wybierz miejsce lądowania z listy");
        checkSelectBox("ships", ships, "Wybierz statek z listy");

        if(!errors.length) {
            document.getElementById("summary").innerHTML = "";
            this.submit();
        } else {
            document.getElementById("summary").innerHTML = "<b>Wpisałeś błędne dane:</b> <li>" + errors.join("<li>");
        }
        
    });

    function checkRadioButton(selectName, select, errorMsg){
        if (typeof select === 'undefined') {
            break;
        }else {
            let selectedValue = null;
            for (const radio of genderRadio) {
                if (radio.checked) {
                    selectedValue = radio.value;
                    hideError("radio");
                    break;
                }
            }
            if (selectedValue == null) {
                showError("radio", "Zaznacz coś");
                errors.push("Musisz wybrać jedną z opcji");
            }
        }
        
    }
    function checkSelectBox(selectName, select, errorMsg){
        if(select.value == "-1"){
            showError(selectName, "Wybierz jedną z opcji");
            errors.push(errorMsg);
        }else{
            hideError(selectName);
        }
    }
    function checkField(fieldName, field, incorrect, errorMsg){
        if(field == ''){
            showError(fieldName, "To pole nie może być puste");
            errors.push("Wartość w polu " + fieldName + " nie jest poprawna");
        }
        else if(incorrect){
            showError(fieldName, errorMsg)
            errors.push("Wartość w polu " + fieldName + " nie jest poprawna");
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
}