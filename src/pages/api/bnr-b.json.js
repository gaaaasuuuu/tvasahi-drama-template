import { directory } from '@settings';
const imgDir = `/${directory}/assets/images`;

const data = [
  {
    "img": `/${directory}/__dummy__/bnr-b_j.svg`,
    "url": "/test_special/story/",
    "class": "opac protect",
    "blank": false
  },
  {
    "img": `/${directory}/__dummy__/bnr-b.svg`,
    "url": "#",
    "class": "opac",
    "blank": false
  },
  {
    "img": `/${directory}/__dummy__/bnr-b.svg`,
    "url": "#",
    "class": "opac",
    "blank": false
  }
];

export async function GET({params, request}) {
  return new Response(
    JSON.stringify(data)
  )
}
