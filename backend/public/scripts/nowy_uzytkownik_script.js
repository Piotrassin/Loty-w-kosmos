function validate(){
    const form = document.getElementById("myForm");


    form.addEventListener('submit', function(e) {
        e.preventDefault(); //przerywamy domyślną wysyłkę
        var errors = [];

        var name = form.elements["firstname"].value;
        var lastname = form.elements["lastname"].value;
        var email = form.elements["email"].value;
        var pesel = form.elements["pesel"].value;
        var weight = form.elements["weight"].value; 


        const textReg = /^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźżŻ]{3,}$/;
        const mailReg = new RegExp('^[0-9a-z_.-]+@[0-9a-z.-]+\.[a-z]{2,3}$', 'i');
        const peselReg = /^[0-9]{11}$/;
        const weightReg = /^[0-9]{2,3}$/;
        
        checkField ("firstname", "Imię", name, !textReg.test(name), "Imię powinno zawierać conajmniej 3 znaki nie będące liczbami");
        checkField ("lastname", "Nazwisko", lastname, !textReg.test(lastname), "Nazwisko powinno zawierać conajmniej 3 znaki nie będące liczbami");
        checkField ("email", "Email", email, !mailReg.test(email), "Email powinien posiadać format [znaki] @ [znaki] . [znaki]");
        checkField ("pesel", "Pesel", pesel, !peselReg.test(pesel), "Pesel powinien składać się z 11 cyfr");
        checkField ("weight", "Waga użytkownika", weight, !weightReg.test(weight), "Waga powinna składać się z od 2 do 3 cyfr");

        if(!errors.length) {
            document.getElementById("summary").innerHTML = "";
            this.submit();
        } else {
            document.getElementById("summary").innerHTML = "<b>Niepoprawne dane:</b> <li>" + errors.join("<li>");
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