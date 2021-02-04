function validateForm() {
    const passportId = document.getElementById('IdKlient');
    const imie = document.getElementById('name');
    const nazwisko = document.getElementById('surname');
    const dateOfBirth = document.getElementById('DateOfBirth');
    const numerTel = document.getElementById('Telephone');
    const email = document.getElementById('Email');
    const address = document.getElementById('Address');

    const errorID = document.getElementById('errorID');
    const errorImie = document.getElementById('errorName');
    const errorNazwisko = document.getElementById('errorSurname');
    const errorYear = document.getElementById('errorYear');
    const errorEmail = document.getElementById('errorEmail');
    const errorNumerNumerTel = document.getElementById('errorTelephone');
    const errorAddress = document.getElementById('errorAddress');

    resetErrors([passportId, imie, nazwisko, dateOfBirth, numerTel, email, address], [errorID, errorImie, errorNazwisko, errorYear, errorEmail, errorNumerNumerTel, errorAddress], errorsSummary);

    let valid = true;
    //////////////////////////////////////////////////////////////////////
    //passportId

    if (!checkRequired(passportId.value)) {
        valid = false;
        passportId.classList.add("error-input");
        errorID.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(passportId.value, 10, 20)) {
        valid = false;
        passportId.classList.add("error-input");
        errorID.innerText = "Pole powinno zawierać od 10 do 20 znaków";
    }
    //////////////////////////////////////////////////////////////////////
    //Imie

    if (!checkRequired(imie.value)) {
        valid = false;
        imie.classList.add("error-input");
        errorImie.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(imie.value, 2, 40)) {
        valid = false;
        imie.classList.add("error-input");
        errorImie.innerText = "Pole powinno zawierać od 2 do 40 znaków";
    } else if (hasNumber(imie.value)) {
        valid = false;
        imie.classList.add("error-input");
        errorImie.innerText = "Imie nie może zawierać liczb";
    }
    //////////////////////////////////////////////////////////////////////
    //Nazwisko

    if (!checkRequired(nazwisko.value)) {
        valid = false;
        nazwisko.classList.add("error-input");
        errorNazwisko.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(nazwisko.value, 2, 60)) {
        valid = false;
        nazwisko.classList.add("error-input");
        errorNazwisko.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    } else if (hasNumber(nazwisko.value)) {
        valid = false;
        nazwisko.classList.add("error-input");
        errorNazwisko.innerText = "Nazwisko nie może zawierać liczb";
    }
    //////////////////////////////////////////////////////////////////////
    //dateOfBirth

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (!checkRequired(dateOfBirth.value)) {
        valid = false;
        dateOfBirth.classList.add("error-input");
        errorYear.innerText = "Pole jest wymagane";
  
    }else if (checkDateIfAfter(dateOfBirth.value, nowDate)) {
        valid = false;
        dateOfBirth.classList.add("error-input");
        errorYear.innerText = "Data nie może być z przyszłości";
    }
    //////////////////////////////////////////////////////////////////////
    //Email

    if (!checkRequired(email.value)) {
        valid = false;
        email.classList.add("error-input");
        errorEmail.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(email.value, 5, 60)) {
        valid = false;
        email.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierać od 5 do 60 znaków";
    } else if (!checkEmail(email.value)) {
        valid = false;
        email.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierać prawidłowy adres email";
    }
    //////////////////////////////////////////////////////////////////////
    //NumerTelefonu


        if (numerTel.value.length == 0) {
            valid = false;
            numerTel.classList.add("error-input");
            errorNumerNumerTel.innerText = "Pole jest wymagane";
        } else if (!checkTextLengthRange(numerTel.value, 9, 12)) {
            valid = false;
            numerTel.classList.add("error-input");
            errorNumerNumerTel.innerText = "Pole powinno zawierać od 9 do 12 znaków";
        }else if(numerTel.value.includes('+') || numerTel.value.includes('-')){
            valid = false;
            numerTel.classList.add("error-input");
            errorNumerNumerTel.innerText = "Pole nie może zawierać znaków '+' oraz '-' ";
        }
    
    //////////////////////////////////////////////////////////////////////
    //Address
    if (!checkRequired(address.value)) {
        valid = false;
        address.classList.add("error-input");
        errorAddress.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(address.value, 4, 20)) {
        valid = false;
        address.classList.add("error-input");
        errorAddress.innerText = "Pole powinno zawierać od 4 do 20 znaków";
    }


    return valid;


}







