console.log('Client side javascript file is loaded')

// fetch('http://puzzle.mean.io/puzzle').then((response) => {
//     //.then is a promise, so once the json is received and parsed it will execute the function  
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

fetch('http://localhost:3000/weather?address=98229 ').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data)
        }
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')
const messageThree = document.querySelector("#message-three")


weatherForm.addEventListener('submit', (e) => {
    //Submit does not refresh the page with preventDefault 
    e.preventDefault()

    const location = search.value

    console.log('-' + location + '-')

    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''
    messageThree.textContent = ''


    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent(data.error)
                console.log(data.error)
            } else {
                console.log(data)
                messageOne.textContent = data.address
                messageTwo.textContent = data.Temperature
                messageThree.textContent = data.description
            }
        })
    })
})

