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
      profile: {
        create: {
          bio: 'Development creator account for testing',
          location: 'San Francisco, CA',
          categories: ['tech', 'lifestyle'],
          languages: ['en'],
          socialLinks: {
            instagram: '@devcreator',
            twitter: '@devcreator',
            youtube: '@devcreator'
          }
        }
      }
    }
  });

  // Create dev business account
  const businessPassword = await bcrypt.hash('business123', 10);
  const business = await prisma.user.upsert({
    where: { email: 'business@dev.com' },
    update: {},
    create: {
      email: 'business@dev.com',
      name: 'Dev Business',
      password: businessPassword,
      role: 'COMPANY',
      emailVerified: new Date(),
      profile: {
        create: {
          bio: 'Development business account for testing',
          location: 'New York, NY',
          website: 'https://devbusiness.com',
          categories: ['tech', 'marketing']
        }
      }
    }
  });

  console.log({ creator, business });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
