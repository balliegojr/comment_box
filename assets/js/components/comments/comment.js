import React from "react";
import moment from 'moment';

export class Comment extends React.Component {
    render() {
        return (
            <li className="comment">
                <div className="row">
                    <div className="col-md-6">
                        <span></span> <small> <b> Author - name </b></small>
                    </div>
                    <div className="col-md-6 text-right">
                        <small>{ moment.utc(this.props.comment.inserted_at).fromNow() }</small>
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