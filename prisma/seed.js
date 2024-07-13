const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const toDo = [
  {
    id: 1,
    toDoItem: "Get the website working",
    description: "Solve all the issues with the website and get it working",
    completed: false,
    lastAction: "Created the seed file",
  },
  {
    id: 2,
    toDoItem: "fix checkbox",
    description: "Solve all the issues with the website and get it working",
    completed: false,
    lastAction: "Created the seed file",
  },

  {
    id: 3,
    toDoItem: "third item lol",
    description: "this is the third thing",
    completed: false,
    lastAction: "Created the seed file",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const m of toDo) {
    const toDo = await prisma.toDo.create({
      data: m,
    });
    console.log(`Created toDo with id: ${toDo.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
