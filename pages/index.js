import { useEffect, useState } from "react";
import fetchData from "./api/fetchData";

export default function Home() {
	const [stories, setStories] = useState([]);

	useEffect(async () => {
		setStories([]);
		const data = await fetchData();

		setStories(data);
	}, []);

	return (
		<div>
			{stories.length > 1 ? (
				<div>
					{stories.map((id) => {
						if (id.data.score > 100) {
							return (
								<div>
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
				<div>Loading</div>
			)}
		</div>
	);
}
