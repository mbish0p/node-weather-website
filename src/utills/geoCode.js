const request = require('request')

const geoCode = (address,callback) =>{
    const urlMap = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmlzaDBwNyIsImEiOiJjazJieXFvd2EwMHJ5M2J0YmU5bm0weHAzIn0.XSdrZMlb4aUyP2eEvBKFFg&limit=1'

    request({url : urlMap, json : true},(error,response) =>{

        if(error){
            callback('Connection with location is not possible',undefined)
        }
        else if(response.body.message){
            callback(response.body.message,undefined)
        }
        else if(response.body.features.length === 0){
            callback('Don t find location like this',undefined)
        }
        else{
            callback(undefined,{
                latitude : response.body.features[0].center[0],
                longitude : response.body.features[0].center[1],
                fullName : response.body.features[0].place_name
            })
        }


    })
}

module.exports = geoCode