console.log('Client side javascript file loaded')


// fetch('http://localhost:3000/weather' + '?' + new URLSearchParams({
//     address: '!'
// })).then(response => {
//         response.json().then(data => {

//             if (data.error) {
//                 console.log(data.error)
//             } else {
//                 console.log(data.location)
//                 console.log(data.forecast)
//             }
//         })
//     })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// console.log(messageOne, messageTwo)

messageOne.textContent = 'Go ahead and type in a location'


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    console.log(location)
    search.value = ''

    messageOne.textContent = 'Loading forecast ...'
    messageTwo.textContent = ''



    fetch('http://localhost:3000/weather' + '?' + new URLSearchParams({
        address: location
    })).then(response => {
        response.json().then(data => {

            if (data.error) {
                // console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ''

            } else {
                // console.log(data.location)
                // console.log(data.forecast)

                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast

            }
        })
    })

})