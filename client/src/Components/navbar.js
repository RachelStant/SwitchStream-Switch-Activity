import React from 'react'
import QuickActivity from '../pages/quickActivity/QuickActivity';
import Directions from '../pages/home/Directions';
import {
	HashRouter as Router,
	Routes,
	Route,
	Link
  } from 'react-router-dom';

const Navbar = () => {
    return (

		<Router basename="/">


        <nav className='navbar navbar-expand-lg navbar-dark menu shadow fixed-top'>
			<div className='container'>
			<button class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls="navbarNav" aria-expanded="false" aria-label="Target navigation">
				<span class='navbar-toggler-icon'></span>
			</button>
            <div className='collapse navbar-collapse justify-content-center' id='navbarNav'>
            <ul class='navbar-nav'>
					<li class='nav-item'>
						<Link to="/">Switch Activity</Link>
					</li>
					<li class='nav-item'>
						<Link to="/directions">Directions</Link>
					</li>
				
				</ul>
            </div>
            </div>
        </nav>


		<Routes>
      <Route exact path="/directions" element={<Directions />} />
      <Route path="/" element={<QuickActivity />} />
     
  		</Routes>


		</Router>





    );
}

export default Navbar
