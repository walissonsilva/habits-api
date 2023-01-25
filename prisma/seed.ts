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
    prisma.habit.create({
      data: {
        id: thirdHabitId,
        title: "Dormir 8h",
        created_at: thirdHabitCreationDate,
        weekDays: {
          create: [
            { week_day: 0 },
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 },
            { week_day: 6 },
          ],
        },
      },
    }),
  ]);

  await Promise.all([
    prisma.day.create({
      data: {
        date: new Date("2023-01-02T03:00:00.000"),
        dayHabits: {
          create: {
            habit_id: firstHabitId,
          },
        },
      },
    }),

    prisma.day.create({
      data: {
        date: new Date("2023-01-06T03:00:00.000"),
        dayHabits: {
          create: {
            habit_id: firstHabitId,
          },
        },
      },
    }),

    prisma.day.create({
      data: {
        date: new Date("2023-01-04T03:00:00.000"),
        dayHabits: {
          create: [{ habit_id: firstHabitId }, { habit_id: secondHabitId }],
        },
      },
    }),
  ]);
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
