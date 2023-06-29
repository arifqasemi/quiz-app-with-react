import React from 'react';
import { Fragment } from "react";
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import classes from './Home.module.css';
function Home(params) {

    return(
        <Fragment>
            <Helmet><title>Quiz App - Home</title></Helmet>
            <div id='home'>
              <section>  
                <h4>InstaQuiz</h4>
                <div className='play-button-container'>
                    <ul>
                        <li className='button'>
                            <Link to="/instruction">Start</Link>
                        </li>
                    </ul>
                </div>

                <div className='auth-button-conatiner'>
                
                </div>
              </section>
            </div>
          

        </Fragment>
    )
    
}

export default Home;