import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	console.log(req.headers.cookie);

	return {
		props: {
			cookies: req.headers.cookie ?? '',
		},
	};
};
