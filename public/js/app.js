console.log('Client side JS in action')

// Creates variables to the HTML elements so they can be accessed in the function
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')
const messageThree = document.querySelector('#message-three')
const messageFour = document.querySelector('#message-four')
const messageFive = document.querySelector('#message-five')

// Sets the initial content to display on-screen

// Function that submits the input and returns the weather from the api
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // Prevents the page from refreshing after submit
    const location = search.value // Assinging the value of the user input

    messageOne.textContent = "Loading..."   //changing the message to loading

    // Fetch call to the weather api concatenating the location in the query string
    fetch('/weather?address=' + location).then((response) => { 
        response.json().then(({forecast: {forecastData:{body}}}) => {    // Turns the response into JSON
            if (body.error) {  // Checks for error and displays it
                messageOne.textContent = body.error
            } else {  // Returns the requested data in the associated HTML elements below
                messageOne.textContent = body.location.name + ", " + body.location.region
                messageTwo.textContent = "Current temp: " + body.current.temperature + " degrees F"
                messageThree.textContent = "Feels like: " + body.current.feelslike + " degrees F"
                messageFour.textContent = "Wind speed: " + body.current.wind_dir + " " + body.current.wind_speed + " mph"
                messageFive.textContent = "Humidity: " + body.current.humidity + "%"
            }
        }) 
    })
})