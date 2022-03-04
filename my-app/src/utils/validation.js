import moment from 'moment'

export const nameRgx = (name) => {
    const nameCheck = /^[a-z ,.'-]+$/i;
    return nameCheck.test(name)
}

export const passwordCheck = (pass) => {
    const passCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passCheck.test(pass);
}

export const nameCheck = (name) => {
    const nameCheck = /^[^\s]+( [^\s]+)+$/;
    if(name){
        if(nameCheck.test(name)){
            return undefined;
        } else {
            return 'enter eg. John Smith'
        }
    } else {
        return undefined;
    }
}

export const addressCheck = (add) => {
    const address = /^\s*\S+(?:\s+\S+){2}/;
    if(add){
        if (address.test(add)){
            return undefined
        } else {
            return 'eg 22 bluehill ln'
        }
    } return undefined
}

export const zipCheck = (zip) => {
    const zipcodeChecker = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    if(zip){
        if (zipcodeChecker.test(zip)){
            return undefined
        } else {
            return 'return valid zip'
        }
    } else return undefined
}

export const phoneNumberCheck = (num) => {
    const numChecker = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if(num){
        if ( numChecker.test(num)){
            return undefined
        } else {
            return 'Input 10 digit phone number'
        }
    } else return undefined
}


export const cardNumberValidation = (cardNumber) => {
    const regexPattern = {
        MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
        VISA: /^4[0-9]{2,}$/, 
        AMEX: /^3[47][0-9]{5,}$/,
        DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    }
    for (const card in regexPattern){
        if(cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])){
            if(cardNumber) {
                return cardNumber && /^[1-6]{1}[0-9]{14,15}$/i.test(cardNumber.replace(/[^\d/]/g, '').trim())
                    ? ''
                    : 'enter a valid card'
            }
        };
    }
    return 'Enter a valid card';
}

export const cardExpValidation = (value) => {
    if (value) {
        if (/^(0[1-9]|1[0-2])\/[0-9]{2}$/i.test(value.trim())){
            let today = new Date();
            const date = `${today.getFullYear()}-${today.getMonth() + 1}-${new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()}`
            let currentDate = moment(new Date(date));
            let visaValue = value.split('/');
            let visaDate = new Date(`20${visaValue[1]}`, visaValue[0], 0);
            return currentDate < moment(visaDate) 
                ? undefined
                : "Please enter a valid date"
        } else {
            return "Invalid Date Format";
        }
    }
}

export const textValidation = (value) => {
    if (value) {
        if (/^[a-zA-Z ]*$/i.test(value)){
            return undefined;
        } else {
            return "Alphabetical letters only";
        }
    } else {
        return undefined;
    }
}

export const cvvValidation = (min, value ) => 
    (value && value.length < min) ? "Must be 3 characters or more" : undefined;