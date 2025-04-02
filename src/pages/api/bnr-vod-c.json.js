

import { directory } from '@settings';
const imgDir = `/${directory}/assets/images`;

const data = [
	{
		img: import.meta.env.MODE === 'production'
			? '/telasa-bnr/all/bnr-a_after.png'
			: `/${directory}/__dummy__/bnr-a_after.png`,
		"url": "#",
		"class": "vod-analytics opac external-link",
		"label": "TELASA 1話～最新話まで全話一挙配信中！",
		"blank": true
	}
];

export async function GET({params, request}) {
	return new Response(
		JSON.stringify(data)
	)
}
