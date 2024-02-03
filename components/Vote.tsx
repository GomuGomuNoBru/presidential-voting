import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type VoteProps = {
	id: number;
	voterId: number;
	candidateId: number;
	electionId: number;
	createdAt: Date; // Assuming createdAt is a string after serialization
	voter: {
		id: number;
		firstName: string;
		lastName: string;
		email: string;
		voted: boolean;
	};
};

const VotePost: React.FC<{ vote: VoteProps }> = ({ vote }) => {
	const voterName = vote.voter.firstName ? vote.voter.lastName : "Unknown man";
	return (
		<div onClick={() => Router.push("/vote/[id]", `/vote/${vote.id}`)}>
			<h2>Voter: {voterName}</h2>
			<small>Email: {vote.voter.email}</small>
			<br></br>
			<small>Voted: {vote.voter.voted}</small>

			{/* Additional properties as needed */}
			<style jsx>{`
				div {
					color: inherit;
					padding: 2rem;
				}
			`}</style>
		</div>
	);
};

export default VotePost;
