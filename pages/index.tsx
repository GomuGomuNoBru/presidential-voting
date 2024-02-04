import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import Vote, { VoteProps } from "../components/Vote";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const vote = await prisma.vote.findMany({
      include: {
        voter: {
          select: { voted: true, firstName: true, email: true },
        },
      },
    });
    return {
      props: {
        vote: JSON.parse(JSON.stringify(vote)),
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        vote: [],
      },
    };
  }
};

type Props = {
  vote: VoteProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.vote.map((vote) => (
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

export default Blog;
