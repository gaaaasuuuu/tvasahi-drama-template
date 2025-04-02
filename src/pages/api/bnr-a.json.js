import { directory } from '@settings';
const imgDir = `/${directory}/assets/images`;

const data = [
  {
    // img: `${imgDir}/vod/bnr_dummy.png`,
    img: `https://placehold.jp/32px/808080/ffffff/440x100.png?text=dummy`,
    url: '#',
    class: 'vod-analytics opac external-link',
    blank: true
  },
  {
    // img: `${imgDir}/vod/bnr_dummy.png`,
    img: `https://placehold.jp/32px/808080/ffffff/440x100.png?text=dummy`,
    url: '#',
    class: 'vod-analytics opac external-link',
    blank: false
  }
];

export async function GET({params, request}) {
  return new Response(
    JSON.stringify(data)
  )
}
