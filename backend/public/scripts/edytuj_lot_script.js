function validate(){
    const form = document.getElementById("myForm");

    form.addEventListener('submit', function(e) {
        e.preventDefault(); //przerywamy domyślną wysyłkę
        var errors = [];

        var seats = form.elements["seats"].value; 
        var date = form.elements["date"].value;        
        const start = document.querySelector('select[name="start"]');
        const landing = document.querySelector('select[name="landing"]');
        const ships = document.querySelector('select[name="ships"]');
        const currDate = new Date();
        // const textReg = /^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźżŻ]{3,}$/;
        // name = name[0].toUpperCase()+name.slice(1)
        
        checkField ("date", date, currDate.getTime() >= Date.parse(date), "Data nie może być wcześniejsza niż dzisiejsza");
        checkField ("seats", seats, !(seats > 0 && seats < 1000), "Liczba miejsc leży w przedziale 1 - 999");
        checkSelectBox("start", start, "Wybierz miejsce startu z listy");
        checkSelectBox("landing", landing, "Wybierz miejsce lądowania z listy");
        checkSelectBox("ships", ships, "Wybierz statek z listy");

        if(!errors.length) {
            document.getElementById("summary").innerHTML = "";
            this.submit();
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
    });
}