// this works only for nodejs
// import jwt from 'jsonwebtoken';
import { SignJWT } from 'jose';
// import crypto from 'crypto';
import MD5 from 'crypto-js/md5'


async function genJWTToken(
  accessSecret: string,
  openId: string,
  nickname: string,
  currentTime = Math.floor(Date.now() / 1000),
  accessExpire = 3600
) {
  const claims:any = {};
  claims['exp'] = currentTime + accessExpire;
  claims['iat'] = currentTime;
  claims['jwtOpenId'] = openId;
  claims['jwtNickname'] = nickname;
  // console.log(claims);

  // const token = jwt.sign(claims, accessSecret, { algorithm: 'HS256' });
  // return JWT.sign(claims, secretKey, { algorithm: 'HS256' });

  // ! ReferenceError: CryptoKey is not defined [#411](https://github.com/panva/jose/discussions/411)
  // Find [this article](https://developer.mozilla.org/en-US/docs/Web/API/CryptoKey) describes that CryptoKey only works in HTTPS. Adding SSL certificate just solved the issue.
  const token = await new SignJWT(claims)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(new TextEncoder().encode(accessSecret));
  /**
   * !token 不能超过 128 的长度
   */
  return token;
}

function genSign(operator: string, user: string, uid: string, token: string, stamp: string | number, secret: string) {
  // const hash = new MD5();
  // hash.update(operator);
  // hash.update(user);
  // hash.update(uid);
  // hash.update(token);
  // hash.update(stamp.toString());
  // hash.update(secret);

  // const sign = hash.digest('hex');
  // return sign;

  return MD5(operator + user + uid + token + stamp + secret).toString();
}

/**
 * md5
 */
function md5(...args: string[]) {
  // const hash = new MD5();
  // for(const arg of args) {
  //   hash.update(arg);
  // }
  // return hash.digest('hex');
  return MD5(args.join('')).toString();
}

export {
  genJWTToken,
  genSign,
  md5
};
