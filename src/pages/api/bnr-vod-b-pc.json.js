import { directory } from '@settings';
const imgDir = `/${directory}/assets/images`;

const data = [
  {
    "img": import.meta.env.MODE === 'production'
      ? '/commons/1/images/vod/bnr-vod-b-tver.png'
      : `/${directory}/__dummy__/bnr-vod-b-tver.png`,
    "url": "#",
    "class": "vod-analytics opac external-link",
    "blank": true
  },
  {
    "img": import.meta.env.MODE === 'production'
      ? '/commons/1/images/vod/bnr-vod-b-telasa.png'
      : `/${directory}/__dummy__/bnr-vod-b-telasa.png`,
    "url": "#",
    "class": "vod-analytics opac external-link",
    "blank": true
  }
];

export async function GET({params, request}) {
  return new Response(
    JSON.stringify(data)
  )
}
