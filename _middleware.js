import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import decode from 'jwt-decode';

const secret = 'test';

const middleware = (req) => {
	// const { cookies } = req;
	// const token = req?.cookies?.access_token;
	const jwt = cookies.OursiteJWT;

	console.log('this is jwt' + jwt);

	const url = req.url;
	if (url.includes('/dashboard')) {
		if (jwt === undefined || jwt === null) {
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
