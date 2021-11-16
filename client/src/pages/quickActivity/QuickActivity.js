import React, { useState } from 'react'
import QuickActivityLogic from './QuickActivityLogic';
import {Stopwatch, Timer} from '../../Components/Stopwatch';
import { VictoryPie } from 'victory';
import ExcelExport from '../../Components/ExcelExport';







//Parent component
const QuickActivity = () => {
    //pass the props from logic and destructure them in parent (page) component
    //pass props to children components
    const { incrementSwitches, decrementSwitches, switchAmount, incrementAttempt, decrementAttempt, attemptAmount, addAttempts, attemptsArray, computeSW1Answer, computeSW2Answer, computeSW3Answer, computeSW4Answer, endActivity, CalculateActivityScore, resultsArray, showTimer, computePrompting, computeEngagement, ComputePrompt, ComputeEngage, handleCommentChange, exportData, PromptEngage, resultsRef, handleScroll } = QuickActivityLogic()
    const { render, handleEndActivity, time} = Stopwatch();
    
    return (
        <div>
            
            <InputActivity {...{incrementSwitches, decrementSwitches, switchAmount, incrementAttempt, decrementAttempt, attemptAmount, addAttempts }} />
            <GenerateActivity attempts={attemptsArray} computeSW1Answer={computeSW1Answer} computeSW2Answer={computeSW2Answer} computeSW3Answer={computeSW3Answer} computeSW4Answer={computeSW4Answer} showTimer={showTimer} computePrompting={computePrompting} computeEngagement={computeEngagement} render={render} />
            {endActivity ? <EndActivity CalculateActivityScore={CalculateActivityScore} resultsArray={resultsArray} ComputePrompt={ComputePrompt} ComputeEngage={ComputeEngage} handleEndActivity={handleEndActivity} time={time} handleCommentChange={handleCommentChange} exportData={exportData} PromptEngage={PromptEngage} resultsRef={resultsRef} handleScroll={handleScroll} /> : null}
        </div>
      
    )
    
}

export default QuickActivity;


//accept the props in child component
const InputActivity = ({incrementSwitches, switchAmount, decrementSwitches, incrementAttempt, decrementAttempt, attemptAmount, addAttempts }) => {

  

    return (
        <section className='user-form'>
        <div className='container'>
            <div className='row mb-3'>
                    <div className='col-sm d-flex add-switches'>
                        <h5>Number of switches</h5>
                        <div className='add-minus-switch'>
                        <button type='button' className='add-minus' onClick={decrementSwitches}><i className='fas fa-minus'></i></button>
                        <input type='text' name='switchAmount' value={switchAmount} /> 
                        <button type='button' className='add-minus' onClick={incrementSwitches}><i className='fas fa-plus'></i></button>
                         </div>
                    </div>

                    <div className='col-sm d-flex add-attempts'>
                        <h5>Number of attempts</h5>
                        <div className='add-minus-attempt'>
                        <button type='button' className='add-minus' onClick={decrementAttempt}> <i className='fas fa-minus'></i></button>
                        <input type='text' name='attemptAmount' value={attemptAmount} />
                        <button type='button' className='add-minus' onClick={incrementAttempt}><i className='fas fa-plus'></i></button>
                        </div>

                    </div>
                    
            </div>
            <div className='row'>
                    <div className='col d-flex justify-content-center'>
                        <button className='generate-button' type='button' onClick={addAttempts}>Create activity</button>
                    </div>

            </div>

            
        </div>
        </section>

      )

}

//accept the props in child component
const GenerateActivity = ({attempts, computeSW1Answer, computeSW2Answer, computeSW3Answer, computeSW4Answer, showTimer, computePrompting, computeEngagement, render }) => {

   // const { attemptsArray, addAttempts } = QuickActivityLogic();

    return (
        <section className='generated-activity'>
            <div className='container'>
               {showTimer ? <div className='row'>
                    <div className='col d-flex justify-content-center'>
                     { render }
                    </div>
                </div> : null }
                <div className='row'>
                <div className='col d-flex attempt-cols justify-content-center'>
                        {attempts.map((attempt) => (
                            <AttemptCard key={attempt.id} attempt={attempt} attempts={attempts} computeSW1Answer={computeSW1Answer} computeSW2Answer={computeSW2Answer} computeSW3Answer={computeSW3Answer} computeSW4Answer={computeSW4Answer} computePrompting={computePrompting} computeEngagement={computeEngagement} />
                            ))}
                    </div>
                </div>
            </div>

        </section>

    )
        
  
}




