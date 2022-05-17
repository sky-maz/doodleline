import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

const middleware = (request: NextRequest) => {
	const shouldHandleLocale =
		!PUBLIC_FILE.test(request.nextUrl.pathname) &&
		!request.nextUrl.pathname.includes('/api/') &&
		request.nextUrl.locale === 'default';

	if (shouldHandleLocale) {
		const url = request.nextUrl.clone();
		url.pathname = `/sp${request.nextUrl.pathname}`;
		return NextResponse.redirect(url);
	}

	return undefined;
};

export default middleware;
