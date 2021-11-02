import {apiKey} from './api';
import './App.css';

function App() {
	if(apiKey === undefined) {
		return (
			<div className = "App">
				API Token Undefined!
			</div>
		);
	}
	return (
		<div className="App">
			Hello, world! -{apiKey[0] + apiKey[2]}
		</div>
	);
}

export default App;