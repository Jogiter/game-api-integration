// const base = 'https://games.yygamesentrance.com'
const base = 'http://192.168.50.143:5174'

/**
 * 小飞机：/aviator
 * 扫雷：/mines
 * 弹珠：/plinko
 * 小转盘：/mini-roulette
 * keno：/keno
 * hilo：/hi-lo
 * hotline：/hotLine
 * goal：/goal
 * dice：/dice
 * roulette: /roulette
 */
export const gamePathMap = {
  Mines: '/mines',
  Dice: '/dice',
  Keno: '/keno',
  Hilo: '/hi-lo',
  Goal: '/goal',
  Plinko: '/plinko',
  Hotline: '/hotLine',
  Aviator: '/aviator',
  // Roulette: '/roulette',
}

// 菲律宾比索PHP，越南盾VND，雷亚尔BRL，卢比INR，和金币GOLD
export type ICurrency = 'USD' | 'EUR' | 'GOLD' | 'PHP' | 'VND' | 'BRL' | 'INR'

// 英文en, 西班牙语es, 越南语vi
export type ILang = 'en' | 'vi' | 'es'

// desktop,ios,android, harmony
export type IDeviceType = 'android' | 'ios' | 'desktop' | 'harmony'

export interface GameIframeParams {
  lang: ILang;
  currency: ICurrency
  deviceType: string;
  userName: string;
  token: string;
  name: keyof typeof gamePathMap;
  isDemo?: string;
  sessionToken: string;
  gToken?: string;
}

const gameId = {
  'Mines': 'xQMgmQpgl5',
  'Dice': 'PWnByQNBLA',
  'Keno': 'x6VdazYrPp',
  'Hilo': '3Nqr10Adoj',
  'Goal': '2Opr7YWBDQ',
  'Plinko': 'w40BvQ7gYe',
  'Hotline': '7JbrE8kdy9',
  'Aviator': 'WOng6JNgKZ',
  // 'Mini+Roulette': 'PXqdN8qgv3',
  // 'Roulette+Big': 'zj5r0ElgDl',
  // 'scratch+off': '1Y3r5xWdxZ',
}

export type IGameNames = keyof typeof gameId

export type GameIframe = typeof gamePathMap & GameIframeParams

// https://xxx.yygamesentrance.com/mines?lang=en&currency=GOLD&deviceType=android&userName=91&token=edJnZYAmRdCbCBrIxk7vxMn40XPz3wlo&Mines=xQMgmQpgl5&Dice=PWnByQNBLA&Mini+Roulette=zAmB45edv1&Keno=x6VdazYrPp&Hilo=3Nqr10Adoj&Goal=2Opr7YWBDQ&Plinko=w40BvQ7gYe&Hotline=7JbrE8kdy9&Aviator=WOng6JNgKZ&name=mines&isDemo=1&sessionToken=OtElX0rqjpwfgUTNhYa83G3NmbNrthIJRybSJ4vD0py6q5y4uwJQES91lnQTXEyb&gToken=edJnZYAmRdCbCBrIxk7vxMn40XPz3wlo
export function getGameIframe({ lang, currency, deviceType, userName, token, name, isDemo, sessionToken, gToken }: GameIframeParams) {
  const params = new URLSearchParams({
    lang,
    currency,
    deviceType,
    userName,
    token,
    // isDemo,
    sessionToken,
    name,
    // gToken,
    // ...gamePathMap,
    ...gameId,
  })
  const url = `${base}${gamePathMap[name]}?${params.toString()}`
  return url
}