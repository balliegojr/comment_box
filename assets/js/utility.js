export const expandObject = (object, property) => {
    const newObject = Object.assign({}, object);
    return Object.assign(newObject, property);
}

export const cloneObject = (object) => {
    return JSON.parse(JSON.stringify(object));
}

export const queryParameters = () => {
    let match = null
    const pl = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query = window.location.search.substring(1);

    let urlParams = {};
    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);

    return urlParams;
}

export const resize_display = (source, container) => {
    var targetNode = document.getElementById(source);
    var config = { childList: true, subtree: true };

    var callback = function (mutationsList) {
        const { height } = targetNode.getBoundingClientRect();
        container.style.height = `${height + 20}px`;
    };

    var observer = new MutationObserver(callback);
    observer.observe(targetNode.firstChild, config);
}

export const redux_logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action);
            console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
};

export function handleChange(ev) {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
}

export function handleCheckedChange(ev) {
    const { name, checked } = ev.target;
    this.setState({ [name]: checked });
}

export const defaultHandleChange = (binder) => {
    return handleChange.bind(binder);
}

export const errorMessage = (reason) => reason.response ? reason.response.data : reason.message;