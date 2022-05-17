export const setReader = (id: string, file?: Blob): void => {
	if (file) {
		const reader = new FileReader();

		reader.onload = ({ target }) => {
			const imgTag = document.getElementById(id);
			if (imgTag && target) imgTag.setAttribute('src', `${target.result}`);
		};

		reader.readAsDataURL(file);
	}
};
