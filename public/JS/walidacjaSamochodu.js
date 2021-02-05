function validateForm() {

    const NumerSamochod = document.getElementById('IdSamochod');
    const brand = document.getElementById('Marka');
    const model = document.getElementById('Model');
    const yearOfManufacture = document.getElementById('Rok_Produkcji');
    const pricePerDay = document.getElementById('Cena_Za_Dzien');




    const errorID = document.getElementById('errorID');
    const errorBrand = document.getElementById('errorBrand');
    const errorModel = document.getElementById('errorModel');
    const errorYear = document.getElementById('errorYear');
    const errorPrice = document.getElementById('errorPrice');



    resetErrors([NumerSamochod, brand, model, yearOfManufacture, pricePerDay], [errorID, errorBrand, errorModel, errorYear, errorPrice], errorsSummary);

    let valid = true;
    //////////////////////////////////////////////////////////////////////
    //NumerSamochod

    if (!checkRequired(NumerSamochod.value)) {
        valid = false;
        NumerSamochod.classList.add("error-input");
        errorID.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(NumerSamochod.value, 2, 60)) {
        valid = false;
        NumerSamochod.classList.add("error-input");
        errorID.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }
    //////////////////////////////////////////////////////////////////////
    //Brand

    if (!checkRequired(brand.value)) {
        valid = false;
        brand.classList.add("error-input");
        errorBrand.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(brand.value, 3, 20)) {
        valid = false;
        brand.classList.add("error-input");
        errorBrand.innerText = "Pole powinno zawierać od 3 do 20 znaków";
    }

    //////////////////////////////////////////////////////////////////////
    //Model

    if (!checkRequired(model.value)) {
        valid = false;
        model.classList.add("error-input");
        errorModel.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(model.value, 2, 40)) {
        valid = false;
        model.classList.add("error-input");
        errorModel.innerText = "Pole powinno zawierać od 3 do 20 znaków";
    }

    //////////////////////////////////////////////////////////////////////
    //PricePerDay

    if (!checkRequired(pricePerDay.value)) {
        valid = false;
        pricePerDay.classList.add("error-input");
        errorPrice.innerText = "Pole jest wymagane";
        console.log(pricePerDay.value);
    } else if (!hasNumber(pricePerDay.value)) {
        valid = false;
        pricePerDay.classList.add("error-input");
        errorPrice.innerText = "Cena musi być liczbą";
    } else if (Math.sign(pricePerDay.value) === -1) {
        valid = false;
        pricePerDay.classList.add("error-input");
        errorPrice.innerText = "Cena musi być liczbą DODATNIĄ";
    } else if (Math.sign(pricePerDay.value) === 0) {
        valid = false;
        pricePerDay.classList.add("error-input");
        errorPrice.innerText = "Cena nie może równać się 0";
    }

    //////////////////////////////////////////////////////////////////////
    //YearOfManufacture

let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();



    if (!checkRequired(yearOfManufacture.value)) {
        valid = false;
        yearOfManufacture.classList.add("error-input");
        errorYear.innerText = "Pole jest wymagane";
  
    }else if (checkDateIfAfter(yearOfManufacture.value, nowDate)) {
        valid = false;
        yearOfManufacture.classList.add("error-input");
        errorYear.innerText = "Data nie może być z przyszłości";
    }


    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;



}

