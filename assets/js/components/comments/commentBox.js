import React, { Component } from "react";
import { connect } from 'react-redux';
import { saveComment } from '../../store/actions/commentActions';

class CommentBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            contentSize: 0,
        }
    }
    handleCommentChange(ev) {
        const content = ev.currentTarget.value;
        if (content.length > this.props.pageSettings.commentSizeLimit){
            return
        }

        this.setState({content: content, contentSize: content.length })
    }
    handlePostClick() {
        const comment = {
            content: this.state.content,
        }
        this.props.onSaveComment(comment)
            .then(() => { 
                this.setState({ content: "", contentSize: 0});
            }, (reason) => { 
                
            });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <textarea className="form-control no-resize" placeholder="Write your comment here" onChange={(ev) => this.handleCommentChange(ev)} value={this.state.content} />
                </div>
                <div className="col-md-12 text-right">
                    <span className="control-label"> {this.state.contentSize}/{this.props.pageSettings.commentSizeLimit} </span> 
                    <button className="btn btn-default" onClick={() => this.handlePostClick()} disabled={this.state.contentSize === 0}>Post Comment</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pageSettings: state.pageSettings
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSaveComment: (comment) => dispatch(saveComment(comment))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CommentBox);