import { useEffect, useState } from "react";
import fetchData from "./api/fetchData";

import styles from "../styles/base.module.css";

export default function Home() {
	const [stories, setStories] = useState([]);

	// const sortItems = (array) => {
	// 	for (let i = 0; i < array.length; i++) {
	// 		for (let j = 0; j < array.length; j++) {
	// 			if (array[j].data.score > array[j + 1].data.score) {
	// 				let temp = array[j];
	// 				array[j] = array[j + 1];
	// 				array[j + 1] = temp;
	// 			}
	// 		}
	// 	}
	// 	return array;
	// };

	useEffect(async () => {
		setStories([]);
		const data = await fetchData();

		const sortedData = data.sort((b, a) => {
			return a.data.score - b.data.score;
		});

		setStories(sortedData);
	}, []);

	return (
		<div className={styles.container}>
			{stories.length > 1 ? (
				<div>
					<h1 className={styles.h1}>Betterhn</h1>
					<h2 className={styles.h2}>Powered by the HackerNews API</h2>
					<p>Shows top stories with at least 50 upvoates, sorted by the same</p>
					{stories.map((id) => {
						if (id.data.score > 50) {
							return (
								<div className={styles.newsitem}>
									<a href={id.data.url}>
										<h1>{id.data.title}</h1>
									</a>
									<p>{id.data.score}</p>
								</div>
							);
						} else {
							return null;
						}
					})}
				</div>
			) : (
				<div>
					Loading an insanely unoptimised website - this will take a second...
					sorry!
				</div>
			)}
		</div>
	);
}
