import React, { useState } from 'react'
import axios from 'axios'

const Login = ({setIsLoggedIn, setQuestions}) =>{
    const [inquiryIdentifier, setInquiryIdentifier] = useState('')

    const handleinquiryIdentifier = (event) => {
      setInquiryIdentifier(event.target.value)
    }
    
    const handleSubmit = async event => {
      event.preventDefault()
      const response = await axios
        .get('/api/inquiries', {headers: {
          'inquiryIdentifier': inquiryIdentifier,
          'dataType': 'questions'
        }})
        .then(
            setIsLoggedIn(true)
        ).catch(err => {
            alert("Tällä tunnuksella ei löytynyt kyselyä.")
        })

        if(response.data.length>0){
            setQuestions(response.data[0])
        }else{
            alert("Tällä tunnuksella ei löytynyt kyselyä.")
            setIsLoggedIn(false)
        }
    }
    
    return(
        <div>
            <h2>Kirjaudu palautekyselyyn</h2>
            <form onSubmit={handleSubmit}>
                <label>Anna palautekyselyn tunnus:</label>
                <br/>
                <input type="text"
                    name="inquiryIdentifier"
                    value={inquiryIdentifier}
                    onChange={handleinquiryIdentifier}
                />
                <br/>
                <button type = "submit">Kirjaudu palautekyselyyn</button>
            </form>
        </div>
    )
}

export default Login;