import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CheckBoxes from './CheckBoxes'
import NumberValues from './NumberValues'
import TextAreaAnswer from './TextAreaAnswer'
import '../App.css';

const Answer = ({questions}) =>{
    
    const [isReady, setIsReady] = useState(false)
    const [answers, setAnswers] = useState({
        answerIdentifier: questions.inquiryIdentifier,
        customerName: questions.customerName,
        projectName: questions.projectName,
        dataType: "answers",
        checkBoxAnswers:{
            firstCheckBox: false,
            secondCheckBox: false,
            thirdCheckBox: false,
            fourthCheckBox: false,
            fifthCheckBox: false	
            },
        numberValueAnswers:{
            firstNumberValue: "",
            secondNumberValue: "",
            thirdNumberValue: "",
            fourthNumberValue: "",
            fifthNumberValue: ""
            },
        answerWithTextAnswer: ""
    })
    
    useEffect(() => {
        setInfo();
        }, [questions, isReady]); 

    const onChange = (event) => {
        event.preventDefault()
        
        const [section, key] = event.target.name.split(".");
        
        if (key) {
            if(section==="checkBoxAnswers"){
                if(event.target.checked===true){
                    setAnswers({
                        ...answers,
                        [section]: {
                            ...answers[section],
                            [key]: true
                        }
                        })
                }else{
                    //event.target.checked===false
                    setAnswers({
                        ...answers,
                        [section]: {
                            ...answers[section],
                            [key]: false
                        }
                        })
                }
            }else{
                //numberValueAnswers
                let value=event.target.id
                setAnswers({
                ...answers,
                [section]: {
                    ...answers[section],
                    [key]: value
                }
                })
            };
          } else {
              //answerWithTextAnswer
            setAnswers({
              ...answers,
              [section]: event.target.value
            });
          }
          let button=document.getElementById("submitAnswer")
          button.disabled=false
    }

    const addAnswers = async (event) => {
        event.preventDefault()
        await axios.post('/api/answers', answers)
        setIsReady(true)
    }

    const setInfo = () =>{
        let identifier= questions.inquiryIdentifier
        let customer= questions.customerName
        let project= questions.projectName
        setAnswers({
            ...answers,
            answerIdentifier: identifier,
            customerName: customer,
            projectName: project
        })
        
    }

    return(
        
        <div>
            {!isReady && questions?
                <div>
                    <h2>Tervetuloa vastaamaan palautekyselyyn</h2>
                    <form onSubmit={addAnswers}>
                        <p>{questions.customerName}</p>
                        <p>{questions.projectName}</p>
                        <CheckBoxes questions={questions} answers={answers} onChange={onChange}/>
                        <NumberValues questions={questions} onChange={onChange}/>
                        <TextAreaAnswer question={questions.answerWithTextQuestion} onChange={onChange}/>
                        
                        <br/>
                        <button id="submitAnswer" type = "submit" disabled >Lähetä vastaukset</button>
                        
                    </form>
                </div>
                :isReady?
                    <h3>Kiitos vastauksesta!</h3>
            :''
            }
        </div>
    )
    
}

export default Answer;