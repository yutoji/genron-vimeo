import React, { Dispatch } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, Action } from 'redux';
import appReducer, { initialState, AppState, changeInitialStateWithURI, changeURIWithState, changeStateWithPathIfNeeded } from './reducer';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { VideoAction } from './actions/video';
import { Cast } from './domain/ArchiveVideo';

const store = createStore(
    appReducer as any,
    changeInitialStateWithURI(initialState) as any,
    applyMiddleware(thunkMiddleware),
);

store.subscribe(() => {
    const state = store.getState() as AppState
    changeURIWithState(state)
});

window.onpopstate = function (event) {
    changeStateWithPathIfNeeded(
        store.getState() as AppState, 
        store.dispatch as Dispatch<VideoAction>,
    );
}

const updateDocumentTitleByState = (state: AppState) => {
    const MAIN_TITLE = "ゲンロンVimeo動画一覧";
    const title = (() => {
        const selectedCast = state.selectedCast
        if (selectedCast) {
            return selectedCast.name + " | " + MAIN_TITLE;
        }
        return MAIN_TITLE;
    })();
    document.title = title;
}

store.subscribe(() => {
    updateDocumentTitleByState(store.getState() as AppState)
})
updateDocumentTitleByState(store.getState() as AppState);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
