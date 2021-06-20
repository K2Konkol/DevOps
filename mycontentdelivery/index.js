const express = require("express")
const controller = require('./controller')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send("Hello World from express server")
})

app.get("/martialArts", controller.getMartialArts)
app.get("/martialArts/:id", controller.getMartialArtById)
app.post("/martialArts", controller.createMartialArt)
app.put("/martialArts/:id", controller.updateMartialArtById)
app.delete("/martialArts/:id", controller.deleteMartialArtById)


const PORT = 5000
app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`)
})
