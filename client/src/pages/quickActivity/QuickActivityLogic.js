import React from 'react'
import { useState, useEffect } from 'react';





const QuickActivityLogic = () => {

const resultsRef = React.createRef(null)

const [attemptsArray, setAttemptsArray] = useState([]);
const [resultsArray, setResultsArray] = useState([])
const [switchAmount, setSwitchAmount] = useState(1)
const [attemptAmount, setAttemptAmount] = useState(1)
const [endActivity, setEndActivity] = useState(false)
const [showTimer, setShowTimer] = useState(false)
const [activityComment, setActivityComment] = useState("")
const [exportData, setExportData] = useState([]);
const [promptEngage, setPromptEngage] = useState([]);
const [resultsLoaded, setResultsLoaded] = useState(false)

// Stopwatch State

const [isActive, setIsActive] = useState(false);
const [isPaused, setIsPaused] = useState(true);
const [time, setTime] = useState(0);
// const [timeExport, setTimeExport] = useState(false);
// const [timeExcel, setTimeExcel] = useState("")
// let isFirstRender = useRef(true);



// Handle Activity Scroll
const handleScroll = () => {
        setResultsLoaded(true)
      
    }

useEffect(() => {

    console.log('scroll useEffect ran')
    const node = resultsRef.current

    if(resultsLoaded) {

        node.scrollIntoView({behavior: 'smooth'});
        
    }

}, [resultsLoaded])





    //Set Switch Amount
    const incrementSwitches = () => {
        if (switchAmount < 4) {
        setSwitchAmount(switchAmount + 1);
        }  
       
    };

    const decrementSwitches = () => {

        if(switchAmount > 1) {
        setSwitchAmount(switchAmount - 1)
        }
    };

    //Set Attempt Amount
    const incrementAttempt = () => {
        if (attemptAmount < 20) {
            setAttemptAmount(attemptAmount + 1);
        }
    };

    const decrementAttempt = () => {
        if (attemptAmount > 1) {
            setAttemptAmount(attemptAmount - 1)
        }
    };

    // Activity Comments
    const handleCommentChange = (event) => {
        setActivityComment(event.target.value)

    }

  

    
    // Generate Activity on Button Press
    const addAttempts = () => {
        
        const switch1Answers = ["Correct", "Incorrect", "No attempt"]
        const switch2Answers = ["Correct", "Incorrect", "No attempt"]
        const switch3Answers = ["Correct", "Incorrect", "No attempt"]
        const switch4Answers = ["Correct", "Incorrect", "No attempt"]
        
    
    
       
        const tempArray = []
        for(let i = 1; i <= attemptAmount; i++) {

            let id = Math.floor(Math.random() * 10000) + 1
            let newAttempt = {id}
            //determine how many switches per attempt
            if (switchAmount === 1) {
                newAttempt.switch1Answers = switch1Answers
                newAttempt.switch1Answer = null
                newAttempt.prompting = null
                newAttempt.engagement = null
            } else if (switchAmount === 2) {
                newAttempt.switch1Answers = switch1Answers
                newAttempt.switch1Answer = null
                newAttempt.switch2Answers = switch2Answers
                newAttempt.switch2Answer = null
                newAttempt.prompting = null
                newAttempt.engagement = null
            } else if (switchAmount === 3) {
                newAttempt.switch1Answers = switch1Answers
                newAttempt.switch1Answer = null
                newAttempt.switch2Answers = switch2Answers
                newAttempt.switch2Answer = null
                newAttempt.switch3Answers = switch3Answers
                newAttempt.switch3Answer = null
                newAttempt.prompting = null
                newAttempt.engagement = null
            } else {
                newAttempt.switch1Answers = switch1Answers
                newAttempt.switch1Answer = null
                newAttempt.switch2Answers = switch2Answers
                newAttempt.switch2Answer = null
                newAttempt.switch3Answers = switch3Answers
                newAttempt.switch3Answer = null
                newAttempt.switch4Answers = switch4Answers
                newAttempt.switch4Answer = null
                newAttempt.prompting = null
                newAttempt.engagement = null

            }
            

            
            tempArray.push(newAttempt)
         
        }

            console.log(tempArray)

        setAttemptsArray(tempArray);
        setEndActivity(true);
        setShowTimer(true);

        console.log(attemptsArray)
    }


    ///Compute Each Switches Answer
    const computeSW1Answer = (event, index, id) => {
        let newArray = attemptsArray.map((attempt) => {
            if (attempt.id === id) {
                return {
                    ...attempt,
                    switch1Answer: attempt.switch1Answers[index]
                }
            }
            return attempt;
        })

        setAttemptsArray(newArray)
    
    }

    const computeSW2Answer = (event, index, id) => {
        let newArray = attemptsArray.map((attempt) => {
            if (attempt.id === id) {
                return {
                    ...attempt,
                    switch2Answer: attempt.switch2Answers[index]
                }
            }
            return attempt;
        })

        setAttemptsArray(newArray)
        console.log(attemptsArray)
    
    }

    const computeSW3Answer = (event, index, id) => {
        let newArray = attemptsArray.map((attempt) => {
            if (attempt.id === id) {
                return {
                    ...attempt,
                    switch3Answer: attempt.switch3Answers[index]
                }
            }
            return attempt;
        })

        setAttemptsArray(newArray)
    
    }

    const computeSW4Answer = (event, index, id) => {
        let newArray = attemptsArray.map((attempt) => {
            if (attempt.id === id) {
                return {
                    ...attempt,
                    switch4Answer: attempt.switch4Answers[index]
                }
            }
            return attempt;
        })

        setAttemptsArray(newArray)
    
    }


    // Compute Prompting level
    
    const computePrompting = (event, id) => {
        let newArray = attemptsArray.map((attempt) => {
            if (attempt.id === id) {
                return {
                    ...attempt,
                    prompting: event.target.value
                }
            }
            return attempt;
        })

        setAttemptsArray(newArray);
        console.log(attemptsArray)
      
    }


    // Compute Engagement level

    const computeEngagement = (event, id) => {
        let newArray = attemptsArray.map((attempt) => {
            if (attempt.id === id) {
                return {
                    ...attempt,
                    engagement: event.target.value
                }
            }
            return attempt;
        })

        setAttemptsArray(newArray);
       
    }




    // End Activity Result

    let TotalAttemptCorrect = 0
  

    const CalculateActivityScore = () => {
        
        // 1 Switch Activity
        if (switchAmount === 1) {
            attemptsArray.map((attempt) => {
                if (attempt.switch1Answer === 'Correct') {
                    TotalAttemptCorrect++
                }   
                 
            })

            const Switch1CorrectLength = attemptsArray.map((attempt) => attempt.switch1Answer).filter((answer) => answer === 'Correct').length
            const Switch1TotalLength = attemptsArray.map((attempt) => attempt.switch1Answer).length
            
            const Switch1NoAttemptLength = attemptsArray.map((attempt) => attempt.switch1Answer).filter((answer) => answer === 'No attempt').length
            

            setResultsArray([{'score': (Math.round((TotalAttemptCorrect / attemptsArray.length) * 100) / 100) * 100, 'Switch1Accuracy': (Math.round((Switch1CorrectLength / Switch1TotalLength) * 100) / 100) * 100, 'Switch1NoAttempt': (Math.round((Switch1NoAttemptLength / Switch1TotalLength) * 100) / 100) * 100}])
            // setExportData([{'score': (Math.round((TotalAttemptCorrect / attemptsArray.length) * 100) / 100) * 100, 'Switch1Accuracy': (Math.round((Switch1CorrectLength / Switch1TotalLength) * 100) / 100) * 100, 'Switch1NoAttempt': (Math.round((Switch1NoAttemptLength / Switch1TotalLength) * 100) / 100) * 100}])
        }

        // 2 Switch Activity
        if (switchAmount === 2) {
            attemptsArray.map((attempt) => {
                if (attempt.switch1Answer === 'Correct' && attempt.switch2Answer === 'Correct') {
                    TotalAttemptCorrect++
                }
               
            })

            const Switch1CorrectLength = attemptsArray.map((attempt) => attempt.switch1Answer).filter((answer) => answer === 'Correct').length
            const Switch1TotalLength = attemptsArray.map((attempt) => attempt.switch1Answer).length
            const Switch2CorrectLength = attemptsArray.map((attempt) => attempt.switch2Answer).filter((answer) => answer === 'Correct').length
            const Switch2TotalLength = attemptsArray.map((attempt) => attempt.switch2Answer).length
            
            const Switch1NoAttemptLength = attemptsArray.map((attempt) => attempt.switch1Answer).filter((answer) => answer === 'No attempt').length
            const Switch2NoAttemptLength = attemptsArray.map((attempt) => attempt.switch2Answer).filter((answer) => answer === 'No attempt').length
            
            setResultsArray([{'score': (Math.round((TotalAttemptCorrect / attemptsArray.length) * 100) / 100) * 100, 'Switch1Accuracy': (Math.round((Switch1CorrectLength / Switch1TotalLength) * 100) / 100) * 100 , 'Switch2Accuracy': (Math.round((Switch2CorrectLength / Switch2TotalLength) *100) / 100) * 100, 'Switch1NoAttempt': (Math.round((Switch1NoAttemptLength / Switch1TotalLength) * 100) / 100) * 100, 'Switch2NoAttempt': (Math.round((Switch2NoAttemptLength / Switch2TotalLength) * 100) / 100) * 100}])  
            
        }

        // 3 Switch Activity
        if (switchAmount === 3) {
            attemptsArray.map((attempt) => {
                if (attempt.switch1Answer === 'Correct' && attempt.switch2Answer === 'Correct' && attempt.switch3Answer === 'Correct') {
                    TotalAttemptCorrect++
                }   
            })

            const Switch1CorrectLength = attemptsArray.map((attempt) => attempt.switch1Answer).filter((answer) => answer === 'Correct').length
            const Switch1TotalLength = attemptsArray.map((attempt) => attempt.switch1Answer).length
            const Switch2CorrectLength = attemptsArray.map((attempt) => attempt.switch2Answer).filter((answer) => answer === 'Correct').length
            const Switch2TotalLength = attemptsArray.map((attempt) => attempt.switch2Answer).length
            const Switch3CorrectLength = attemptsArray.map((attempt) => attempt.switch3Answer).filter((answer) => answer === 'Correct').length
            const Switch3TotalLength = attemptsArray.map((attempt) => attempt.switch3Answer).length

            const Switch1NoAttemptLength = attemptsArray.map((attempt) => attempt.switch1Answer).filter((answer) => answer === 'No attempt').length
            const Switch2NoAttemptLength = attemptsArray.map((attempt) => attempt.switch2Answer).filter((answer) => answer === 'No attempt').length
            const Switch3NoAttemptLength = attemptsArray.map((attempt) => attempt.switch3Answer).filter((answer) => answer === 'No attempt').length

            setResultsArray([{'score': (Math.round((TotalAttemptCorrect / attemptsArray.length) * 100) / 100) * 100, 'Switch1Accuracy': (Math.round((Switch1CorrectLength / Switch1TotalLength) * 100) / 100) * 100 , 'Switch2Accuracy': (Math.round((Switch2CorrectLength / Switch2TotalLength) *100) / 100) * 100, 'Switch3Accuracy': (Math.round((Switch3CorrectLength / Switch3TotalLength) *100) / 100) * 100, 'Switch1NoAttempt': (Math.round((Switch1NoAttemptLength / Switch1TotalLength) * 100) / 100) * 100, 'Switch2NoAttempt': (Math.round((Switch2NoAttemptLength / Switch2TotalLength) * 100) / 100) * 100, 'Switch3NoAttempt': (Math.round((Switch3NoAttemptLength / Switch3TotalLength) * 100) / 100) * 100}])

        }

        // 4 Switch Activity
         if (switchAmount === 4) {
            attemptsArray.map((attempt) => {
                if (attempt.switch1Answer === 'Correct' && attempt.switch2Answer === 'Correct' && attempt.switch3Answer === 'Correct' && attempt.switch4Answer === 'Correct') {
                        TotalAttemptCorrect++
                }
             })

             const Switch1CorrectLength = attemptsArray.map((attempt) => attempt.switch1Answer).filter((answer) => answer === 'Correct').length
             const Switch1TotalLength = attemptsArray.map((attempt) => attempt.switch1Answer).length
             const Switch2CorrectLength = attemptsArray.map((attempt) => attempt.switch2Answer).filter((answer) => answer === 'Correct').length
             const Switch2TotalLength = attemptsArray.map((attempt) => attempt.switch2Answer).length
             const Switch3CorrectLength = attemptsArray.map((attempt) => attempt.switch3Answer).filter((answer) => answer === 'Correct').length
             const Switch3TotalLength = attemptsArray.map((attempt) => attempt.switch3Answer).length
             const Switch4CorrectLength = attemptsArray.map((attempt) => attempt.switch4Answer).filter((answer) => answer === 'Correct').length
             const Switch4TotalLength = attemptsArray.map((attempt) => attempt.switch4Answer).length

             const Switch1NoAttemptLength = attemptsArray.map((attempt) => attempt.switch1Answer).filter((answer) => answer === 'No attempt').length
             const Switch2NoAttemptLength = attemptsArray.map((attempt) => attempt.switch2Answer).filter((answer) => answer === 'No attempt').length
             const Switch3NoAttemptLength = attemptsArray.map((attempt) => attempt.switch3Answer).filter((answer) => answer === 'No attempt').length
             const Switch4NoAttemptLength = attemptsArray.map((attempt) => attempt.switch4Answer).filter((answer) => answer === 'No attempt').length
             
             setResultsArray([{'score': (Math.round((TotalAttemptCorrect / attemptsArray.length) * 100) / 100) * 100, 'Switch1Accuracy': (Math.round((Switch1CorrectLength / Switch1TotalLength) * 100) / 100) * 100, 'Switch2Accuracy': (Math.round((Switch2CorrectLength / Switch2TotalLength) *100) / 100) * 100, 'Switch3Accuracy': (Math.round((Switch3CorrectLength / Switch3TotalLength) *100) / 100) * 100, 'Switch4Accuracy': (Math.round((Switch4CorrectLength / Switch4TotalLength) *100) / 100) * 100, 'Switch1NoAttempt': (Math.round((Switch1NoAttemptLength / Switch1TotalLength) * 100) / 100) * 100, 'Switch2NoAttempt': (Math.round((Switch2NoAttemptLength / Switch2TotalLength) * 100) / 100) * 100, 'Switch3NoAttempt': (Math.round((Switch3NoAttemptLength / Switch3TotalLength) * 100) / 100) * 100, 'Switch4NoAttempt': (Math.round((Switch4NoAttemptLength / Switch4TotalLength) * 100) / 100) * 100}])
        }

            console.log(resultsArray);
            
    } 


    //Calculate Prompting

   const ComputePrompt = () => {

        let promptArray = []
    
        const TotalLength = attemptsArray.map((attempt) => attempt.prompting).length
        const Noprompt = attemptsArray.map((attempt) => attempt.prompting).filter((prompt) => prompt === 'No prompt').length
        const Visprompt = attemptsArray.map((attempt) => attempt.prompting).filter((prompt) => prompt === 'Visual prompt').length
        const Verprompt = attemptsArray.map((attempt) => attempt.prompting).filter((prompt) => prompt === 'Verbal prompt').length
        const Phyprompt = attemptsArray.map((attempt) => attempt.prompting).filter((prompt) => prompt === 'Physical prompt').length

       
        if (Visprompt > 0) { promptArray.push({ x: 'Visual \n prompt', y: Math.floor((Visprompt / TotalLength) * 100) }) }
        if (Noprompt > 0) { promptArray.push({ x: 'No prompt', y: Math.floor((Noprompt / TotalLength) * 100) }) }
        if (Verprompt > 0) { promptArray.push({ x: 'Verbal \n prompt', y: Math.floor((Verprompt / TotalLength) * 100) }) }
        if (Phyprompt > 0) { promptArray.push({ x: 'Physical \n Prompt', y: Math.floor((Phyprompt / TotalLength) * 100) }) }
        
        //setPromptArray([{x: 'No prompt', y: (Math.round((Noprompt / TotalLength) * 100) / 100) * 100}, {x: 'Visual prompt',  y: (Math.round((Visprompt / TotalLength) * 100) / 100) * 100}, {x: 'Verbal prompt', y: (Math.round((Verprompt / TotalLength) * 100) / 100) * 100}, {x: 'Physical prompt', y: (Math.round((Phyprompt / TotalLength) * 100) / 100) * 100} ])
        //setEngageArray([{'Engaged': (Math.round((Engaged / TotalLengthEngage) * 100) / 100) * 100, 'SomewhatEngage': (Math.round((SomewhatEngage / TotalLengthEngage) * 100) / 100) * 100, 'NotEngage': (Math.round((NotEngage / TotalLengthEngage) * 100) / 100) * 100 }])
        
        console.log(promptArray)
        return promptArray;
        
        
    }

    //Calculate Engagement

    function ComputeEngage() {
        let engageArray = [];

        const TotalLengthEngage = attemptsArray.map((attempt) => attempt.engagement).length
        const Engaged = attemptsArray.map((attempt) => attempt.engagement).filter((engage) => engage === 'Engaged').length
        const SomewhatEngage = attemptsArray.map((attempt) => attempt.engagement).filter((engage) => engage === 'Somewhat engaged').length
        const NotEngage = attemptsArray.map((attempt) => attempt.engagement).filter((engage) => engage === 'Not engaged').length

        if (Engaged > 0) { engageArray.push({x: 'Engaged', y: Math.floor((Engaged / TotalLengthEngage) * 100) }) }
        if (SomewhatEngage > 0) { engageArray.push({ x: 'Somewhat\n engaged', y: Math.floor((SomewhatEngage / TotalLengthEngage) * 100) }) } 
        if (NotEngage > 0) { engageArray.push({ x: 'Not\n engaged', y: Math.floor((NotEngage / TotalLengthEngage) * 100) }) }

        return engageArray;

    }

    // Prompting and Engagement for Excel Export

    const PromptEngage = () => {

        let promptEngageArray = []

        promptEngageArray.push({name: "Total Attempts", value: attemptsArray.length })
    
        // Prompting
        const TotalLength = attemptsArray.map((attempt) => attempt.prompting).length
        const Noprompt = attemptsArray.map((attempt) => attempt.prompting).filter((prompt) => prompt === 'No prompt').length
        const Visprompt = attemptsArray.map((attempt) => attempt.prompting).filter((prompt) => prompt === 'Visual prompt').length
        const Verprompt = attemptsArray.map((attempt) => attempt.prompting).filter((prompt) => prompt === 'Verbal prompt').length
        const Phyprompt = attemptsArray.map((attempt) => attempt.prompting).filter((prompt) => prompt === 'Physical prompt').length
        if (Visprompt > 0) { promptEngageArray.push({ name: 'Visual prompt', value: Math.floor((Visprompt / TotalLength) * 100) }) }
        if (Noprompt > 0) { promptEngageArray.push({ name: 'No prompt', value: Math.floor((Noprompt / TotalLength) * 100) }) }
        if (Verprompt > 0) { promptEngageArray.push({ name: 'Verbal prompt', value: Math.floor((Verprompt / TotalLength) * 100) }) }
        if (Phyprompt > 0) { promptEngageArray.push({ name: 'Physical prompt', value: Math.floor((Phyprompt / TotalLength) * 100) }) }
        // Engagement
        const TotalLengthEngage = attemptsArray.map((attempt) => attempt.engagement).length
        const Engaged = attemptsArray.map((attempt) => attempt.engagement).filter((engage) => engage === 'Engaged').length
        const SomewhatEngage = attemptsArray.map((attempt) => attempt.engagement).filter((engage) => engage === 'Somewhat engaged').length
        const NotEngage = attemptsArray.map((attempt) => attempt.engagement).filter((engage) => engage === 'Not engaged').length
        if (Engaged > 0) { promptEngageArray.push({name: 'Engaged', value: Math.floor((Engaged / TotalLengthEngage) * 100) }) }
        if (SomewhatEngage > 0) { promptEngageArray.push({name: 'Somewhat engaged', value: Math.floor((SomewhatEngage / TotalLengthEngage) * 100) }) } 
        if (NotEngage > 0) { promptEngageArray.push({name: 'Not engaged', value: Math.floor((NotEngage / TotalLengthEngage) * 100) }) }

        
        setPromptEngage([...promptEngageArray])
       
    }

       
    // Set Excel Export data Array 
        useEffect(() => {
            
            if (resultsArray.length > 0) {
            setExportData([{name: "Total Score", value: resultsArray[0].score}, {name: "Switch 1 Accuracy", value: resultsArray[0].Switch1Accuracy}, {name: "Switch 1 No Attempt Rate", value: resultsArray[0].Switch1NoAttempt }, {name: "Switch 2 Accuracy", value: typeof resultsArray[0]["Switch2Accuracy"] !== 'undefined' ? (resultsArray[0].Switch2Accuracy) : ("-")}, {name: "Switch 2 No Attempt Rate", value: typeof resultsArray[0]["Switch2NoAttempt"] !== 'undefined' ? (resultsArray[0].Switch2NoAttempt) : ("-")}, {name: "Switch 3 Accuracy", value: typeof resultsArray[0]["Switch3Accuracy"] !== 'undefined' ? (resultsArray[0].Switch3Accuracy) : ("-")}, {name: "Switch 3 No Attempt Rate", value: typeof resultsArray[0]["Switch3NoAttempt"] !== 'undefined' ? (resultsArray[0].Switch3NoAttempt) : ("-")}, {name: "Switch 4 Accuracy", value: typeof resultsArray[0]["Switch4Accuracy"] !== 'undefined' ? (resultsArray[0].Switch4Accuracy) : ("-")}, ...promptEngage, {name: "Activity Comments", value: activityComment}, {name: "Activity Time", value: "*ADD MANUALLY"} ]) 
            
           }
          
        }, [resultsArray, activityComment])

      
        

    return {incrementSwitches, switchAmount, decrementSwitches, incrementAttempt, decrementAttempt, attemptAmount, addAttempts, attemptsArray, computeSW1Answer, computeSW2Answer, computeSW3Answer, computeSW4Answer, endActivity, CalculateActivityScore, resultsArray, showTimer, computePrompting, computeEngagement, ComputePrompt, ComputeEngage, handleCommentChange, exportData, PromptEngage, time, setTime, isPaused, setIsPaused, isActive, setIsActive, resultsRef, handleScroll  }
}

 export default QuickActivityLogic
