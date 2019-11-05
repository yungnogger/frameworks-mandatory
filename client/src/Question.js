import React, { Component } from "react";
import { Link } from "@reach/router";
import PostComment from "./PostComment";

class Question extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        const question = this.props.getQuestion(this.props.id);

        let content = <p>Please wait while we load your post, real quick</p>;
        if (question) {
            content = (
                <>
                    <h1 className="question-title">{question.question}</h1>
                    <h3>Comments:</h3>
                    <ul>
                        {question.comments.map(c => (
                            <div key={c._id}>
                                <div className="comment">
                                    <p className="votes">Votes: {c.votes}</p>
                                    <button
                                        onClick={() =>
                                            this.props.handleVote(this.props.id, c._id, 1)
                                          }
                                    >
                                        <span>&uarr;</span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            this.props.handleVote(this.props.id, c._id, -1)
                                        }
                                    >
                                        <span>&darr;</span>
                                    </button>
                                    <h3 className="comment-name">{c.text}</h3>
                                </div>
                            </div>
                        ))}
                    </ul>
                    <PostComment
                        id={this.props.id}
                        postComment={(id, text) => this.props.postComment(id, text)}
                    />
                </>
            );
        }

        return content;
    }
}

export default Question;