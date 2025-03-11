import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function syncUserWithClerk(userData: any) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userData.clerkId,
      },
    });

    if (existingUser) {
      // Update user
      return await prisma.user.update({
        where: {
          clerkId: userData.clerkId,
        },
        data: {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          updatedAt: new Date(),
        },
      });
    } else {
      // Create new user
      return await prisma.user.create({
        data: {
          clerkId: userData.clerkId,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
        },
      });
    }
  } catch (error) {
    console.error('Error syncing user with database:', error);
    throw error;
  }
}