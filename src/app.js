const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utills/geoCode')
const forecast = require('./utills/forecast')

const app = express()
const port = process.env.PORT || 3000

const viewPath = path.join(__dirname, '../tamplate/views')
const partialsPath = path.join(__dirname, '../tamplate/partials')
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.get('', (req,response) => {

    response.render('index',{
        title: 'Weather App',
        name: 'Mateusz Biskup'
    })

})

app.get('/weather',(req,response) =>{

    if(!req.query.address){
        response.send('You need to provide a address term')
    }

    const address = req.query.address
    geoCode(address,(error,{latitude,longitude,fullName} = {}) => {

        if(error){
            return response.send({error})
        }
        console.log( fullName + " " +latitude +","+ longitude)

        forecast(latitude,longitude,(error,{temperature,rainChance,summary}) =>{
            
            if(error){
                return response.send({error})
            }
            response.send({
                fullName,
                temperature,
                summary,
                rainChance
            })
        })
    }) 


})

app.get('/about',(req,response)=>{

    response.render('about',{
        title: 'About page',
        name: 'Mateusz Biskup'

    })
})

app.get('/help',(req,response)=>{

    response.render('help',{
        title: 'Help page',
        name: 'Mateusz Biskup'
    })

})
app.get('/help/*',(req,response) =>{

    response.render('404',{
        title: '404',
        name: 'Mateusz Biskup',
        errorMassage: 'Help article not found'
    })

})

app.get('*',(req,response) =>{

    response.render('404',{
        title: '404',
        name: 'Mateusz Biskup',
        errorMassage: 'Page not found'
    })
})

app.listen(port,()=>{

    console.log('Server is up on port ' + port)
})
