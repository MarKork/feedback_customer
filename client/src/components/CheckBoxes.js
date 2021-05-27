const CheckBoxes = ({questions, answers, onChange}) =>{
    
    let output = Object.keys(questions.checkBoxQuestions).map(key =>{
        
        let name="checkBoxAnswers."+key
        if(questions.checkBoxQuestions[key].length>0){
            return(
                <div key={key}>
                    <input type="checkbox" 
                        id={key} 
                        name={name} 
                        value={answers.checkBoxAnswers.key}
                        checked={answers.checkBoxAnswers.key}
                        onChange={onChange}/>
                    <label htmlFor={key}>{questions.checkBoxQuestions[key]}</label><br></br>
                </div>
            )
        }else{
            return''
        }
        
    })
    
    return (
        <div>
            {output[0]||output[1]||output[2]||output[3]||output[4]?
            <>
                <h3>Valitse näistä mielestäsi projektia kuvaavat väittämät:</h3>
                {output}
            </>
            :''}
        </div>
    )
}

export default CheckBoxes;