import express from 'express'

const app = express()

app.get("/", (req,res)=>{
    res.send("Hello from insde")
})

app.listen(3000, ()=>{
    console.log("Post is running ")
})