const AttemptCard = ({attempt, attempts, computeSW1Answer, computeSW2Answer, computeSW3Answer, computeSW4Answer, computePrompting, computeEngagement }) => {

    const header = attempts.indexOf(attempt) + 1
    const [activeButtonSW1, setActiveButtonSW1] = useState()
    const [activeButtonSW2, setActiveButtonSW2] = useState()
    const [activeButtonSW3, setActiveButtonSW3] = useState()
    const [activeButtonSW4, setActiveButtonSW4] = useState()


    return (
        
            <div className='container'>
                <div className='row'>
                    <div className='col d-flex justify-content-center'>
                    <div className="card border-primary w-75  text-center mt-3 shadow-lg">
                        <h4 className='card-header' style={{fontFamily: 'Poppins'}}>attempt {header}</h4>
                         <div className="card-body">

                         {attempt.switch1Answers ? (<p className='card-text'>Switch 1</p>) : (null) }
                            {attempt.switch1Answers ? (
                                attempt.switch1Answers.map((answer, index) => (
                                    <button className='box-shadow--2dp' key={index} type='button' className={`btn mt-1 ${activeButtonSW1 === index ? "btn-success" : "btn-primary" }`} onClick={(event) => {setActiveButtonSW1(index); computeSW1Answer(event, index, attempt.id)}}>{answer}</button>
                                ))) : (null)}


                            {attempt.switch2Answers ? (<p className='card-text'>Switch 2</p>) : (null) }
                            {attempt.switch2Answers ? (
                                attempt.switch2Answers.map((answer, index) => (
                                    <button className='box-shadow--2dp' key={index} type='button' className={`btn mt-1 ${activeButtonSW2 === index ? "btn-success" : "btn-primary"}`} onClick={(event) => {setActiveButtonSW2(index); computeSW2Answer(event, index, attempt.id)}}>{answer}</button>
                                ))) : (null)}

                            {attempt.switch3Answers ? (<p className='card-text'>Switch 3</p>) : (null) }
                            {attempt.switch3Answers ? (
                                attempt.switch3Answers.map((answer, index) => (
                                    <button key={index} type='button' className={`btn mt-1 ${activeButtonSW3 === index ? "btn-success" : "btn-primary"}`} onClick={(event) => {setActiveButtonSW3(index); computeSW3Answer(event, index, attempt.id)}}>{answer}</button>
                                ))) : (null)}

                            {attempt.switch4Answers ? (<p className='card-text'>Switch 4</p>) : (null) }
                            {attempt.switch4Answers ? (
                                attempt.switch4Answers.map((answer, index) => (
                                    <button key={index} type='button' className={`btn mt-1 ${activeButtonSW4 === index ? "btn-success" : "btn-primary"}`} onClick={(event) => {setActiveButtonSW4(index); computeSW4Answer(event, index, attempt.id)}}>{answer}</button>
                                ))) : (null)}


                            <div className='row mt-3'>
                                <div className='col-sm d-flex prompting-select'>
                                <select class="form-select w-auto" aria-label="Default select example" onChange={(event) => computePrompting(event, attempt.id)}>
                                    <option selected>Prompting</option>
                                    <option value="No prompt">No prompt</option>
                                    <option value="Visual prompt">Visual prompt</option>
                                    <option value="Verbal prompt">Verbal prompt</option>
                                    <option value="Physical prompt">Physical prompt</option>
                                </select>
                                </div>
                               
                                <div className='col-sm d-flex engage-select'>
                                <select class="form-select w-auto" aria-label="Default select example" onChange={(event) => computeEngagement(event, attempt.id)}>
                                    <option selected>Engagement</option>
                                    <option value="Engaged">Engaged</option>
                                    <option value="Somewhat engaged">Somewhat engaged</option>
                                    <option value="Not engaged">Not engaged</option>
                                </select>
                                </div>

                            </div>

                   
                         </div>
                    </div>

                     </div>

                </div>

            </div>
       
    )
}


