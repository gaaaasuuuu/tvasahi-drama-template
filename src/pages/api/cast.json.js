import { directory } from '@settings';

const data = [
  {
      "role": "鷲津 政彦",
      "roman": "わしづ・まさひこ",
      "cast": "綾野 剛",
      "age": "24",
      "className": "blue",
      "image": `/${directory}/cast/img/cast01.jpg`,
      "text": "外資系投資ファンド『ホライズンジャパン・パートナーズ』代表取締役。\nニューヨークに留学中、アメリカの有力買収ファンド創始者の目に留まり、ハゲタカビジネスの世界に足を踏みいれる。若くして、企業買収や債権処理で数々の実績を上げ、畏怖の念を込めて「ゴールデンイーグル」と呼ばれた。97年に日本に帰国し、『ホライズンジャパン・パートナーズ』を設立。企業を食い荒らす“ハゲタカ”と日本中からバッシングを浴びながらも、大手銀行や日本のリーディングカンパニーを相手に大胆で圧倒的な買収劇を次々と仕掛け、莫大な利益を上げていく。そこに隠された彼の本当の目的とは…。",
      "isCast": true,
      "dot": true,
      "matchPatterns": [
        ""
      ]
  },
  {
      "role": "芝野 健夫",
      "roman": "しばの・たけお",
      "cast": "渡部 篤郎",
      "age": "34",
      "className": "yellow",
      "image": `/${directory}/cast/img/cast02.jpg`,
      "text": "三葉銀行金融戦略部。",
      "isCast": true,
      "dot": false,
      "matchPatterns": [
        ""
      ]
  },
  {
      "role": "松平 貴子",
      "roman": "まつだいら・たかこ",
      "cast": "沢尻 エリカ",
      "age": "24",
      "className": "yellow",
      "image": `/${directory}/cast/img/cast03.jpg`,
      "text": "『日光みやびホテル』4代目社長。以前は『東京クラウンセンチュリーホテル』でフロントマネージャーを務めていたが、実家である『日光みやびホテル』の危機的状況を知り、支配人として戻ってきた。ホテル再建のため、父に代わって社長に就任する。",
      "isCast": true,
      "dot": false,
      "matchPatterns": [
        ""
      ]
  },
  {
      "role": "沼田 透",
      "roman": "ぬまた・とおる",
      "cast": "藤本 隆宏",
      "age": "34",
      "className": "yellow",
      "image": `/${directory}/cast/img/guest01.jpg`,
      "text": "1話のゲスト情報が入ります。",
      "isCast": false,
      "dot": false,
      "guest": [1],
      "matchPatterns": [
        ""
      ]
  },
  {
      "role": "沼田 透",
      "roman": "ぬまた・とおる",
      "cast": "藤本 隆宏",
      "age": "34",
      "className": "yellow",
      "image": `/${directory}/cast/img/guest02.jpg`,
      "text": "2話のゲスト情報が入ります。",
      "isCast": false,
      "dot": false,
      "guest": [2],
      "matchPatterns": [
        ""
      ]
  }
]


export async function GET({params, request}) {
  return new Response(
    JSON.stringify(data)
  )
}
