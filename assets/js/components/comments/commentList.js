import React from "react";
import Comment from "./comment";
import * as commentActions from "../../store/actions/commentActions";
import { connect } from "react-redux";

export class CommentList extends React.Component {
    componentDidMount() {
        this.props.onLoadComments();
    }


    render() {
        if (this.props.comments.loadedComments.length === 0) {
            return (
                <ul className="comments alert alert-info text-center">
                    There are no comments yet
                </ul>
            )
        }

        const comments = this.props.comments.loadedComments.map((comment) => (<Comment key={comment.id} comment={comment} />))
        return (
            <div className="comments">
                <span> Comments: {comments.length}</span>
                <hr/>
                <ul >
                    {comments}
                </ul>
            </div>
        )
    }
    
}


const mapStateToProps = state => {
    return {
        comments: state.comments
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadComments: () => dispatch(commentActions.loadComments())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);