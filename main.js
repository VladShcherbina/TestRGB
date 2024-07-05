const TOKEN = '6698992328:AAGS1w51OAeyLYiHvR8IQw0U7QLeUzTBJEA';
const CHAT_ID = '-1002226398151';
const URL_API = `https://api.telegram.org/bot${ TOKEN }/sendMessage`

const inputName = document.querySelector('.input_name')
const inputEmail = document.querySelector('.input_email')
const button = document.getElementById('tg')
let input = document.querySelector("#phone");


document.addEventListener("DOMContentLoaded", function () {
    window.intlTelInput(input, {
      initialCountry: "auto",
      geoIpLookup: function (callback) {
        fetch('https://ipinfo.io?token=<9bdbce7fc31e6f>', { headers: { 'Accept': 'application/json' } })
          .then((resp) => resp.json())
          .then((resp) => {
            let countryCode = (resp && resp.country) ? resp.country : "us";
            callback(countryCode);
          });
          
      },
      hiddenInput: function(telInputName) {
        return {
          phone: "phone_full",
          country: "country_code"
        };
      },
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });
  });
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,8}$/

button.addEventListener('submit', function(e) {
    window.intlTelInput(input, {
      hiddenInput: function(e) {
        return {
          phone: "phone_full",
          country: "country_code"
        };
      }
    })
    e.preventDefault()
  
    
    const name = `<b>Имя: </b> ${ inputName.value}`;
    const phone = `<b>Номер телефону: </b> ${input.value}`
    let email = inputEmail.value
    
    if(emailPattern.test(inputEmail.value) === true) {
        email = `<b>Почта: </b> ${inputEmail.value}`
    } else {
        inputEmail.value = ''
        alert('Невалідний Email')
    }

    if(inputName.value === '' || input.value === '' || inputEmail.value === '') {
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

