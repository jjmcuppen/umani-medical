export const state = () => ({
	to: '/',
	from: '/'
});

export const mutations = {
	setTo(state, value) {
		state.to = value;
	},

	setFrom(state, value) {
		state.from = value;
	}
};