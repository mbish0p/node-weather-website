const request = require('request')

const forecast = (latitude,longitude,callback) =>{

    const urlForcast = 'https://api.darksky.net/forecast/19c25efebd672d6e1d9179b572305fa2/' + longitude + ',' + latitude +'?units=si'

    request({ url:urlForcast , json:true },(error,response) => {
        if(error){
            callback('Connection with weather is not possible',undefined)
        }
        else if(response.body.error){
            callback(response.body.error,undefined)
        }
        else{
            const temperature = response.body.currently.apparentTemperature
            const rainChance = response.body.currently.precipProbability
            const summary = response.body.daily.data[0].summary
            const temperatureHigh = response.body.daily.data[0].temperatureHigh
            const temperatureLow = response.body.daily.data[0].temperatureLow

           

            callback(undefined,
                { temperature,
                  rainChance,
                  summary,
                  temperatureHigh,
                  temperatureLow }                                        
            )
        }
    })

}

module.exports = forecast