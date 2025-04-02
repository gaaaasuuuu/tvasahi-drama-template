

import { directory } from '@settings';
const dummyAssets = `/${directory}/__dummy__`;
const isProd = import.meta.env.MODE === 'production';

const data = [
	{
		"img": isProd
			? "/commons/1/images/vod/bnr_tver.jpg"
			: `${dummyAssets}/bnr_tver.jpg`,
		"url": "#",
		"class": "vod-analytics opac external-link",
		"label": "TVer",
		"blank": true
	},
	{
		"img": isProd
		? "/telasa-bnr/all/bnr-c_after.png"
		: `${dummyAssets}/bnr-c_after.png`,
		"url": "#",
		"class": "vod-analytics opac external-link",
		"label": "TELASA",
		"blank": true
	},
	{
		"img": isProd
		? "/douga_mv/avod/images/bnr_catchup_oc.jpg"
		: `${dummyAssets}/bnr_catchup_oc.jpg`,
		"url": "#",
		"class": "vod-analytics opac",
		"label": "テレ朝動画",
		"blank": true
	},
	{
		"img": isProd
		? "/commons/1/images/vod/bnr_abema.jpg"
		: `${dummyAssets}/bnr_abema.jpg`,
		"url": "#",
		"class": "vod-analytics opac external-link",
		"label": "Abema",
		"blank": true
	}
];

export async function GET({params, request}) {
	return new Response(
		JSON.stringify(data)
	)
}


