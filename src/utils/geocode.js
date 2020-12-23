const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1Ijoid294YXY4Mzc1NiIsImEiOiJja2l1YjBoZ3gxYmY0MnhwNHozZ25zOHozIn0._HOwTFy8J6IFurvtGt96FQ&limit=1'
    
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect.', undefined)
        }else if(body.features.length === 0){
            callback('No place found', undefined)
        }else{
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    
        
    })

}


module.exports = geocode