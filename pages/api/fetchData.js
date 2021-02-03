const fetch = require("node-fetch");
const axios = require("axios");

export default async function fetchData(req, res) {
	const { data } = await axios.get(
		"https://hacker-news.firebaseio.com/v0/topstories.json"
	);

	const spliced = data.splice(0, 200);

	const oranges = spliced.map(async (id) => {
		return await axios.get(
			`https://hacker-news.firebaseio.com/v0/item/${id}.json`
		);
	});

	const storiesArray = Promise.all(oranges).then((res) => {
		return res;
	});

	return storiesArray;
}
