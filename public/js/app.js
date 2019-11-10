const weatherForm = document.querySelector('form')
const dataInput = document.querySelector('input')
let massageOne = document.querySelector('#massageOne')
let massageTwo = document.querySelector('#massageTwo')
let massageThree = document.querySelector('#massageThree')
let massageFour = document.querySelector('#massageFour')


weatherForm.addEventListener('submit',(e)=>{
    
    e.preventDefault()
   
    massageOne.textContent = 'Loading ...'
    massageTwo.textContent = ''
    massageThree.textContent = ''
    massageFour.textContent = ''
    
    const location = dataInput.value

    fetch('/weather?address=' + encodeURIComponent(location)).then((response)=>{
        response.json().then((data)=>{
           if(data.error){
            console.log(data.error)
           massageOne.textContent = data.error
           }
           else{
            console.log(data.temperature)
            
            massageOne.textContent = data.fullName
            let forecast = "Today we will have : " + data.summary + "With rain chance " + data.rainChance + "%" + "Temerature " + data.temperature + "C"
            massageTwo.textContent = forecast
            let temperatureHigh = "Today the highest temperature is " + data.temperatureHigh
            let temperatureLow = "Today the lowest temperature is " + data.temperatureLow
            console.log(temperatureLow)
            console.log(temperatureHigh)

            massageThree.textContent = temperatureHigh
            massageFour.textContent = temperatureLow
           }
        })
    })
    

})
