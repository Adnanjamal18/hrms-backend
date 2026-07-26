import { prisma } from './src/config/db.js';

async function main() {
  await prisma.role.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, rolename: 'ADMIN', rolecode: 1 },
  });
  await prisma.role.upsert({
    where: { id: 2 },
    update: {},
    create: { id: 2, rolename: 'USER', rolecode: 2 },
  });
  console.log('Roles seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
