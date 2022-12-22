const express = require("express")
const app = express()

app.get("/", (req,res) => {
    res.json({message : "yo"
    })
} )

app.listen("3000", () => {
    console.log("serveur ok!")
} )