import {apiKey} from './api';
import './App.css';

function AllActivities() {
	if(apiKey === undefined) {
		return (
			<div className = "AllActivities">
				API Token Undefined!
			</div>
		);
	}
	return (
		<div className="AllActivities">
			Hello, world! -{apiKey[0] + apiKey[2]}
		</div>
	);
}

export default AllActivities;