import { directory } from '@settings';
const imgDir = `/${directory}/assets/images`;
const data = [
  {
    "title": "トップ",
    "icon": `/${directory}/common-img/icon/icon_top.svg`,
    "url": `/${directory}/`,
    "class": "top opac",
    "subCategory": "",
    "blank": false
  },
  {
    "title": "ストーリー",
    "icon": `/${directory}/common-img/icon/icon_story.svg`,
    "url": `/${directory}/story/`,
    "class": "story opac",
    "subCategory": "",
    "blank": false
  },
  {
    "title": "相関図",
    "icon": `/${directory}/common-img/icon/icon_cast.svg`,
    "url": `/${directory}/cast/`,
    "class": "cast opac",
    "subCategory": "",
    "blank": false
  },
  {
    "title": "TVer/TELASA",
    "icon": `/${directory}/common-img/icon/icon_vod.svg`,
    "url": ``,
    "class": "enhanced-vod-rec opac",
    "subCategory": "vod",
    "blank": false
  },
  {
    "title": "メニュー",
    "icon": `menu`,
    "url": ``,
    "class": "menu__button",
    "subCategory": "menu",
    "blank": false
  }
];



export async function GET({params, request}) {
  return new Response(
    JSON.stringify(data)
  )
}
