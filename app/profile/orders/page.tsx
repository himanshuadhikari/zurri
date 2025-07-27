"use client";
// import { redirect } from 'next/navigation';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';
// import { prisma } from '@/lib/prisma';
import ProfileEditForm from '@/components/profile/ProfileEditForm';
import OrdersPage from '@/components/profile/ProfilePage/OrdersPage';
import { useAuthStore } from '@/lib/auth-store';

export default function UserOrders() {
    const { getUser } = useAuthStore();
    const user = getUser();

    // const user = await prisma.user.findUnique({
    //     where: { id: session.user.id },
    //     select: {
    //         id: true,
    //         firstName: true,
    //         lastName: true,
    //         email: true,
    //         phone: true,
    //         dateOfBirth: true,
    //         gender: true,
    //         bio: true,
    //         profileImage: true,
    //         street: true,
    //         city: true,
    //         state: true,
    //         zipCode: true,
    //         country: true,
    //         newsletter: true,
    //         notifications: true,
    //         marketing: true,
    //         role: true,
    //         createdAt: true,
    //         updatedAt: true,
    //     },
    // });

    // if (!user) {
    //     redirect('/auth/signin');
    // }

    return <OrdersPage />;
}