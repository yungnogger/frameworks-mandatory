import React, { Component } from "react";
import { Link } from "@reach/router";
import PostQuestion from "./PostQuestion";

class Questions extends Component {

    render() {

        return (
            <>

                <PostQuestion postQuestion={question => this.props.postQuestion(question)}></PostQuestion>
                <h2>All Questions</h2>
                <ol>

                    {this.props.questions.map(question => (
                        <div key={question._id} className="question-list">
                            <Link to={`/question/${question._id}`}>
                                <li className="question-item">{question.question}</li>
                            </Link>
                        </div>
                    ))}
                </ol>
            </>
        );
    }
}

export default Questions;