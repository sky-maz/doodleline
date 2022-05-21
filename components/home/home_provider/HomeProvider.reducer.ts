import {
	HOME_ACTIONS,
	INITIAL_STATE,
	THomeReducer,
} from './HomeProvider.constants';

const homeReducer: THomeReducer = (state, action) => {
	switch (action.type) {
		case HOME_ACTIONS.SET_SETTINGS:
			return { ...state, settings: action.settings };
		case HOME_ACTIONS.UPDATE_CURRENT:
			return { ...state, current: action.current };
		case HOME_ACTIONS.TOGGLE_SETTINGS:
			return { ...state, showSettings: !state.showSettings };
		case HOME_ACTIONS.TOGGLE_CUSTOMIZE:
			return { ...state, showCustomize: !state.showCustomize };
		case HOME_ACTIONS.TOGGLE_ABOUT:
			return { ...state, showAbout: !state.showAbout };
		case HOME_ACTIONS.RESET_HOME:
			return INITIAL_STATE;
		default:
			return state;
	}
};

export default homeReducer;
