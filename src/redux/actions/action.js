
export const ADD_FIELDS = (payload) => {
    return {
        type: "ADD_FIELD",
        payload
    }
}

export const REMOVE_FIELDS = (id) => {
    return {
        type: "REMOVE_FIELD",
        payload: id
    }
}



