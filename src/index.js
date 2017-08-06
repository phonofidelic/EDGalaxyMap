import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';
import WebfontLoader from '@dr-kobros/react-webfont-loader';

const inspector = window.window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const store = createStoreWithMiddleware(rootReducer, inspector);

const config = {
	google: {
		families: ['Saira:300,400', 'Saira Condensed:300']
	}
}

ReactDOM.render(
	<Provider store={store}>
		<WebfontLoader config={config}>
			<App />
		</WebfontLoader>
	</Provider>, 
	document.getElementById('root')
);
registerServiceWorker();
