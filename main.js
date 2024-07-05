const TOKEN = '6698992328:AAGS1w51OAeyLYiHvR8IQw0U7QLeUzTBJEA';
const CHAT_ID = '-1002226398151';
const URL_API = `https://api.telegram.org/bot${ TOKEN }/sendMessage`

const inputName = document.querySelector('.input_name')
const inputEmail = document.querySelector('.input_email')
const button = document.getElementById('tg')

let country_code = document.getElementsByName('country_code');
let input = document.querySelector("#phone");


console.log('input: ', input)
console.log('country_code: ', country_code)
document.addEventListener("DOMContentLoaded", function () {
  window.intlTelInput(input, {
    initialCountry: "auto",
    geoIpLookup: function (callback) {
      fetch('https://ipinfo.io?token=<9bdbce7fc31e6f>', { headers: { 'Accept': 'application/json' } })
        .then((resp) => resp.json())
        .then((resp) => {
          let countryCode = (resp && resp.country) ? resp.country : "us";
          console.log('geoIpLookup countryCode: ', countryCode)
          callback(countryCode);
        });

    },
    hiddenInput: "country_code",
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
  });

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,8}$/

  button.addEventListener('submit', function(e) {
    e.preventDefault();

    const phoneNumber = country_code[0].value
    console.log('phoneNumber: ', phoneNumber)

    const name = `<b>Имя: </b> ${ inputName.value}`;
    const phone = `<b>Номер телефону: </b> ${phoneNumber}`
    let email = inputEmail.value
    if(emailPattern.test(inputEmail.value) === true) {
        email = `<b>Почта: </b> ${inputEmail.value}`
    } else {
        inputEmail.value = ''
        alert('Невалідний Email')
    }

    if(inputName.value === '' || phoneNumber === '' || inputEmail.value === '') {
        alert('Заповність всі поля для відправки запросу')
    } else {
        axios.post(URL_API, {
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: `${name} ${phone} ${email}`
        })
        inputEmail.value = ''
        input.value = ''
        inputName.value = ''
    }
  })
});



