'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, User, LogOut, Settings, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { RootState } from '../../store';
import { logout } from '../../store/slices/userSlice';
import { openModal } from '../../store/slices/uiSlice';
import { Button } from '../ui/Button';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setUserMenuOpen(false);
  };

  const handleLogin = () => {
    dispatch(openModal('login'));
  };

  const handleSignup = () => {
    dispatch(openModal('signup'));
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">TravelBooker</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/search?type=hotels" className="text-gray-700 hover:text-blue-600 font-medium">
              Hotels
            </Link>
            <Link href="/search?type=flights" className="text-gray-700 hover:text-blue-600 font-medium">
              Flights
            </Link>
            <Link href="/search?type=cars" className="text-gray-700 hover:text-blue-600 font-medium">
              Cars
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                >
                  <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                    {user?.avatar ? (
                      <Image src={user.avatar} alt="Avatar" width={32} height={32} className="h-8 w-8 rounded-full" />
                    ) : (
                      <User size={16} />
                    )}
                  </div>
                  <span className="hidden md:block font-medium">
                    {user?.firstName || 'User'}
                  </span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      href="/dashboard"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <BookOpen size={16} className="mr-2" />
                      My Bookings
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Settings size={16} className="mr-2" />
                      Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" onClick={handleLogin}>
                  Sign In
                </Button>
                <Button onClick={handleSignup}>
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              <Link href="/search?type=hotels" className="text-gray-700 hover:text-blue-600 font-medium">
                Hotels
              </Link>
              <Link href="/search?type=flights" className="text-gray-700 hover:text-blue-600 font-medium">
                Flights
              </Link>
              <Link href="/search?type=cars" className="text-gray-700 hover:text-blue-600 font-medium">
                Cars
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 