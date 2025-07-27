
"use client";
import { useRef, useEffect, useState } from 'react';
import { ChevronDownIcon, CogIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/auth-store';




export default function UserHeader({ user }: any) {
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsUserDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    return (
        user?.id ? (
            <div className="relative" ref={dropdownRef} >
                <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors duration-200 p-1 rounded-md hover:bg-gray-50"
                >
                    <UserIcon className="h-6 w-6" />
                    <ChevronDownIcon className="h-4 w-4" />
                </button>

                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                        <div className="py-1">
                            {/* User Info */}
                            <div className="px-4 py-2 border-b border-gray-100">
                                <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>

                            {/* Profile Link */}
                            <Link
                                href="/profile"
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                                onClick={() => setIsUserDropdownOpen(false)}
                            >
                                <UserCircleIcon className="h-4 w-4 mr-3" />
                                My Profile
                            </Link>

                            {/* Admin Link (only show if user is admin) */}
                            {user.role === 'ADMIN' && (
                                <Link
                                    href="/admin"
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                                    onClick={() => setIsUserDropdownOpen(false)}
                                >
                                    <CogIcon className="h-4 w-4 mr-3" />
                                    Admin Dashboard
                                </Link>
                            )}

                            {/* Logout */}
                            <button
                                onClick={() => {
                                    const { logout } = useAuthStore.getState();
                                    logout();
                                    setIsUserDropdownOpen(false);
                                    window.location.href = '/';
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                            >
                                <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Sign Out
                            </button>
                        </div>
                    </div>
                )}
            </div >
        ) : (
            <Link href="/login" className="text-gray-700 hover:text-gray-900 transition-colors duration-200">
                <UserIcon className="h-6 w-6" />
            </Link>
        )

    );
}

