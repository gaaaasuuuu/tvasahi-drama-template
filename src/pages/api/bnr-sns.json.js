import { directory } from '@settings';
const imgDir = `/${directory}/assets/images`;

const data = [
  {
    "img": `/${directory}/img/bnr_x.png`,
    "url": "#",
    "class": "opac",
    "label": "X",
    "blank": false
  },
  {
    "img": `/${directory}/img/bnr_instagram.png`,
    "url": "#",
    "class": "opac",
    "label": "instagram",
    "blank": false
  },
];

export async function GET({params, request}) {
  return new Response(
    JSON.stringify(data)
  )
}
