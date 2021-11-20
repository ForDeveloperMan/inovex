export default({
	state() {
		return {
			loadedPage: false,
			translateSlugs: false,
			bgHome: false,
			isHome: false,
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
	},
	actions: {
	},
	modules: {
	}
})