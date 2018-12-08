import jwtDecode from 'jwt-decode';

const cookieparser = require('cookieparser');

export const getUserFromCookie = req => {
  if (!req.headers.cookie) return;

  if (req.headers.cookie) {
    const parsed = cookieparser.parse(req.headers.cookie);
    const accessTokenCookie = parsed.access_token;
    if (!accessTokenCookie) return;

    const decodedToken = jwtDecode(accessTokenCookie);
    if (!decodedToken) return;

    return decodedToken;
  }
};
