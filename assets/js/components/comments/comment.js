import React from "react";
import moment from 'moment';

export default class Comment extends React.Component {
    render() {
        const comment_time = moment.utc(this.props.comment.inserted_at);
        let commentClasses = ["comment"];

        if (this.props.comment.polarity_confidence && this.props.comment.polarity_confidence >= 0.6) {
            commentClasses.push(this.props.comment.polarity);
        }

        return (
            <li className={commentClasses.join(" ")}>
                <div className="row">
                    <div className="col-xs-12">
                        <small> <b> {this.props.comment.user ? this.props.comment.user.username : "Anonymous"} </b></small>
                        <span> - </span>
                        <small title={comment_time.format('L LT')}>{comment_time.fromNow()}</small>
                         
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <pre>
                            { this.props.comment.content }
                        </pre>
                    </div>
                </div>
                    
            </li>
        )
    }
}