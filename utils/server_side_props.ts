import { GetServerSideProps } from 'next';
import cookies from 'next-cookies';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const data = cookies({ req });
	return {
		props: {
			cookies: req.headers.cookie ?? '',
			colorScheme: data['chakra-ui-color-scheme'] ?? 'teal',
			colorMode: data['chakra-ui-color-mode'] ?? 'dark',
		},
	};
};
