import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import classes from './quize.module.css';
import questions from '../questions.json';
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import wrongSound from '../assets/wrong-sound.wav';
import correctSound from '../assets/right-sound.wav';
import { Link, redirect } from "react-router-dom";

class Quiz extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            questions,
            currentQuestion:{},
            nextQuestion:{},
            previousQuestion:{},
            answer:'',
            numberOfQuestion:0,
            numberOfAnsweredQuestion:0,
            currentQuestionIndex:0,
            score:0,
            correctAnswer:0,
            wrongAnswer:0,
            hint:0,
            fiftyFifty:0,
            usedFifty:false,
            time:{}

        };
        this.interval = null;
    }
    componentDidMount(){
        const {questions,currentQuestion,nextQuestion,previousQuestion}= this.state;
        this.displayQuestion(questions,currentQuestion,nextQuestion,previousQuestion);
        this.startTimer();
    }
    displayQuestion = (questions, currentQuestion, nextQuestion, previousQuestion) => {
        let { currentQuestionIndex } = this.state;
        if (questions && currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
          currentQuestion = questions[currentQuestionIndex];
          nextQuestion = questions[currentQuestionIndex + 1];
          previousQuestion = questions[currentQuestionIndex - 1];
          const answer = currentQuestion.answer;
          this.setState({
            currentQuestion: currentQuestion,
            nextQuestion: nextQuestion,
            previousQuestion: previousQuestion,
            numberOfQuestion: questions.length,
            answer: answer
          });
        }else{
            redirect('/');
        }
      };

    optionHandler =(e)=>{

        if(e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
            console.log('correct');
            this.correctAnswer();
            document.getElementById('correct-sound').play();
        }else{
            console.log('not correct');
            this.wrongAnswer();
            document.getElementById('wrong-sound').play();

        }

    }

    correctAnswer = ()=>{
        M.toast({
            html:'Correct Answer',
            classes:'toast-valid',
            displayLength:1500
        });
        this.setState(prevState =>({
            score:prevState.score +1,
            correctAnswer:prevState.correctAnswer +1,
            currentQuestionIndex:prevState.currentQuestionIndex +1,
            numberOfAnsweredQuestion:prevState.numberOfAnsweredQuestion +1
        }),()=>{
            this.displayQuestion(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
        })

    }
    
    wrongAnswer = ()=>{
        M.toast({
            html:'wrong Answer',
            classes:'toast-invalid',
            displayLength:1500
        });
        this.setState(prevState =>({
            wrongAnswer:prevState.wrongAnswer +1,
            currentQuestionIndex:prevState.currentQuestionIndex +1,
            numberOfAnsweredQuestion:prevState.numberOfAnsweredQuestion +1,
            currentQuestionIndex:prevState.currentQuestionIndex +1,

        }),()=>{
            this.displayQuestion(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);

        })
    }


    next = ()=>{
        this.setState(prevState =>({
           
            numberOfAnsweredQuestion:prevState.numberOfAnsweredQuestion +1,
            currentQuestionIndex:prevState.currentQuestionIndex +1,

        }),()=>{
            this.displayQuestion(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);

        })
    }

    previous = ()=>{
        this.setState(prevState =>({
           
            numberOfAnsweredQuestion:prevState.numberOfAnsweredQuestion -1,
            currentQuestionIndex:prevState.currentQuestionIndex -1,

        }),()=>{
            this.displayQuestion(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);

        })
    }

    startTimer = ()=>{
        const countDown = Date.now() +30000;
        this.interval = setInterval(()=>{
            const now = new Date();
            const distance = countDown - now;
            const minutes = Math.floor((distance % (1000 *60*60)) / (1000*60));
            const second = Math.floor((distance % (1000 *60)) / 1000);


            if(distance < 0){
                clearInterval(this.interval);
                this.setState({
                    time:{
                        minutes:0,
                        second:0
                    }
                },   ()=>{
                    alert('quiz has ended');
                    this.props.history.push('/');
                })
            }else{
                this.setState({
                    time:{
                        minutes,
                        second
                    }
                });
            }
      
        },1000);
    }



    render(){
        const {currentQuestion,numberOfQuestion,currentQuestionIndex,time} = this.state;    

        return(
            <Fragment>
                <Helmet><title>Quiz Page</title></Helmet>
                <audio id="correct-sound" src={wrongSound}></audio>
                <audio id="wrong-sound" src={correctSound}></audio>
                <div className="questions">
                    <div className="lifeline">
                    <div className="lifeline-d">
                    <p><i className="fab fa-centercode"></i></p>
                    <p>{currentQuestionIndex} of {numberOfQuestion}</p>
                    </div>
                    <div className="lifeline-d">
                    <p><i className="far fa-lightbulb"></i></p>
                    <p><i className="fa fa-clock"></i>{time.minutes}:{time.second}</p>
                    </div>
                    </div>
                    <h4>{this.state.currentQuestion.question}</h4>
                    <div className="question-container">
                    <div className="options-container">
                      <p onClick={this.optionHandler}  className="options">{currentQuestion.optionA}</p>
                      <p onClick={this.optionHandler}  className="options">{currentQuestion.optionB}</p>
                    </div>
                    <div  className="options-container">
                      <p onClick={this.optionHandler}  className="options">{currentQuestion.optionC}</p>
                      <p onClick={this.optionHandler}  className="options">{currentQuestion.optionD}</p>
                    </div>
                 
                    </div>
                    <div className="btns">
                    {this.state.previousQuestion && <button className="btn" onClick={this.previous}>Previous</button>}
                     {currentQuestionIndex < questions.length && <button className="btn" onClick={this.next}>Next</button>}
                    <Link to="/" > <button className="btn quite">Quite</button></Link>
                    </div>
                </div>
            </Fragment>
        );
    }

}

export default Quiz;