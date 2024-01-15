import {v4 as uuidV4 } from "uuid";

const initialState = []

export const reducer = (state=initialState, action) => {
    switch(action.type){
        case "ADD_FIELD":
            return [...state, {id: uuidV4(), ...action.payload}]
        case "REMOVE_FIELD":
            return state.filter((prevState) => prevState.id !== action.payload)
        default:
            return state
    }
}