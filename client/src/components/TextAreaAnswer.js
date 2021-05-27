const TextAreaAnswer = ({question, onChange}) =>{
   
    return(
        <div>
            {question.length>0?
                <>
                    <h3>{question}</h3>
                    <textarea type="text"
                        name="answerWithTextAnswer"
                        onChange={onChange}
                    />
                </>
                :''
            }
        </div>
    )
    
}

export default TextAreaAnswer;