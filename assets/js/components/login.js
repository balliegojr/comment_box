import React from "react"
import { Link } from 'react-router-dom'


export class LoginComponent extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello Boring Login Page!</h1>
                <Link to="/">Home</Link>
            </div>
        )
    }
}