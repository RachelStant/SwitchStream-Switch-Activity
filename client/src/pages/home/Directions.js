import React from 'react'
import logo from '../../images/Switch Stream PNG uncropped.png'


const Directions = () => {
    return (
        <div className='directions-page'>
            <div className='container'>
                <div className='row mt-5 mb-4 justify-content-center'>
                    <div className='col-sm-6 col-md-6 col-lg-4 justify-content-center'>
                    <img src={logo} className="img-responsive mt-2" width='100%' alt="company-logo" /> 
                    </div>
                </div>
            
                <div className='row'>
                    <div className='col d-flex justify-content-center'>
                    <div className="card border-primary w-75  text-center mt-1 mb-3 shadow-lg directions-card">
                        <h4 className='card-header card-bg'>Switch Activity Directions</h4>
                         <div className="card-body card-bg">
                         <p className="card-text">1.	Determine the number of switches (up to 4) and number of attempts. Select “Create activity” <br />
                                                  2.	When ready to start activity, select “start time” <br />
                                                  3.	For each attempt, you determine what a correct or incorrect activation looks like. If there is no attempt made, you can select “no attempt” to track that as well.<br />
                                                  4.	Optionally track prompting and engagement levels using the dropdown boxes.<br />
                                                  5.	After clicking “End activity”:<br /> 
                                                           <p> •	<strong>For a single switch activity: </strong>  Total score = total correct attempts / total attempts<br /> </p>
                                                           <p> •	<strong>For a multi-switch activity:</strong>  An attempt is “Correct” only if ALL SWITCHES are marked CORRECT. Otherwise, if any switch is marked incorrect or no attempt, that attempt is considered wrong. Total score = total correct attempts / total attempts.<br /></p>
                                                  6.	Add your activity comments, observations, etc.<br />
                                                  7.	Download the results to Excel to save or share the progress of your client / student.<br />
</p>


                         </div>

                    </div>

                     </div>

                </div>

            </div>
        </div>
    )
}

export default Directions
