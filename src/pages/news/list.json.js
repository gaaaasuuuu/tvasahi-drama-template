import { directory } from '@settings';
const imgDir = `/${directory}/assets/images`;

const data = [
  {
    "title": "横画像レイアウト確認用",
    "id": "0009",
    "category": "news",
    "datetime": "2123-02-03 12:18",
    "thumbnail": `/${directory}/__dummy__/ph-dummy-yoko.jpg`,
    "categoryViewFlag": true,
    "attentionViewFlag": true,
    "target": "_self"
  },
  {
    "title": "縦画像レイアウト確認用",
    "id": "0008",
    "category": "news",
    "datetime": "2121-03-30 19:07",
    "thumbnail": `/${directory}/img/ph-dummy-tate.jpg`,
    "categoryViewFlag": true,
    "attentionViewFlag": false,
    "target": "_self"
  },
  {
    "title": "★★テスト用入稿サンプル",
    "id": "0007",
    "category": "news",
    "datetime": "2021-03-29 16:21",
    "thumbnail": `/${directory}/img/ph_760x428.jpg`,
    "categoryViewFlag": true,
    "attentionViewFlag": false,
    "target": "_self"
  },
  {
    "title": "ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。",
    "id": "0006",
    "category": "news",
    "datetime": "2021-03-25 19:00",
    "thumbnail": `/${directory}/img/ph_760x428.jpg`,
    "categoryViewFlag": true,
    "attentionViewFlag": false,
    "target": "_self"
  },
  {
    "title": "カテゴリー表示無し",
    "id": "0002",
    "category": "news",
    "datetime": "2021-02-25 17:16",
    "thumbnail": `/${directory}/img/ph_760x428.jpg`,
    "categoryViewFlag": false,
    "attentionViewFlag": false,
    "target": "_self"
  },
  {
    "title": "カテゴリー表示無し",
    "id": "0001",
    "category": "news",
    "datetime": "2021-02-25 17:16",
    "thumbnail": `/${directory}/img/ph_760x428.jpg`,
    "categoryViewFlag": false,
    "attentionViewFlag": false,
    "target": "_self"
  },
  {
    "title": "表示確認用のテストディレクトリ（0000フォルダ）にリンクします",
    "id": "0000",
    "category": "news",
    "datetime": "2021-01-14 17:18",
    "thumbnail": `/${directory}/img/ph_760x428.jpg`,
    "categoryViewFlag": true,
    "attentionViewFlag": true,
    "target": "_self"
  },
  {
    "title": "古い日付の記事（POSTの記事の間に出力されるか確認）",
    "id": "0005",
    "category": "news",
    "datetime": "2020-12-23 17:22",
    "thumbnail": `/${directory}/news/0005/images/si7dLbnOb1.jpg`,
    "categoryViewFlag": true,
    "attentionViewFlag": false,
    "target": "_self"
  }
];

export async function GET({params, request}) {
  return new Response(
    JSON.stringify(data)
  )
}
