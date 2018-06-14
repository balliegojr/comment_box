import React, { Component } from 'react'
import { toast } from 'react-toastify';

const notifiable = WrappedComponent => {
    class Notifiable extends Component {
        static displayName = `Notifiable(${WrappedComponent.displayName ||
            WrappedComponent.name ||
            'Component'})`

        render() {
            return (
                <WrappedComponent {...this.props} notifiable={toast} />
            )
        }
    }

    return Notifiable
}

export default notifiable
