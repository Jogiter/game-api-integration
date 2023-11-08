import * as Api from './api'

/**
 * operator=AmGr0oY68J
 * user=dennis
 * uid=2023001
 * token=RirJWkgm0eUngpDJU8FrUzJMu5c7P943mKx7gHMRWidmRCpDLPIvN2kCPxQjj8E2
 */
const operator = 'AmGr0oY68J'
const user = 'dennis'
const uid = '2023001'
const secret = 'XHU2nsuozSuU5Xku'
const trade_no = 'some_trade_no'
const currency = 'GOLD'

//
const lang = 'en'

// 最近接收到的流水版本序号，0开始，结果会返回最新的
const last = ''

// 流水获取过程中分页数据量的控制, 允许每个分页数据量, 10-300
const per = 10

const gap = '==============================================================='

async function main() {
  const authRes = await Api.authApi(operator, user, uid, secret, '', Date.now())
  console.log('auth', authRes.data)
  console.log(gap)

  const tourAuthRes = await Api.tourAuth(operator, currency, lang)
  console.log('tour-auth', tourAuthRes.data)
  console.log(gap)

  // ! error { code: 500, message: 'server internal error' }
  const balanceRes = await Api.getBalance(operator, user, uid, secret, currency)
  console.log('balance', balanceRes)
  console.log(gap)

  // ! error { code: 500, message: 'server internal error' }
  const depositRes = await Api.deposit(
    operator,
    user,
    uid,
    100,
    trade_no,
    secret,
    currency
  )
  console.log('deposit', depositRes)
  console.log(gap)

  // withdraw
  const withdrawRes = await Api.withdraw(
    operator,
    user,
    uid,
    100,
    trade_no,
    secret,
    currency
  )
  console.log('withdraw', withdrawRes)
  console.log(gap)

  // transferCheck
  const transferCheckRes = await Api.transferCheck(
    operator,
    trade_no,
    'deposit',
    currency,
    secret
  )
  console.log('transferCheck', transferCheckRes)
  console.log(gap)

  // betStatement
  const betStatementRes = await Api.betStatement(
    operator,
    last,
    per,
    secret,
  )
  console.log('betStatement', betStatementRes)
  console.log(gap)
}

main()
