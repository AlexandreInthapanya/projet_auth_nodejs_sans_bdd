const jwt = require('jsonwebtoken')
require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const user = {
    id: 52,
    name: "jeremy",
    email: "proutcaca@gmail.com",
    admin: true,
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '48h'})
}

function refreshAccessToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1y'})
}


// console.log('accessToken', accessToken)
// console.log('refreshToken', refreshToken)

app.post('/api/login', (req, res) => {
    if (req.body.email !== user.email) {
        res.status(401).send('invalid email')
        return
    }
    if (req.body.password !== 'boulet') {
        res.status(401).send('invalid password')
        return
    }
    const accessToken = generateAccessToken(user)
    const refreshToken = refreshAccessToken(user)
    res.send({
        accessToken,
        refreshToken,
    })
})

(async () => {
    const bcrypt = require('bcryptjs')

    try {
        let thePassword = process.env.PASSWORD
        /*let salt = await bcrypt.genSalt(10)*/ //permet de generer un Salt et le nombre de rounds
        let hash = await bcrypt.hash(thePassword, await bcrypt.genSalt(10) ) //creation hashage en ajoutant la chaîne de caractere et le salt dans les parametres
        console.log(hash)

        let compare = await bcrypt.compare(text, hash)
        console.log(compare)
       
    } catch (error) {
        console.log(error.message) //recupere les erreurs
    }
    
})()



app.listen(3000, () => {console.log(`Server running on port 3000`)})