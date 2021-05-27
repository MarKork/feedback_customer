require('dotenv').config()
const express = require('express')
const mongoose = require("mongoose");
const cors = require('cors');
const inquiryModel = require("./models/inquiry");
const answerModel = require("./models/answer");
const app = express();

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3001

try {
  mongoose.connect(process.env.MONGO_DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  })
  console.log('MongoDB connected successfully')
} catch(error) {
  console.log(error)
}

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/inquiries', (req, res) => {

    const identifier = req.header('inquiryIdentifier')
    console.log(identifier)
    inquiryModel.find({inquiryIdentifier:identifier, dataType:"questions"}, function(err, items){
        if(err) {
			    console.log("Failed to find items. Reason:",err);
			    return res.status(500).json({message:"Internal server error"})
		    }
		    return res.status(200).json(items);
    })
})
  

app.post('/api/answers', (req, res) => {
  if(!req.body) {
		return res.status(400).json({message:"Bad Request 1"});
	}
  const body = req.body
 
  const answer = new answerModel({
    answerIdentifier: body.answerIdentifier,
    customerName: body.customerName,
    projectName: body.projectName,
    dataType: body.dataType,
    date: Date.now(),
    checkBoxAnswers:{
      firstCheckBox: body.checkBoxAnswers.firstCheckBox,
      secondCheckBox: body.checkBoxAnswers.secondCheckBox,
      thirdCheckBox: body.checkBoxAnswers.thirdCheckBox,
      fourthCheckBox: body.checkBoxAnswers.fourthCheckBox,
      fifthCheckBox: body.checkBoxAnswers.fifthCheckBox
      },
    numberValueAnswers:{
      firstNumberValue: body.numberValueAnswers.firstNumberValue,
      secondNumberValue: body.numberValueAnswers.secondNumberValue,
      thirdNumberValue: body.numberValueAnswers.thirdNumberValue,
      fourthNumberValue: body.numberValueAnswers.fourthNumberValue,
      fifthNumberValue: body.numberValueAnswers.fifthNumberValue
      },
    answerWithTextAnswer: body.answerWithTextAnswer
  })
  
  answer.save().then(savedAnswer => {
    res.json(savedAnswer)
  })
  
})

// Checking if in production or dev environment
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})