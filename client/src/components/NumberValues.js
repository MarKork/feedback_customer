import '../App.css';

const NumberValues = ({questions, onChange}) =>{

    const onClick = (event) => {
        
        let target=event.target
        let parent=target.parentElement
        let i = 0
        let len = parent.childNodes.length
        let button;

        for (; i < len; i += 1) {
            button = parent.childNodes[i];
            if (button.nodeName === 'BUTTON') {
                button.className = '';
            }
        }
        
        event.target.className = 'active';
        onChange(event)
    }

    let output = Object.keys(questions.numberValueQuestions).map(key =>{
        
        let name="numberValueAnswers."+key
        if(questions.numberValueQuestions[key].length>0){
        return(
            <div key={key} className="numberValues">
                <label htmlFor={key}>{questions.numberValueQuestions[key]}</label><br/>
                <button className="numberValue" id="1" name={name} onClick={onClick}>1</button>
                <button className="numberValue" id="2" name={name} onClick={onClick}>2</button>
                <button className="numberValue" id="3" name={name} onClick={onClick}>3</button>
                <button className="numberValue" id="4" name={name} onClick={onClick}>4</button>
                <button className="numberValue" id="5" name={name} onClick={onClick}>5</button>
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
                <h3>Arvioi nämä väittämät:</h3>
                <label>(1 - en ole ollenkaan samaa mieltä)</label><br/>
                <label>(5 - olen täysin samaa mieltä)</label><br/><br/> 
                {output}
            </>
            :''
        }
                     
        </div>
    )
}

export default NumberValues;