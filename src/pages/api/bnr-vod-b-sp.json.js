import { directory } from '@settings';
const imgDir = `/${directory}/assets/images`;

const data = [
  {
    "img": import.meta.env.MODE === 'production'
      ? '/commons/1/images/vod/bnr-vod-b-tver_sp.png'
      : `/${directory}/__dummy__/bnr-vod-b-tver_sp.png`,
    "url": "#",
    "class": "vod-analytics opac external-link",
    "label": "TVer リアルタイム配信",
    "blank": true
  },
  {
    "img": import.meta.env.MODE === 'production'
    ? '/commons/1/images/vod/bnr-vod-b-telasa_sp.png'
    : `/${directory}/__dummy__/bnr-vod-b-telasa_sp.png`,
    "url": "#",
    "class": "vod-analytics opac external-link",
    "label": "TELASA 全話一挙配信",
    "blank": true
  }
];

export async function GET({params, request}) {
  return new Response(
    JSON.stringify(data)
  )
}
