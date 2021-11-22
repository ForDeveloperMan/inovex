export default({
	state() {
		return {
			loadedPage: false,
			translateSlugs: false,
			bgHome: false,
			isHome: false,
			openMenu: false,
		}
	},
	mutations: {
		loadedPageF(state, val) {
			state.loadedPage = val;
		},
		setTranslateSlugs(state, val) {
			state.translateSlugs = val;
		},
		bgHomeF(state, val) {
			state.bgHome = val;
		},
		isHomeF(state, val) {
			state.isHome = val;
		},
		changeMenu(state, val) {
			state.openMenu = val;
		},
	},
	actions: {
		openMenu(context) {
			context.commit('changeMenu', true);
		},
		hideMenu(context) {
			context.commit('changeMenu', false);
		},
	},
	modules: {
	}
})