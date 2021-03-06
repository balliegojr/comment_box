import * as actionTypes from './actionTypes'
import { getUsers, getUser, saveUserFromAdmin } from '../../services/usersService'
import { cloneObject } from '../../utility';
import { setProgressBar } from './globalActions';

export const setLoadingUsers = (isLoading) => {
    return {
        type: actionTypes.FETCHING_USERS,
        payload: isLoading
    }
}

export const setLoadedusers = (loadedUsers) => {
    return {
        type: actionTypes.SET_LOADEDUSERS,
        payload: loadedUsers
    }
}


export const loadUsers = (userType) => dispatch => {
    dispatch(setProgressBar(true));
    dispatch(setLoadingUsers(true));

    return getUsers(userType)
        .then(users => {
            dispatch(setLoadedusers(users.data))
            dispatch(setProgressBar(false));
        }, reason => {
            dispatch(setProgressBar(false));
        });
};

const setEditingUser = (user) => {
    return {
        type: actionTypes.SET_EDITING_USER,
        payload: user
    }
}

const appendLoadedUser = (user) => {
    return {
        type: actionTypes.APPEND_LOADED_USER,
        payload: user
    }
}

export const edituser = (user_id) => (dispatch, getStore) => {
    if (!user_id) {
        dispatch(setEditingUser(null));
        return;
    }

    const filtered_users = getStore().users.pagination.all.filter((user) => user.id === user_id);
    if (!!filtered_users.length) {
        const user = cloneObject(filtered_users[0]);
        dispatch(setEditingUser(user));
    } else {
        dispatch(setProgressBar(true));

        getUser(user_id)
            .then(user => {
                dispatch(setProgressBar(false));
                dispatch(setEditingUser(user.data))
            }, reason => {
                dispatch(setProgressBar(false));
            });
    }

}

export const saveUserChangesFromAdmin = (user_info) => (dispatch) => {
    return saveUserFromAdmin(user_info)
            .then(() => { 

            });
}

export const setUsersPage = (page) => {
    return {
        type: actionTypes.SET_USERS_PAGE,
        payload: page
    }
}