import { directory } from '@settings';
const imgDir = `/${directory}/assets/images`;
const data = [
  // {
  //   title: 'Top',
  //   subtitle: 'トップ',
  //   url: `/${directory}/`,
  //   class: 'top',
  //   blank: false,
  //   onlyUse: 'mobile',
  // },
  {
    title: 'NEWS',
    subtitle: 'ニュース',
    url: `/${directory}/news/`,
    class: 'news',
    update: '2.3',
    blank: false,
  },
  {
    title: 'INTRO',
    subtitle: 'イントロダクション',
    url: `/${directory}/intro/`,
    class: '',
    blank: false,
  },
  {
    title: 'STORY',
    subtitle: 'ストーリー',
    url: `/${directory}/story/`,
    class: '',
    blank: false,
  },
  {
    title: 'CAST',
    subtitle: 'キャスト',
    url: `/${directory}/cast/`,
    class: '',
    blank: false,
  },
  {
    title: 'MUSIC・\nSTAFF',
    subtitle: '主題歌・スタッフ',
    url: `/${directory}/staff/`,
    class: 'line-break',
    blank: false,
  },
  {
    title: 'ON DEMAND',
    subtitle: '見逃し配信',
    url: `#rebroadcast`,
    class: '',
    blank: false,
  }
]


export async function GET({params, request}) {
  return new Response(
    JSON.stringify(data)
  )
}
