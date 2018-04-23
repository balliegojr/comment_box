import React from "react";
import { Comment } from "../../components/comments/comment";
import { connect } from "react-redux";

const comentList = (props) => {
    if (props.comments.loadedComments.length === 0) {
        return (
            <ul className="comments">
                There are no comments yet
                </ul>
        )
    }

    const comments = props.comments.loadedComments.map((comment) => (<Comment comment={comment} />))
    return (
        <ul className="comments">
            {comments}
        </ul>
    )
}


const mapStateToProps = state => {
    return {
        comments: state.comments
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // onIncrementCounter: () => dispatch(actionCreators.increment()),
        // onDecrementCounter: () => dispatch(actionCreators.decrement()),
        // onAddCounter: () => dispatch(actionCreators.add(10)),
        // onSubtractCounter: () => dispatch(actionCreators.subtract(15)),
        // onStoreResult: (result) => dispatch(actionCreators.storeResult(result)),
        // onDeleteResult: (id) => dispatch(actionCreators.deleteResult(id))
    }
};

export default connect(mapStateToProps)(comentList);