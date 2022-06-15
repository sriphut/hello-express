const express = require('express')
const app = express()


// Serve static content in public folder
app.use(express.static('public'))

// ใส่มาตอน -- [Get data from form submitted]
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Get data
// app.get('/user', function(req, res) {

// const id = req.query.id
// console.log(id)
// res.send(`Get data for id: ${id}`)

// })

//Application middleware - มี request เข้ามา แล้วต้องการมีโปรแกรมการทำงานคั่นกลาง ..........
function logger(req, res, next) {
    console.log(new Date().toISOString(), req.method, req.url)
    next()
}
app.use(logger)

// Get data new version
app.get('/user/:id/:fac', function (req, res) {

    const id = req.params.id
    const faculty = req.params.fac
    console.log({ id, faculty })
    res.send(`<h1>Get data for id: ${id} | Faculty is ${faculty}</h1>`)

})

// Get data from form submitted
app.post('/register', function (req, res) {

    const email = req.body.email
    const username = req.body.username
    console.log({ email, username })
    res.send(`<h4> Register by ${username} | Email:  ${email}</4>`)

})

// Set the view engine to ejs
app.set('view engine', 'ejs')

app.get('/home', (req, res) => {

    res.render('pages/home')

})

app.get('/data', (req, res) => {
    const student = {
        id: 6230611045,
        name: 'Phutphisit',
        year: 4,
        major: 'Computing'
    }
    // const info = {
    //     name: 'Phutphisit',
    //     year: 4,
    //     major: 'Computing'
    // }
    res.render('pages/data', { student })

})

//QR Code generation
var QRCode = require('qrcode') //nmp install qrcode before using this

app.get('/qr-code', (req, res) => {
    
    const qrcodeInfo = {
        url: '',
        code: '',
        showQRCode: false
    }
    res.render('pages/qr-code',{qrcodeInfo})

    app.post('/getQRCode', (req, res) =>{
        qrcodeInfo.url = req.body.url  
        //console.log({linkInfo})
        // res.send(`Your URL is  ${linkInfo.url}`)
        
        //console.log({qrcodeInfo})
        //res.render('pages/qr-code',{qrcodeInfo})

        QRCode.toDataURL(qrcodeInfo.url, function (err, url) { //QRcode gen from dataURL
            qrcodeInfo.code = url
            qrcodeInfo.showQRCode = true
            // console.log({qrcodeInfo})
            // console.log(url)
            res.render('pages/qr-code',{qrcodeInfo})
        })
        
        app.get('/getQRCode', (req, res)=>{ //Redirect to qr-code page
            res.redirect('/qr-code')
        })
    })
})

// Access home --> /
app.get('/', function (request, response) {

    response.send('Hello, world -- Express')

})

app.get('/login', function (request, response) {

    response.send('<h1>Login Form</1>')

})

app.get('/coc', function (request, response) {

    response.redirect('http://www.computing.psu.ac.th')

})

app.get('/data', function (request, response) {
    const data = {
        framework: 'express',
        version: 4
    }

    response.json(data)
})


app.listen(3000)