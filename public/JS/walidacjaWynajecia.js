function validateForm() {

    const carId = document.getElementById('Klient_IdKlient');
    const rentalDate = document.getElementById('Data_Wynajecia');
    const endDate = document.getElementById('Data_Oddania');


    const errorCarId = document.getElementById('errorKlient');
    const errorRentalDate = document.getElementById('errorRentalDate');
    const errorEndDate = document.getElementById('errorEndDate');

    console.log("Cos");

    resetErrors([carId, rentalDate, endDate], [ errorCarId, errorRentalDate, errorEndDate], errorsSummary);

    let valid = true;

    //////////////////////////////////////////////////////////////////////
    //Produkt

    if (!checkRequired(carId.value)) {
        valid = false;
        carId.classList.add("error-input");
        errorCarId.innerText = "Pole jest wymagane";
    }

//////////////////////////////////////////////////////////////////////
    //Data

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (!checkRequired(endDate.value)) {
        valid = false;
        endDate.classList.add("error-input");
        errorEndDate.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(rentalDate.value)) {
        valid = false;
        rentalDate.classList.add("error-input");
        errorRentalDate.innerText = "Pole jest wymagane";
    }
    else if (checkDateIfAfter(nowDate ,rentalDate.value, )) {
        valid = false;
        rentalDate.classList.add("error-input");
        errorRentalDate.innerText = "Data nie może być z przeszłości";
    } else if (checkRequired(endDate.value) && !checkDateIfAfter(endDate.value, rentalDate.value)) {
        //jeśli data od oraz data do jest poprawna, sprawdzamy kolejność dat
        valid = false;
        endDate.classList.add("error-input");
        errorEndDate.innerText = "Data oddania powinna być późniejsza niż data wynajęcia";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;



}
