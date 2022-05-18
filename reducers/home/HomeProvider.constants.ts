import { Dispatch } from 'react';

export interface IHomeSettings {
	type: string;
	timeThreshold: number;
	images: File[];
}

export interface IHomeState {
	settings?: IHomeSettings;
	current: number;
	showSettings: boolean;
	showCustomize: boolean;
	showAbout: boolean;
}

export enum HOME_ACTIONS {
	SET_SETTINGS = 'set_settings',
	UPDATE_CURRENT = 'update_current',
	TOGGLE_SETTINGS = 'toggle_settings',
	TOGGLE_CUSTOMIZE = 'toggle_customize',
	TOGGLE_ABOUT = 'toggle_about',
	RESET_HOME = 'reset_home',
}

export type THomeActions =
	| { type: HOME_ACTIONS.SET_SETTINGS; settings: IHomeSettings }
	| { type: HOME_ACTIONS.UPDATE_CURRENT; current: number }
	| { type: HOME_ACTIONS.TOGGLE_SETTINGS }
	| { type: HOME_ACTIONS.TOGGLE_CUSTOMIZE }
	| { type: HOME_ACTIONS.TOGGLE_ABOUT }
	| { type: HOME_ACTIONS.RESET_HOME };

export type THomeReducer = (
	state: IHomeState,
	action: THomeActions
) => IHomeState;

export type THomeContext = [IHomeState, Dispatch<THomeActions>];

export type TUseHomeContext = () => {
	state: IHomeState;
	dispatch: Dispatch<THomeActions>;
	setSettings: (settings: IHomeSettings) => THomeActions;
	updateCurrent: (current: number) => THomeActions;
	toggleSettings: () => THomeActions;
	toggleCustomize: () => THomeActions;
	toggleAbout: () => THomeActions;
	resetHome: () => THomeActions;
};

export const INITIAL_STATE: IHomeState = {
	settings: undefined,
	current: 0,
	showSettings: true,
	showCustomize: false,
	showAbout: false,
};

export const INITIAL_CONTEXT: THomeContext = [INITIAL_STATE, () => undefined];
