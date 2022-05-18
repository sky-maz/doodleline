import React, { FC, createContext, useContext, useReducer } from 'react';
import {
	INITIAL_STATE,
	INITIAL_CONTEXT,
	HOME_ACTIONS,
	THomeContext,
	TUseHomeContext,
} from './HomeProvider.constants';
import homeReducer from './HomeProvider.reducer';

const HomeContext = createContext<THomeContext>(INITIAL_CONTEXT);

export const HomeProvider: FC = ({ children }) => (
	<HomeContext.Provider value={useReducer(homeReducer, INITIAL_STATE)}>
		{children}
	</HomeContext.Provider>
);

export const useHomeContext: TUseHomeContext = () => {
	const [state, dispatch] = useContext(HomeContext);

	return {
		state,
		dispatch,
		setSettings: (settings) => ({
			type: HOME_ACTIONS.SET_SETTINGS,
			settings,
		}),
		updateCurrent: (current) => ({
			type: HOME_ACTIONS.UPDATE_CURRENT,
			current,
		}),
		toggleSettings: () => ({ type: HOME_ACTIONS.TOGGLE_SETTINGS }),
		toggleCustomize: () => ({ type: HOME_ACTIONS.TOGGLE_CUSTOMIZE }),
		toggleAbout: () => ({ type: HOME_ACTIONS.TOGGLE_ABOUT }),
		resetHome: () => ({ type: HOME_ACTIONS.RESET_HOME }),
	};
};
