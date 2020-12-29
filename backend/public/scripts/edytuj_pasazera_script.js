function validate(){
    const form = document.getElementById("myForm");


    form.addEventListener('submit', function(e) {
        e.preventDefault(); //przerywamy domyślną wysyłkę
        var errors = [];

        var name = form.elements["paxName"].value;
        var lastname = form.elements["paxLastname"].value;
        var email = form.elements["email"].value;
        var pesel = form.elements["pesel"].value;
        var weight = form.elements["paxMass"].value; 
        var luggageMass = form.elements["luggageMass"].value; 
        var luggageX = form.elements["luggageX"].value; 
        var luggageY = form.elements["luggageY"].value; 
        var luggageZ = form.elements["luggageZ"].value; 

        const textReg = /^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźżŻ]{3,}$/;
        const mailReg = new RegExp('^[0-9a-z_.-]+@[0-9a-z.-]+\.[a-z]{2,3}$', 'i');
        const peselReg = /^[0-9]{11}$/;
        const weightReg = /^[0-9]{2,3}$/;
        
        checkField ("paxName", "Imię", name, !textReg.test(name), "Imię powinno zawierać conajmniej 3 znaki nie będące liczbami");
        checkField ("paxLastname", "Nazwisko", lastname, !textReg.test(lastname), "Nazwisko powinno zawierać conajmniej 3 znaki nie będące liczbami");
        checkField ("email", "Email", email, !mailReg.test(email), "Email powinien posiadać format [znaki] @ [znaki] . [znaki]");
        checkField ("pesel", "Pesel", pesel, !peselReg.test(pesel), "Pesel powinien składać się z 11 cyfr");
        checkField ("paxMass", "Waga pasażera", weight, !weightReg.test(weight), "Waga powinna składać się z od 2 do 3 cyfr");

        checkField ("luggageMass", "waga bagażu", luggageMass, !(luggageMass > 0 && luggageMass <= 100), "Dozwolona waga bagażu należy do przedziału 1 - 100kg");
        checkField ("luggageX", "długość bagażu", luggageX, !(luggageX > 0 && luggageX < 50), "Dozwolona długość bagażu należy do przedziału 1 - 100cm");
        checkField ("luggageY", "szerokość bagażu", luggageY, !(luggageY > 0 && luggageY < 50), "Dozwolona szerokość bagażu należy do przedziału 1 - 100cm");
        checkField ("luggageZ", "wysokość bagażu", luggageZ, !(luggageZ > 0 && luggageZ < 50), "Dozwolona wysokość bagażu należy do przedziału 1 - 100cm");        
        if(!errors.length) {
            document.getElementById("summary").innerHTML = "";
            this.submit();
        } else {
            document.getElementById("summary").innerHTML = "<b>Niepoprawne dane:</b> <li>" + errors.join("<li>");
        }

        function checkRadioButton(radioName, radio, errorMsg){
            let selectedValue = null;
            for (const option of radio) {
                if (option.checked) {
                    selectedValue = option.value;
                    break;
                }
            }
            if (selectedValue == null) {
                showError(radioName, "Wybierz jedną z opcji");
                errors.push(errorMsg);
            }else{
                hideError(radioName);
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