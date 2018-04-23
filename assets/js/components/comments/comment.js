import React from "react";
import { Link } from "react-router-dom"

export class Comment extends React.Component {
    render() {
        return (
            <li className="comment">
                <img className="img-responsive" />
                
                <div>
                    <span>Author</span>
                    <span>Time</span>
                    <br />

                    <span>Content</span>
                </div>
            </li>
        )
    }
}