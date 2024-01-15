import { createStore } from "redux";
import { rootReducer } from "./redux/reducers/rootReducer";


export const store = createStore(rootReducer)