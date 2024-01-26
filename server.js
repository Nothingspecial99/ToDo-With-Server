const express = require("express")
const cors = require("cors")
const fs = require("fs")
let filePath = "./folderSoLiveServerNotInterfere/tasklist.txt"

// fs.writeFile(filePath, "hello there what are you2222?", 'utf-8', () => { })




const app = express()

app.use(cors())

app.get('/', function (req, res) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (data !== "") {
            res.json(JSON.parse(data))
        } else {
            res.json([])
        }

    })
})

app.post("/add", function (req, res) {
    if (req.headers.tasks !== "") {
        let taskList = JSON.stringify(req.headers.tasks.split(","))

        fs.writeFile(filePath, taskList, 'utf-8', function () { })
    }
    else {
        fs.writeFile(filePath, "[]", 'utf-8', function () { })
    }


})


app.listen(3000)
