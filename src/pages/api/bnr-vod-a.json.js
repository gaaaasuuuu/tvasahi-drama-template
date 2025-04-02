import { directory } from '@settings';
const imgDir = `/${directory}/assets/images`;

const data = [
  {
    img: `${imgDir}/vod/bnr_vod-latest-story.png`,
    url: '#',
    class: 'vod-analytics opac external-link',
    blank: true
  },
  {
    img: `${imgDir}/vod/bnr_vod-past-story.png`,
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
