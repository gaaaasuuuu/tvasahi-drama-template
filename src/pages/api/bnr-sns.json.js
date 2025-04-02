import { directory } from '@settings';
const imgDir = `/${directory}/assets/images`;

const data = [
  {
    "img": `/${directory}/__dummy__/bnr_sns_x.svg`,
    "url": "#",
    "class": "opac",
    "label": "X",
    "blank": false
  },
  {
    "img": `/${directory}/__dummy__/bnr_sns_instagram.svg`,
    "url": "#",
    "class": "opac",
    "label": "instagram",
    "blank": false
  },
  {
    "img": `/${directory}/__dummy__/bnr_sns_line.svg`,
    "url": "#",
    "class": "opac",
    "label": "LINE",
    "blank": false
  },
  {
    "img": `/${directory}/__dummy__/bnr_sns_tiktok.svg`,
    "url": "#",
    "class": "opac",
    "label": "TikTok",
    "blank": false
  }
];

export async function GET({params, request}) {
  return new Response(
    JSON.stringify(data)
  )
}
