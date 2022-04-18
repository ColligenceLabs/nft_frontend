const axios = require('axios');

export function getCoinPrice() {
  const url = 'https://bcn-api.talken.io/coinmarketcap/cmcQuotes?cmcIds=4256,11552';

  /**
  "data": {
    "4256": {
			"id": 4256,
			"name": "Klaytn",
			"symbol": "KLAY",
			"slug": "klaytn",
			"num_market_pairs": 97,
			"date_added": "2020-03-30T00:00:00.000Z",
			"tags": ["platform", "enterprise-solutions", "injective-ecosystem"],
			"max_supply": null,
			"circulating_supply": 2783454538.8,
			"total_supply": 10782297980.8,
			"is_active": 1,
			"platform": null,
			"cmc_rank": 45,
			"is_fiat": 0,
			"self_reported_circulating_supply": null,
			"self_reported_market_cap": null,
			"last_updated": "2022-04-18T11:36:00.000Z",
			"quote": {
				"BTC": {
					"price": 0.00002428600632057616,
					"volume_24h": 2051.9294834168245,
					"volume_change_24h": 85.2983,
					"percent_change_1h": -0.14403435,
					"percent_change_24h": -1.31327016,
					"percent_change_7d": -1.61572323,
					"percent_change_30d": -9.10844839,
					"percent_change_60d": -17.31790223,
					"percent_change_90d": -25.7714125,
					"market_cap": 67598.99452233322,
					"market_cap_dominance": 0.1457,
					"fully_diluted_market_cap": 261858.9569121609,
					"last_updated": "2022-04-18T11:37:00.000Z"
				},
				"ETH": {
					"price": 0.00032527443392012045,
					"volume_24h": 27482.501336455978,
					"volume_change_24h": 85.2983,
					"percent_change_1h": -0.11137442,
					"percent_change_24h": -0.49822108,
					"percent_change_7d": -2.26902818,
					"percent_change_30d": -14.08658873,
					"percent_change_60d": -21.54822853,
					"percent_change_90d": -24.79367,
					"market_cap": 905386.59945056,
					"market_cap_dominance": 0.1457,
					"fully_diluted_market_cap": 3507205.8720643385,
					"last_updated": "2022-04-18T11:37:00.000Z"
				},
				"KRW": {
					"price": 1170.8544860725387,
					"volume_24h": 98925727394.19835,
					"volume_change_24h": 85.2983,
					"percent_change_1h": -0.26401922,
					"percent_change_24h": -4.61274296,
					"percent_change_7d": -6.78425747,
					"percent_change_30d": -14.9748715,
					"percent_change_60d": -25.18496805,
					"percent_change_90d": -30.5927868,
					"market_cap": 3259020233532.949,
					"market_cap_dominance": 0.1457,
					"fully_diluted_market_cap": 12624501960996.174,
					"last_updated": "2022-04-18T11:36:58.000Z"
				},
				"USD": {
					"price": 0.9489429109634283,
					"volume_24h": 80176374.46777418,
					"volume_change_24h": 85.2983,
					"percent_change_1h": -0.12162915,
					"percent_change_24h": -4.63400211,
					"percent_change_7d": -6.4831119,
					"percent_change_30d": -14.9748715,
					"percent_change_60d": -25.18496805,
					"percent_change_90d": -30.5927868,
					"market_cap": 2641339452.583239,
					"market_cap_dominance": 0.1457,
					"fully_diluted_market_cap": 10231785232.78,
					"last_updated": "2022-04-18T11:36:00.000Z"
				},
				"USDT": {
					"price": 0.948661931922047,
					"volume_24h": 80152634.49292521,
					"volume_change_24h": 85.2983,
					"percent_change_1h": -0.12052116,
					"percent_change_24h": -4.63499678,
					"percent_change_7d": -6.47688282,
					"percent_change_30d": -14.96529851,
					"percent_change_60d": -25.17091894,
					"percent_change_90d": -30.59279521,
					"market_cap": 2640557360.1951985,
					"market_cap_dominance": 0.1457,
					"fully_diluted_market_cap": 10228755633.029467,
					"last_updated": "2022-04-18T11:37:00.000Z"
				},
				"XLM": {
					"price": 4.888531842977363,
					"volume_24h": 413033023.49586403,
					"volume_change_24h": 85.2983,
					"percent_change_1h": -0.79803688,
					"percent_change_24h": 0.76016706,
					"percent_change_7d": -8.73337016,
					"percent_change_30d": -14.35146801,
					"percent_change_60d": -16.11212963,
					"percent_change_90d": -9.77061601,
					"market_cap": 13607006146.403671,
					"market_cap_dominance": 0.1457,
					"fully_diluted_market_cap": 52709607019.63478,
					"last_updated": "2022-04-18T11:37:00.000Z"
				}
			}
		},
    "11552": {
			"id": 11552,
			"name": "Talken",
			"symbol": "TALK",
			"slug": "talken",
			"num_market_pairs": 9,
			"date_added": "2021-09-01T15:01:54.000Z",
			"tags": [],
			"max_supply": 500000000,
			"circulating_supply": 0,
			"total_supply": 500000000,
			"platform": {
				"id": 1027,
				"name": "Ethereum",
				"symbol": "ETH",
				"slug": "ethereum",
				"token_address": "0xcaabcaa4ca42e1d86de1a201c818639def0ba7a7"
			},
			"is_active": 1,
			"cmc_rank": 4021,
			"is_fiat": 0,
			"self_reported_circulating_supply": 111326337,
			"self_reported_market_cap": 43398595.224530526,
			"last_updated": "2022-04-18T11:36:00.000Z",
			"quote": {
				"BTC": {
					"price": 0.000009976857525978399,
					"volume_24h": 4.056524592566531,
					"volume_change_24h": 30.8115,
					"percent_change_1h": -0.00895089,
					"percent_change_24h": 2.43432536,
					"percent_change_7d": -6.37161337,
					"percent_change_30d": 0.58968977,
					"percent_change_60d": 19.7499136,
					"percent_change_90d": 5.96071935,
					"market_cap": 0,
					"market_cap_dominance": 0,
					"fully_diluted_market_cap": 4988.428762872031,
					"last_updated": "2022-04-18T11:37:00.000Z"
				},
				"ETH": {
					"price": 0.0001336249625083408,
					"volume_24h": 54.33103010486338,
					"volume_change_24h": 30.8115,
					"percent_change_1h": 0.02375322,
					"percent_change_24h": 3.28032566,
					"percent_change_7d": -6.99333759,
					"percent_change_30d": -4.91961867,
					"percent_change_60d": 13.62305877,
					"percent_change_90d": 7.35643902,
					"market_cap": 0,
					"market_cap_dominance": 0,
					"fully_diluted_market_cap": 66812.48125260111,
					"last_updated": "2022-04-18T11:37:00.000Z"
				},
				"KRW": {
					"price": 480.99503215978933,
					"volume_24h": 195569413.69343352,
					"volume_change_24h": 30.8115,
					"percent_change_1h": -0.12909807,
					"percent_change_24h": -0.99044381,
					"percent_change_7d": -11.29030097,
					"percent_change_30d": -5.90268131,
					"percent_change_60d": 8.35590597,
					"percent_change_90d": -0.92175418,
					"market_cap": 0,
					"market_cap_dominance": 0,
					"fully_diluted_market_cap": 240497516074.24588,
					"last_updated": "2022-04-18T11:36:58.000Z"
				},
				"USD": {
					"price": 0.3898322391091564,
					"volume_24h": 158503.22216228,
					"volume_change_24h": 30.8115,
					"percent_change_1h": 0.01348462,
					"percent_change_24h": -1.01251027,
					"percent_change_7d": -11.00371276,
					"percent_change_30d": -5.90268131,
					"percent_change_60d": 8.35590597,
					"percent_change_90d": -0.92175418,
					"market_cap": 0,
					"market_cap_dominance": 0,
					"fully_diluted_market_cap": 194916119.55,
					"last_updated": "2022-04-18T11:36:00.000Z"
				},
				"USDT": {
					"price": 0.3897168109969075,
					"volume_24h": 158456.28985170106,
					"volume_change_24h": 30.8115,
					"percent_change_1h": 0.01459411,
					"percent_change_24h": -1.01354271,
					"percent_change_7d": -10.99778479,
					"percent_change_30d": -5.89208689,
					"percent_change_60d": 8.37625354,
					"percent_change_90d": -0.92176618,
					"market_cap": 0,
					"market_cap_dominance": 0,
					"fully_diluted_market_cap": 194858405.49387693,
					"last_updated": "2022-04-18T11:37:00.000Z"
				},
				"XLM": {
					"price": 2.0082423213104343,
					"volume_24h": 816538.1076171855,
					"volume_change_24h": 30.8115,
					"percent_change_1h": -0.66383815,
					"percent_change_24h": 4.58650067,
					"percent_change_7d": -13.14519367,
					"percent_change_30d": -5.21276061,
					"percent_change_60d": 21.49625492,
					"percent_change_90d": 28.80172932,
					"market_cap": 0,
					"market_cap_dominance": 0,
					"fully_diluted_market_cap": 1004121160.6316324,
					"last_updated": "2022-04-18T11:37:00.000Z"
				}
			}
		},
  }
   */

  return axios
    .get(url)
    .then((response) => {
      const result = [];

      const klayUsd = response.data.4256.quote.USD.price;
      const klayKrw = response.data.4256.quote.KRW.price;
      const talkUsd = response.data.11552.quote.USD.price;
      const talkKrw = response.data.11552.quote.KRW.price

      result.push({klay: {USD: klayUsd, KRW: klayKrw}});
      result.push({talk: {USD: talkUsd, KRW: talkKrw}});

      return result;
    })
    .catch((error) =>
      error.response.status === 401 ? (window.location.href = '/auth/login') : console.log(error),
    );
}
