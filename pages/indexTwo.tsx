// pages/index.js
import React from "react";
import prisma from "../lib/prisma";
import Vote, { VoteProps } from "../components/Vote";
import Layout from "../components/Layout";

export async function getStaticProps() {
	try {
		const data = await prisma.vote.findMany({
			where: { id: 1 },
			include: {
				voter: {
					select: { voted: true },
				},
			},
		});
		return {
			props: {
				data: JSON.parse(JSON.stringify(data)),
			},
			revalidate: 10,
		};
	} catch (error) {
		console.error("Error fetching data:", error);
		return {
			props: {
				data: [],
			},
		};
	}
}

type Props = {
	data: VoteProps[];
};
const Blog: React.FC<Props> = (props) => {
	return (
		<Layout>
			<div className="page">
				<h1>Public Feed</h1>
				<main>
					{props.data.map((vote) => (
						<div key={vote.id} className="vote">
							<Vote vote={vote} />
						</div>
					))}
				</main>
			</div>
			<style jsx>{`
				.vote {
					background: white;
					transition: box-shadow 0.1s ease-in;
				}

				.vote:hover {
					box-shadow: 1px 1px 3px #aaa;
				}

				.vote + .vote {
					margin-top: 2rem;
				}
			`}</style>
		</Layout>
	);
};

const Home = ({ data }) => {
	return (
		<div>
			<h1>Prisma Data on Website</h1>
			<ul>
				{data.map((item) => (
					<li key={item.id}>{JSON.stringify(item)}</li>
				))}
			</ul>
		</div>
	);
};

export default Blog;
