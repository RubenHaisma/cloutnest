import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create dev creator account
  const creatorPassword = await bcrypt.hash('creator123', 10);
  const creator = await prisma.user.upsert({
    where: { email: 'creator@dev.com' },
    update: {},
    create: {
      email: 'creator@dev.com',
      name: 'Dev Creator',
      password: creatorPassword,
      role: 'CREATOR',
      emailVerified: new Date(),
    },
  });

  // Create dev company account
  const companyPassword = await bcrypt.hash('company123', 10);
  const company = await prisma.user.upsert({
    where: { email: 'company@dev.com' },
    update: {},
    create: {
      email: 'company@dev.com',
      name: 'Dev Company',
      password: companyPassword,
      role: 'COMPANY',
      emailVerified: new Date(),
    },
  });

  console.log({ creator, company });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });