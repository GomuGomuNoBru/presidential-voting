// seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


async function seed() {
	// Seed data for the Voter table
	await prisma.voter.createMany({
		data: [
			{ firstName: "John", lastName: "Doe", age: 25, email: "john@example.com", voted: false },
			{ firstName: "Alice", lastName: "Smith", age: 30, email: "alice@example.com", voted: true },

		],
	});

	// Seed data for the Candidate table
	await prisma.candidate.createMany({
		data: [
			{ firstName: "Bob", lastName: "Johnson", party: "Party A", experience: 10 },
			{ firstName: "Eve", lastName: "Williams", party: "Party B", experience: 8 },

		],
	});

	// Seed data for the Election table
	await prisma.election.createMany({
		data: [
			{ year: 2024, startDate: new Date("2024-01-01"), endDate: new Date("2024-12-31"), active: true },

		],
	});

	// Seed data for the Vote table
	await prisma.vote.createMany({
		data: [
			{ voterId: 1, candidateId: 1, electionId: 1 },
			{ voterId: 2, candidateId: 2, electionId: 1 },

		],
	});

	// Seed data for the UserProfile table
	await prisma.userProfile.createMany({
		data: [
			{ userId: 1, gender: "MALE", birthdate: new Date("1999-01-15") },
			{ userId: 2, gender: "FEMALE", birthdate: new Date("1994-05-20") },

		],
	});



	await prisma.$disconnect();
}

seed()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
