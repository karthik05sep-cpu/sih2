const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

let loanAmount = 3000000
let totalSpent = 0
let purpose = ""
let customerScore = 100

// Activate Loan
app.post("/loan",(req,res)=>{

purpose = req.body.purpose
totalSpent = 0
customerScore = 100

res.json({
message:"Loan Activated by Bank",
loanAmount,
customerScore
})

})


// Add Spending
app.post("/spend",(req,res)=>{

const amount = req.body.amount
const category = req.body.category
const proof = req.body.proof

totalSpent += amount

let utilization = (totalSpent/loanAmount)*100

let usageStatus = "Correct Usage"
let verificationStatus = "Verified"
let warning = ""

// Proof verification
if(!proof){
verificationStatus = "Proof Not Uploaded"
usageStatus = "Suspicious Usage"
warning = "⚠ Upload receipt or invoice"

customerScore -= 5
}

// Category verification
if(purpose === "Education" && category !== "Books"){
verificationStatus = "Suspicious Utilization"
usageStatus = "Wrong Usage"
warning = "⚠ Spending not related to Education"

customerScore -= 10
}

if(purpose === "Health" && category !== "Hospital"){
verificationStatus = "Suspicious Utilization"
usageStatus = "Wrong Usage"
warning = "⚠ Spending not related to Health"

customerScore -= 10
}

if(customerScore < 0){
customerScore = 0
}

res.json({
loanAmount,
totalSpent,
utilization,
usageStatus,
verificationStatus,
warning,
customerScore
})

})

app.listen(3000,()=>{
console.log("Server running on port 3000")
})
