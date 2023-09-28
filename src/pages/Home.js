import React, { useRef, useState } from 'react'
import "../styles/Home.css"
import { Link } from 'react-router-dom'


const Home = () => {

    const popRef=useRef()
    const continueRef=useRef()
    const [disabled, setDisabled] = useState(true);
    function popup(){
        popRef.current.style.transition=".3s"
        popRef.current.style.opacity=1
        popRef.current.style.pointerEvents="auto"
    }
    function agreement(e){
      if(e.target.checked){
        continueRef.current.style.cursor="pointer";
        
        setDisabled(false)
      }
      else{
        continueRef.current.style.cursor="notAllowed";
        setDisabled(true)
    }  
    }

  return (
    <div>
       <main className='main'>

<section className='home'>
    <div className="homeContent">
        <h1>Quiz Website</h1>
        <p>My name is Vivekanand Ojha, and I'll be your quiz host/instructor for today. If you have any questions or encounter any issues during the quiz, feel free to reach out to me or our support team</p>
        <button className='startBtn' onClick={popup}>Start Quiz</button>
    </div>
</section>
</main>

<div className='popupInfo' ref={popRef}>

    <h2>Before you begin</h2>

        <ul type="disk">
        <li>
            Ensure you have access to a stable internet connection and a
            compatible device (computer, tablet, or smartphone) before starting
            the test.
          </li>
          <li>
            Choose a quiet and well-lit location with minimal distractions to
            take the test.
          </li>
          <li>Once selected the option can't be changed.</li>
          <li>Correct option is 5 marks, and the wrong option is -1.</li>
          <li>
            You can't go to the next question without completing the present
            question.
          </li>
          <li>
            You can visit the previous questions to view them, but you can't
            edit the options.
          </li>
         <li>
         <section className="agreement">
            <input type="checkbox" name="agreement" id="agreement" onClick={agreement} />
                
            <label htmlFor="agreement">I agree that i will abide the above rules and will face consequence if found guilty. </label>
        </section>
         </li>
        </ul>
    <div className="btnGroup">
        <button className='infoBtn exit-btn'
        onClick={()=>{
          popRef.current.style.opacity=0
        popRef.current.style.pointerEvents="none"
        }}
        >Exit Quiz</button>
        <Link to={"/questions"} className='infoBtn ' >
          <button disabled={disabled} 
          className='continueBtn' 
          style={{opacity:disabled?".2":"1"}}
          ref={continueRef}
          >
          Continue
          </button>          
          </Link>
    </div>
</div>

    </div>
  )
}

export default Home
