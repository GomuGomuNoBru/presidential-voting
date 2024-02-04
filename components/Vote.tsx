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
  //console.log("Vote data:", vote);

  const voterName = vote.voter ? vote.voter.firstName : "Unknown man";
  const voterEmail = vote.voter ? vote.voter.email : "Unknown email";
  const voterVoted = vote.voter ? vote.voter.voted.toString() : "Unknown";

  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${vote.id}`)}>
      <h2>Voter: {voterName}</h2>
      <small>Email: {voterEmail}</small>
      <br></br>
      <small>Voted: {voterVoted}</small>

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
