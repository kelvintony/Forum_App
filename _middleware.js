import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

const secret = 'test';

const middleware = (req) => {
	const { cookies } = req;

	const jwt = cookies.Oursite.JWT;

	console.log(jwt);
	const url = req.url;
	if (url.includes('/dashboard')) {
		if (jwt === undefined) {
			return NextResponse.redirect('/');
		}
		try {
			verify(jwt, secret);
			return NextResponse.next();
		} catch (error) {
			return NextResponse.redirect('/');
		}
	}
	return NextResponse.next();
};

export default middleware;
