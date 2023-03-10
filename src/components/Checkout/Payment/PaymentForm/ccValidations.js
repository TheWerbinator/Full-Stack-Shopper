import moment from 'moment';

export const cardNumberValidation = (cardNumber) => {
  const regexPattern = {
    VISA : /^4[0-9]{2,}$/,
    MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
    DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    AMEX: /^3[47][0-9]{5,}$/,
  };
  
  for(const card in regexPattern) {
    if (cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) {
      if (cardNumber) {
        return cardNumber && /^[1-6]{1}[0-9]{14,15}$/i.test(cardNumber.replace(/[^\d]/g, '').trim())
        ? undefined
        : 'Enter a valid card';
      }
    }
  }
  return 'Enter a valid card';
};

export const cardExpireValidation = (month, year) => {
  const value = `${month}/${year}`;
  if (/^([1-9]|1[0-2])\/[0-9]{2}$/i.test(value.trim())) {
    let today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${new Date(today.getFullYear(),
      today.getMonth() + 1, 0).getDate()}`
    let currentDate = moment(new Date(date));
    let visaValue = value.split('/');
    let visaDate = new Date(`20${visaValue[1]}`, visaValue[0], 0);
    return currentDate < moment(visaDate)
      ? undefined
      : 'Please enter a valid date';
  } else return 'Please enter a valid date format';
};

export const onlyTextValidation = (value) => {
  if (value) {
    if (/^[a-zA-Z ]*$/i.test(value)) {
      return undefined;
    } else {
      return 'Alphabetical letters only';
    }
  } else {
    return undefined;
  }
};

export const securityCodeValidation = (min, max, value) => {
  if (value) {
    if (/^[0-9]*$/i.test(value)) {
      return (value && (value.length < min || value.length > max)) ? 'Must be 3 or 4 characters' : undefined
    } else {
      return 'Numbers only';
    }
  } else {
    return undefined;
  }
}