import { FaDiscord, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

const ABOUT_MODAL = {
	ARIA: 'am_aria',
	INSTRUCTIONS_TITLE: 'am_instructions_title',
	INSTRUCTIONS_DESCRIPTION: 'am_instructions_description',
	INSTRUCTIONS_TYPES: [
		{ name: 'am_reference_def', desc: 'am_reference_desc' },
		{ name: 'am_structure_def', desc: 'am_structure_desc' },
		{ name: 'am_mirror_def', desc: 'am_mirror_desc' },
		{ name: 'am_strategic_def', desc: 'am_strategic_desc' },
	],
	SHORTCUTS_TITLE: 'am_shortcuts_title',
	SHORTCUTS_DESCRIPTION: 'am_shortcuts_description',
	SHORTCUTS: [
		{ key: 'am_about_modal_shortcut', shortcut: 'Tab' },
		{ key: 'am_customize_modal_shortcut', shortcut: 'Shift' },
		{ key: 'am_prev_reference_shortcut', shortcut: '&#8592;' },
		{ key: 'am_toggle_practice_shortcut', shortcut: 'Space' },
		{ key: 'am_next_reference_shortcut', shortcut: '&#8594;	' },
	],
	SOCIALS: [
		{ key: 'discord', to: '#discord', Icon: FaDiscord },
		{
			key: 'instagram',
			to: '#instagram',
			Icon: FaInstagram,
		},
		{ key: 'tiktok', to: '#tiktok', Icon: FaTiktok },
		{ key: 'youtube', to: '#youtube', Icon: FaYoutube },
	],
	COPYRIGHT: 'am_copyright',
};

export default ABOUT_MODAL;
