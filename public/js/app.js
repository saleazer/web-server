console.log('Client side JS in action')

// Creates variables to the HTML elements so they can be accessed in the function
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

// Sets the initial content to display on-screen
messageOne.textContent = 
messageTwo.textContent = 

// Function that submits the input and returns the weather from the api
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // Prevents the page from refreshing after submit
    const location = search.value // Assinging the value of the user input

    messageOne.textContent = "Loading..."   //changing the message to loading
    messageTwo.textContent = ""

    // Fetch call to the weather api concatenating the location in the query string
    fetch('/weather/weather?address=' + location).then((response) => {
        response.json().then((data) => {  // Turns the response into JSON
            if (data.error) {  // Checks for error and displays it
                messageOne.textContent = data.error
            } else {  // Returns the requested data in the associated HTML elements below
                messageOne.textContent = data.location.name
                messageTwo.textContent = data.current.temperature
            }
        }) 
    })
})
