import React from "react";
import moment from 'moment';

export default class Comment extends React.Component {
    render() {
        const comment_time = moment.utc(this.props.comment.inserted_at);

        return (
            <li className="comment">
                <div className="row">
                    <div className="col-md-6">
                        <span></span> <small> <b> {this.props.comment.user ? this.props.comment.user.username : "Anonymous"} </b></small>
                    </div>
                    <div className="col-md-6 text-right">
                        <small title={ comment_time.format('L LT') }>{ comment_time.fromNow() }</small>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <pre>
                            { this.props.comment.content }
                        </pre>
                    </div>
                </div>
                    
            </li>
        )
    }
}