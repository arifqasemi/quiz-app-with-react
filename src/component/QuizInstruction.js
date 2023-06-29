import React, { Fragment }  from "react";
import { Helmet } from "react-helmet";
import classes from "./QuizInstruction.module.css";
import { Link } from "react-router-dom";

function QuizInstruction(params) {

    return(
        <Fragment>
            <Helmet><title>Quiz Instruction</title></Helmet>
        <div className="instruction">
            <h3>Quiz Instruction</h3>
            <p>dfh</p>
            <ul>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. iaculis. Ut aliquet, sapien sit amet blandit tristique, neque</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. iaculis. Ut aliquet, sapien sit amet blandit tristique, neque</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. iaculis. Ut aliquet, sapien sit amet blandit tristique, neque</li>

            </ul>

            <div className="links">
                <Link to="/" >Take me back</Link>
                <Link to="/quize" >Okay,let's do</Link>
            </div>
            </div>
        </Fragment>
    )
    
}

export default QuizInstruction;