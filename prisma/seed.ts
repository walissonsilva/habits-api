import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const firstHabitId = "b7a533f0-3309-4f7b-b8b3-607b43a7d0e2";
const firstHabitCreationDate = new Date("2022-12-31T03:00:00.000");

const secondHabitId = "2b590f94-7305-43c5-80fb-4db53ba2143a";
const secondHabitCreationDate = new Date("2023-01-03T03:00:00.000");

const thirdHabitId = "d2cbd271-7485-4181-87f5-e45bf39adc42";
const thirdHabitCreationDate = new Date("2023-01-08T03:00:00.000");

async function main() {
  await prisma.habit.deleteMany();
  await prisma.day.deleteMany();

  await Promise.all([
    prisma.habit.create({
      data: {
        id: firstHabitId,
        title: "Beber 2L de água",
        created_at: firstHabitCreationDate,
        weekDays: {
          create: [{ week_day: 1 }, { week_day: 2 }, { week_day: 3 }],
        },
      },
    }),
    prisma.habit.create({
      data: {
        id: secondHabitId,
        title: "Academia",
        created_at: secondHabitCreationDate,
        weekDays: {
          create: [
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 },
          ],
        },
      },
    }),
  ]);

  await prisma.habit.create({
    data: {
      title: "Beber 3L de água",
      created_at: new Date("2023-01-24T23:51:00.000z"),
    },
  });
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
