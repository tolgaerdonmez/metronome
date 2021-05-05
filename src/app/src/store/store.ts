import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import MetronomeReducer from "./reducers/metronome";
import AppReducer from "./reducers/app";
import { ReduxState } from "../types/redux";

const reducers = combineReducers<ReduxState>({
  metronome: MetronomeReducer,
  app: AppReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(thunk)
    // (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    //   (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const persistor = persistStore(store);

export { store, persistor };
