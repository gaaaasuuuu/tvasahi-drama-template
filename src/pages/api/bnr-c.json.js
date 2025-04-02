import { directory } from '@settings';
const imgDir = `/${directory}/assets/images`;

const data = [
  {
    "img": `/${directory}/__dummy__/bnr-c.svg`,
    "url": "#",
    "class": "pc-large opac",
    "label": "Banner C",
    "blank": false
  },
  {
    "img": `/${directory}/__dummy__/bnr-c.svg`,
    "url": "#",
    "class": "opac",
    "label": "Banner C",
    "blank": false
  },
  {
    "img": `/${directory}/__dummy__/bnr-c.svg`,
    "url": "#",
    "class": "opac",
    "label": "Banner C",
    "blank": false
  },
];

export async function GET({params, request}) {
  return new Response(
    JSON.stringify(data)
  )
}
