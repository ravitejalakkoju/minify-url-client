states = {};

function addState(id, obj, func) {
	states[id] = {
		object: obj,
		function: func
	}
}

function updateState(id, obj) {
	states[id].object = obj;
	runState(id);
}

function runState(id) {
	states[id].function(states[id].object);
}

function checkStates() {
	Object.keys(states).forEach(state => {
		runState(id);
	});
}