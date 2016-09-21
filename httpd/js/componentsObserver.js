var componentsObserver = {

	components: {},

	registerComponent(name, cmp){

		if(typeof this.components[name] === 'undefined'){

			this.components[name] = cmp;
		}
	},

	getComponent: function(name){
		
		if(typeof this.components[name] !== 'undefined'){

			return this.components[name];
		}

		return null;
	},

	getComponents: function(){

		return this.components;
	}
}

module.exports = componentsObserver;
