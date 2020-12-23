const request = require('request')


const forecast = (latitude, longitude, callback) => {
    url = 'https://api.weatherapi.com/v1/current.json?key=2955694459084e82be264116201512&q=' + latitude + ',' + longitude
    
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect.', undefined)
        }else if(body.error){
            callback('Something went wrong.', undefined)
        }else{
            callback(undefined, {
                temp_c: body.current.temp_c,
                cloud: body.current.cloud,
                conditionText: body.current.condition.text,
                conditionIcon: 'https:' + body.current.condition.icon
            })
        }
    })
}


module.exports = forecast