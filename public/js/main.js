
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const content1 = document.querySelector('#message-1')
const content2 = document.querySelector('#message-2')
const content3 = document.getElementById('conditionIcon')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    content1.textContent = 'Loading...'
    content2.textContent = ''
    content3.src = ''
    
    fetch('/weather?search=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            content1.textContent = data.error
            content3.src = ''
        }else{
            content1.textContent = data.location
            content2.textContent = data.forecastMsg
            content3.src = data.conditionIcon
        }
    })
})
})