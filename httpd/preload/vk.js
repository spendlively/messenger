var id = null;
var count = 1;
var updateInterval = 3000;

const {ipcRenderer} = require('electron');
ipcRenderer.on('ping', function(ths, params){
	console.log(params);
	if(params && params.id){
		id = params.id;
	}
});


function updateBudges(){

	if(id !== null){
		ipcRenderer.sendToHost({
			id: id,
			count: count++
		});
	}
	setTimeout(updateBudges, updateInterval);
}

setTimeout(updateBudges, updateInterval);

