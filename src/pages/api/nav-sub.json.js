import { directory } from '@settings';
const imgDir = `/${directory}/assets/images`;
const data = [
  {
    "title": "公式X（旧Twitter）",
    "subtitle": "",
    "url": "https://twitter.com/doctorx_tvasahi",
    "class": "",
    "blank": false
  },
  {
    "title": "エキストラ募集",
    "subtitle": "",
    "url": "#",
    "class": "",
    "blank": true
  },
  {
    "title": "関連番組放送情報",
    "subtitle": "",
    "url": "/test_special/bansen/",
    "class": "pc",
    "blank": true
  },
  {
    "title": "INTERNAL",
    "subtitle": "",
    "url": "#internal",
    "class": "",
    "blank": false
  },
  {
    "title": "別ページからINTERNAL",
    "subtitle": "",
    "url": `/${directory}/#info`,
    "class": "",
    "blank": false
  },
  {
    "title": "EXTERNAL",
    "subtitle": "",
    "url": "https://www.google.co.jp/",
    "class": "",
    "blank": false
  }
]


export async function GET({params, request}) {
  return new Response(
    JSON.stringify(data)
  )
}
