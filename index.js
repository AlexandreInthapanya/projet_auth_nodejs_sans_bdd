const express = require("express")
const app = express();



app.get('/login', (req, res) => {
    res.render('login', {title : 'page de Connexion'}) //render pour utilisation template login.ejs
})

app.post('/login', (req, res) => { //resultat quand utilisateur click sur le boutton submit
    
})