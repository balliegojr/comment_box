import React, { Component } from 'react';

export default class Switcher extends Component {
    render() {
        let { page, total_pages } = this.props.pagination;
        if (!total_pages || total_pages <= 1) {
            return null;
        }
        
        const buttons = [];
        for (let index = Math.max(1, page - 7), last = Math.min(page + 7, total_pages); index <= last; index++) {
            const classes = ['btn btn-sm'];
            if (Math.abs(page - index) > 2) {
                classes.push('hidden-xs');
            }

            if (Math.abs(page - index) > 5) {
                classes.push('hidden-sm');
            }

            if (index === page) {
                classes.push('btn-primary');
            } else {
                classes.push('btn-default');
            }

            buttons.push(<button key={index} className={classes.join(' ')} onClick={() => this.props.setPage(index)}>{index}</button>)
        }


        return (
            <div className="row text-center"> 
                <div className="btn-group">
                    <button className="btn btn-sm btn-default" onClick={() => this.props.setPage(1)} disabled={page === 1} >&lt;&lt;</button>
                    {buttons}
                    <button className="btn btn-sm btn-default" onClick={() => this.props.setPage(total_pages)} disabled={page === total_pages} >&gt;&gt;</button>
                </div>
            </div>
        )
    }
}