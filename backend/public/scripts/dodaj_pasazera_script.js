function validate(){
    const form = document.getElementById("myForm");
    var errors = [];

    form.addEventListener('submit', function(e) {
        e.preventDefault(); //przerywamy domyślną wysyłkę

        var pax = form.querySelectorAll('input[name=pax]');
        var luggageMass = form.elements["luggageMass"].value; 
        var luggageX = form.elements["luggageX"].value; 
        var luggageY = form.elements["luggageY"].value; 
        var luggageZ = form.elements["luggageZ"].value; 
        
        checkField ("luggageMass", "waga bagażu", luggageMass, !(luggageMass > 0 && luggageMass <= 100), "Dozwolona waga bagażu należy do przedziału 1 - 100kg");
        checkField ("luggageX", "długość bagażu", luggageX, !(luggageX > 0 && luggageX < 50), "Dozwolona długość bagażu należy do przedziału 1 - 100cm");
        checkField ("luggageY", "szerokość bagażu", luggageY, !(luggageY > 0 && luggageY < 50), "Dozwolona szerokość bagażu należy do przedziału 1 - 100cm");
        checkField ("luggageZ", "wysokość bagażu", luggageZ, !(luggageZ > 0 && luggageZ < 50), "Dozwolona wysokość bagażu należy do przedziału 1 - 100cm");
        checkRadioButton("pax", pax, "Wybierz pasażera z tabeli");
        
        if(!errors.length) {
            document.getElementById("summary").innerHTML = "";
            this.submit();
        } else {
            document.getElementById("summary").innerHTML = "<b>Niepoprawne dane:</b> <li>" + errors.join("<li>");
        }
    });

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
    }
}