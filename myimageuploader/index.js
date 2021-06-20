const cors = require("cors")
const express = require("express")
const controller = require("./controller")
const app = express()

global.__basedir = __dirname;

app.use(cors())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.send("Hello World from express server")
})
app.post("/images", controller.upload)
app.get("/images", controller.getListFiles)
app.get("/images/:name", controller.download)

const PORT = 5050
app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`)
})
