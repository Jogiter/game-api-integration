import { baseUrl } from './config'
import { genJWTToken, genSign, md5 } from './utils'
// import { URLSearchParams } from 'url'

export enum ResponseCode {
  'success' = 200,
}

/**
 * {@link https://devdoc.y9y.com/docs/api/step3/1/ | 3.1 用户登陆G端接口}
 */
export async function authApi(
  operator: string,
  user: string,
  uid: string,
  secret: string,
  token: string,
  stamp: number
) {
  const url = `${baseUrl}/auth/access_token`
  const sign = genSign(operator, user, uid, token, stamp, secret)

  const body = new URLSearchParams({
    operator,
    user,
    uid,
    token,
    stamp: stamp.toString(),
    sign,
  }).toString()

  console.log('url', url)
  console.log('body', body)
  return fetch(url, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body,
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
  }).then((data) => data.json())
}

/**
 * {@link https://devdoc.y9y.com/docs/api/step3/2/ | 3.2 游客登陆G接口}
 */
export function tourAuth(
  operator: string,
  currency: 'USD' | 'EUR' | 'GOLD',
  lang: 'en'
) {
  const url = `${baseUrl}/tour/sample`
  const body = new URLSearchParams({
    operator,
    currency,
    lang,
  }).toString()

  console.log('url', url)
  console.log('body', body)
  return fetch(url, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body,
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
  }).then((data) => data.json())
}

/**
 * {@link https://devdoc.y9y.com/docs/api/step3/3/ | 3.3 余额查询接口}
 */
export function getBalance(
  operator: string,
  user: string,
  uid: string,
  secret: string,
  currency: 'USD' | 'EUR' | 'GOLD'
) {
  const stamp = Math.floor(Date.now() / 1000)
  const sign = md5(operator, user, uid, currency, stamp.toString(), secret)

  // 创建一个 URLSearchParams 对象
  const params = new URLSearchParams({
    operator,
    user,
    uid,
    stamp: stamp.toString(),
    currency,
    sign,
  })

  // 将查询参数添加到 URL 中
  const url = `${baseUrl}/wallet/balance?${params.toString()}`
  console.log('url', url)

  return fetch(url, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'GET',
    mode: 'cors',
    credentials: 'omit',
  }).then((data) => data.json())
}

/**
 * {@link https://devdoc.y9y.com/docs/api/step3/4/ | 3.4 转账转入G端接口}
 */
export function deposit(
  operator: string,
  user: string,
  uid: string,
  amount: string | number,
  trade_no: string,
  secret: string,
  currency: 'USD' | 'EUR' | 'GOLD'
) {
  const stamp = Math.floor(Date.now() / 1000)
  const url = `${baseUrl}/wallet/deposit`
  const sign = md5(
    operator,
    user,
    uid,
    amount.toString(),
    trade_no,
    currency,
    stamp.toString(),
    secret
  )
  const body = new URLSearchParams({
    operator,
    user,
    uid,
    amount: amount.toString(),
    trade_no,
    currency,
    stamp: stamp.toString(),
    sign,
  }).toString()

  console.log('body', body)
  return fetch(url, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body,
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
  }).then((data) => data.json())
}

/**
 * {@link https://devdoc.y9y.com/docs/api/step3/5/ | 3.5 转账转出G端接口}
 */
export function withdraw(
  operator: string,
  user: string,
  uid: string,
  amount: string | number,
  trade_no: string,
  secret: string,
  currency: 'USD' | 'EUR' | 'GOLD'
) {
  const url = `${baseUrl}/wallet/withdraw`
  const stamp = Math.floor(Date.now() / 1000)
  const sign = md5(
    operator,
    user,
    uid,
    amount.toString(),
    trade_no,
    currency,
    stamp.toString(),
    secret
  )
  const body = new URLSearchParams({
    operator,
    user,
    uid,
    amount: amount.toString(),
    trade_no,
    currency,
    stamp: stamp.toString(),
    sign,
  }).toString()

  console.log('url', url)
  console.log('body', body)
  return fetch(url, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body,
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
  }).then((data) => data.json())
}

/**
 * {@link https://devdoc.y9y.com/docs/api/step3/6/ | 3.6 转账核对接口}
 */
export function transferCheck(
  operator: string,
  trade_no: string,
  type: 'deposit' | 'withdraw',
  currency: string,
  secret: string
) {
  const url = `${baseUrl}/wallet/transfer_check`
  const stamp = Math.floor(Date.now() / 1000)
  const sign = md5(operator, trade_no, currency, type, stamp.toString(), secret)

  const body = new URLSearchParams({
    operator,
    trade_no,
    type,
    currency,
    stamp: stamp.toString(),
    sign,
  }).toString()

  console.log('url', url)
  console.log('body', body)
  return fetch(url, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body,
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
  }).then((data) => data.json())
}

/**
 * {@link https://devdoc.y9y.com/docs/api/step3/7/ | 3.7 流水查询接口（按版本 | 按时段）}
 *
 * start & end 值不为空时，按版本查询，否则按时段查询
 */
export function betStatement(
  operator: string,
  last: string,
  per: number | string,
  secret: string,
  start?: string | undefined,
  end?: string | undefined
) {
  const url = `${baseUrl}/bet/statement`
  const stamp = Math.floor(Date.now() / 1000)
  let sign, body: any
  if (start && end) {
    sign = md5(
      operator,
      per.toString(),
      start,
      end,
      last,
      stamp.toString(),
      secret
    )
    body = new URLSearchParams({
      operator,
      last,
      per: per.toString(),
      start,
      end,
      stamp: stamp.toString(),
      sign,
    }).toString()
  } else {
    sign = md5(operator, per.toString(), last, stamp.toString(), secret)
    body = new URLSearchParams({
      operator,
      per: per.toString(),
      last,
      stamp: stamp.toString(),
      sign,
    }).toString()
  }

  console.log('url', url)
  console.log('body', body)
  return fetch(url, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body,
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
  }).then((data) => data.json())
}
