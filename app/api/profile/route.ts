import { NextRequest, NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { profileSchema } from '@/lib/validations/profile';
import { getTokenFromCookie, getUserFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = getTokenFromCookie(request);
    const token = getTokenFromCookie(request);
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userFromToken = await getUserFromToken(token);
    if (!userFromToken) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userFromToken.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        date_of_birth: true,
        gender: true,
        bio: true,
        profileImage: true,
        street: true,
        city: true,
        state: true,
        zipCode: true,
        country: true,
        newsletter: true,
        notifications: true,
        marketing: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Add computed name field for compatibility
    const userWithName = {
      ...user,
      name: `${user.firstName} ${user.lastName}`,
    };

    return NextResponse.json(userWithName);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {

    const session = getTokenFromCookie(request);
    const token = getTokenFromCookie(request);
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await getUserFromToken(token);
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    console.log("data is ====", body)
    // Validate the request body
    const validationResult = profileSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Check if email is already taken by another user
    if (data.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: data.email,
          id: { not: user.id },
        },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: 'Email is already taken' },
          { status: 400 }
        );
      }
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || null,
        date_of_birth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        gender: data.gender || null,
        bio: data.bio || null,
        profileImage: data.profileImage || null,
        street: data.street || null,
        city: data.city || null,
        state: data.state || null,
        zipCode: data.zipCode || null,
        country: data.country || null,
        newsletter: data.newsletter,
        notifications: data.notifications,
        marketing: data.marketing,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        date_of_birth: true,
        gender: true,
        bio: true,
        profileImage: true,
        street: true,
        city: true,
        state: true,
        zipCode: true,
        country: true,
        newsletter: true,
        notifications: true,
        marketing: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Add computed name field for compatibility
    const userWithName = {
      ...updatedUser,
      name: `${updatedUser.firstName} ${updatedUser.lastName}`,
    };

    return NextResponse.json(userWithName);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {

    const token = getTokenFromCookie(request);
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await getUserFromToken(token);
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }


    // Delete user account
    await prisma.user.delete({
      where: { id: user.id },
    });

    return NextResponse.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}