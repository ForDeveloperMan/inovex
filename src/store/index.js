export default({
	state() {
		return {
			loadedPage: false,
			translateSlugs: false,
		}
	},
	mutations: {
		loadedPageF(state, val) {
			state.loadedPage = val;
		},
		setTranslateSlugs(state, val) {
			state.translateSlugs = val;
		},
	},
	actions: {
	},
	modules: {
	}
})