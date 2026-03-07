const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

let loanAmount = 0
let totalSpent = 0
let purpose = ""

// Create Loan
app.post("/loan", (req, res) => {

    loanAmount = req.body.loanAmount
    purpose = req.body.purpose
    totalSpent = 0

    res.json({message:"Loan created"})
})

// Add spending
app.post("/spend", (req,res)=>{

    const amount = req.body.amount
    const category = req.body.category

    totalSpent += amount

    let utilization = (totalSpent / loanAmount) * 100

    let warning = ""

    if(purpose === "Education" && category === "Shopping"){
        warning = "Possible misuse detected"
    }

    res.json({
        totalSpent,
        utilization,
        warning
    })

})

app.listen(3000, ()=>{
    console.log("Server running on port 3000")
})