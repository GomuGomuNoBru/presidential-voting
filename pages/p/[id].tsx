import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import prisma from "../../lib/prisma";
import { VoteProps } from "../../components/Vote";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const vote = await prisma.vote.findUnique({
      where: {
        id: 1,
      },
      include: {
        voter: {
          select: { firstName: true, lastName: true },
        },
      },
    });

    console.log("Vote data:", JSON.stringify(vote));

    return {
      props: vote,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        voter: null,
      },
    };
  }
};
const Vote: React.FC<VoteProps> = (props) => {
  if (!props.voter) {
    return (
      <Layout>
        <div>
          <p>Voter not found</p>
        </div>
      </Layout>
    );
  }

  let firstName = props.voter.firstName || "Unknown";
  let lastName = props.voter.lastName || "";

  return (
    <Layout>
      <div>
        <h2>{firstName}</h2>
        <p>By </p>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Vote;
