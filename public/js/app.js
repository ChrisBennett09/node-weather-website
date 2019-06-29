console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')  //messge-1 paragraph in index.hbs
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()  //prevents browser from refreshing when you click Search button

    const location = search.value

    messageOne.textContent = 'Loading...'

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent= data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})



