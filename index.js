const express = require('express')

const app = express()
const port = process.env.PORT || 2324 

app.get('/' , (req , res) =>{
  res.send('<h2> Heyya </h2>')
})

app.get('/api/:domname', function (req, res) {
  res.send('Request for :: ' + req.params.domname)
})

app.listen(port , ()=>{
  console.log('I was hit!!')
})


