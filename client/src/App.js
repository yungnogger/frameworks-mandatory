import React, {Component} from 'react';
import { Router } from "@reach/router";
import './app.css';
import Questions from "./Questions";
import Question from "./Question";

class App extends Component {

    API_URL = process.env.REACT_APP_API_URL;
    constructor(props) {
        super(props);
        this.state = {
            questions: []
        };
    }
    componentDidMount() {
        this.getData();
    }

    async getData() {
        let url = `${this.API_URL}/questions`; // URL of the API.
        let result = await fetch(url); // Get the data
        let json = await result.json(); // Turn it into json

        return this.setState({
            // Set it in the state
            questions: json
        });
    }

    getQuestion(id) {
        // Find the relevant question by id
        return this.state.questions.find(q => q._id === id);
    }
    async postQuestion(question) {
        this.postData(question);
    }


    async postData(question) {
        let url = `${this.API_URL}/questions`;
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                question: question
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(() => {
                this.getData();
            });
    }

    postComment(id, text) {
        let url = `${this.API_URL}/questions/${id}/comments/`;

        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                text: text
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(() => {
                this.getData();
            });
    }

    async vote(id, commentId, value) {
        let url = `${this.API_URL}/questions/${id}/comments/${commentId}/vote/${value}`;
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(() => {
                this.getData();
            });
    }

    handleVote(id, commentId, value) {
        this.vote(id, commentId, value);
    }

    render() {
        return (
            <React.Fragment>
                <div className="header">
                    <a href="/"><h1>Noggers QnA!</h1></a>
                    <h2>Below you can read other questions by users, or ask your own question</h2>
                    <p>Remember, stupid questions deserve stupid answers</p>
                </div>
                <Router>
                    <Questions
                        path="/"
                        questions={this.state.questions}
                        postQuestion={question => this.postQuestion(question)}
                    />
                    <Question
                        path="/question/:id"
                        getQuestion={id => this.getQuestion(id)}
                        handleVote={(id, commentId, value) => this.handleVote(id, commentId, value)}
                        postComment={(id, text) => this.postComment(id, text)}
                    />
                </Router>
            </React.Fragment>
        )
    }
}

export default App;