const EndActivity = ({ CalculateActivityScore, resultsArray, ComputePrompt, ComputeEngage, handleEndActivity, time, handleCommentChange, exportData, PromptEngage, resultsRef, handleScroll }) => {

    const [showResults, setShowResults] = useState(false)


    return(

        <div className='container'>
            <div className='row mt-5 mb-5'>
                <div className='col d-flex col-lg-12 col-md-12 justify-content-center'>
                    <button className='generate-button' type='button' onClick={() => {CalculateActivityScore(); setShowResults(true); handleEndActivity(); ComputePrompt(); ComputeEngage(); PromptEngage(); handleScroll(); }}>End activity</button>
                </div>

            </div>

            {showResults ? (<div className='row'>
                    <div className='col d-flex justify-content-center'>
                    <div className="card text-center w-75 mb-4 shadow">
                        <h4 ref={resultsRef} id='resultDiv'  className='card-header'>Activity Results</h4>
                         <div className="card-body">
                            <div className='row'>
                                <div className='col-sm d-flex justify-content-center score-box'>
                                <section>
                                {resultsArray.length > 0 ? (
                                 resultsArray.map((result, index) => (
                                     <div key={index}>
                                        <h2>Total score: {result.score}%</h2>
                                        <h5>Switch 1 accuracy: {result.Switch1Accuracy}%</h5>
                                        {typeof resultsArray[0]["Switch2Accuracy"] !== 'undefined' ? (
                                        <h5>Switch 2 accuracy: {result.Switch2Accuracy}%</h5>) : (null)}
                                        {typeof resultsArray[0]["Switch3Accuracy"] !== 'undefined' ? (
                                        <h5>Switch 3 accuracy: {result.Switch3Accuracy}%</h5>) : (null)}
                                         {typeof resultsArray[0]["Switch4Accuracy"] !== 'undefined' ? (
                                        <h5>Switch 4 accuracy: {result.Switch4Accuracy}%</h5>) : (null)}
                                        
                                    </div>
                                    ))): (null)}
                                </section>
                                </div>
                           
                                   
                                 <div className='col-sm mt-1 d-flex time-box'>
                                   <section>
                                   <h5 className='mb-2'>Activity time <small>(mm:ss)</small></h5>
                                  <Timer time={time} />
                                   <h5 className='mt-4'>No attempt rate</h5>

                                   {resultsArray.length > 0 ? (
                                 resultsArray.map((result, index) => (
                                     <div key={index}>
                                        <h6>Switch 1: {result.Switch1NoAttempt}%</h6>
                                        {typeof resultsArray[0]["Switch2Accuracy"] !== 'undefined' ? (
                                        <h6>Switch 2: {result.Switch2NoAttempt}%</h6>) : (null)}
                                        {typeof resultsArray[0]["Switch3Accuracy"] !== 'undefined' ? (
                                        <h6>Switch 3: {result.Switch3NoAttempt}%</h6>) : (null)}
                                         {typeof resultsArray[0]["Switch4Accuracy"] !== 'undefined' ? (
                                        <h6>Switch 4: {result.Switch4NoAttempt}%</h6>) : (null)}
                                        
                                    </div>
                                    ))): (null)}

                                   </section>
                                 </div>
                                 
                            </div>
                      
                                
                                <div className='row mt-4'>
                                    <div className='col-sm d-flex justify-content-center prompting-box'>
                                        <PromptPie ComputePrompt={ComputePrompt} />
                                    </div>
                                    <div className='col-sm d-flex justify-content-center engagement-box'>
                                        <EngagePie ComputeEngage={ComputeEngage} />
                                    </div>

                                </div>

                                <div className='row'>
                                    <div className='col d-flex justify-content-center'>
                                    
                                    <form>
                                    <div className="mb-3 text-area">
                                        <label for="exampleInputEmail1" class="form-label">Activity comments</label>
                                        <input type="textarea" class="form-control" onChange={handleCommentChange} placeholder='Add comments...' id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                        
                                    </form>
                                  
                                    </div>

                                </div>

                                <div className='row'>
                                    <div className='col d-flex mt-2 justify-content-center'>
                                    
                                    <ExcelExport exportData={exportData} />
                                  
                                    </div>

                                </div>
                                
                                <div className='row'>
                                    <div className='col d-flex mt-5 justify-content-center'>
                                    
                                    <h6 style={{fontFamily: "Poppins"}}>You are our very first testers! Your feedback is crucial to make this app better! <br /> Please take our 2 minute survey.</h6>
                                  
                                    </div>

                                </div>

                                <div className='row mt-2'>
                                    <div className='col-sm d-flex justify-content-center'>
                                    <div className='survey-div' onClick={() => {window.open("https://s.surveyplanet.com/np86zci6", "_blank");}}>
                                    Take Survey
                                    </div>
                                    </div>
                                </div>
                               

                                <div className='row mt-3'>
                                    <div className='col-sm d-flex justify-content-center'>
                                        <small style={{color: 'lightgray'}}> (reload page to reset activity)</small>
                                    </div>

                                    
                                </div>

                      
                   
                         </div>
                    </div>

                     </div>

            </div>) : (null)}

        </div>




    );

}

//Pie Chart Prompting

const PromptPie = ({ ComputePrompt }) => {


    return(
        <div className='prompt-pie'>
           
            <VictoryPie data={ComputePrompt()} 
                innerRadius={35} 
                labels={( {datum} ) => `${datum.x} \n ${datum.y}%`} 
                labelRadius={({ innerRadius }) => innerRadius + 40 }
                style={{ labels: { fontSize: 8, fill: "black"}}}
                colorScale={["#FF6961", "#77DD77", "#6CA0DC", "#FFF44C"]}
                style={{ labels: { fontSize: 14, fill: "black", fontWeight: "bold"}}}
                
                />
           
        </div>

    );
}

//Pie Chart Engagement

const EngagePie = ({ ComputeEngage }) => {
    return(
        <div className='prompt-pie'>
           
            <VictoryPie data={ComputeEngage()} 
                innerRadius={35} 
                labels={( {datum} ) => `${datum.x} \n ${datum.y}%`} 
                labelRadius={({ innerRadius }) => innerRadius + 39 }
                style={{ labels: { fontSize: 8, fill: "black"}}}
                colorScale={["#EC6B56", "#FFC154", "#47B39C"]}
                style={{ labels: { fontSize: 14, fill: "black", fontWeight: "bold"}}}
                
                />
           
        </div>

    );
}






