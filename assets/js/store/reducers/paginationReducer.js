import { expandObject } from "../../utility";

export const build_state = (page_size) => {
    return {
        all: [],
        current: [],
        page: 0,
        total_pages: 0,
        size: page_size
    }
}

export const set_page = (state, page) => {
    if (page < 1 || page > state.total_pages) {
        return state;
    }

    const first = (page - 1) * state.size;
    const last = first + state.size;

    const current = state.all.slice(first, last);
    return expandObject(state, { current: current, page: page });
}

export const set_content = (state, content = []) => {
    const total_pages = Math.ceil(content.length / state.size);
    const current = content.slice(0, state.size);
    return expandObject(state, { all: content, total_pages: total_pages, page: 1, current: current });
}

export const next_page = (state) => {
    return set_page(state.page + 1);
}

export const previous_page = (state) => {
    return set_page(state.page - 1);
}
