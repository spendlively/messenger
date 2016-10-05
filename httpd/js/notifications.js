var notifications = {

	counter: {},

	update: function(id, cnt){

		var me = this,
			count = parseInt(cnt) || 0;

		me.counter[id] = count;

		me.updateTray();
	},

	getCount: function(){

		var me = this,
			count = 0;

		for(var c in me.counter){

			count += me.counter[c];
		}

		return count;
	},

	updateTray: function(){

		var me = this,
			messages = require('electron').remote.getGlobal('messages'),
		    ipcRenderer = require('electron').ipcRenderer;

	    messages.count = me.getCount();

	    ipcRenderer.send('update-tray');
	}

};

module.exports = notifications;
