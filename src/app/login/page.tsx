"use client"
// src/app/login/page.tsx
import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission

    setLoading(true);
    setError(null);

    try {
      console.log("Staring request")
      console.log(JSON.stringify({email, password }))
      const response = await fetch('/api/auth/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password }),

      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to Login');
      }

      setSuccess(true);
      router.push('/')
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="px-4 text-2xl font-bold mb-6 text-black">Log In!</h1>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardDescription className="text-balance text-muted-foreground" >Enter your email and password below to login</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1"
                  required
                />
                <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
              {success && <div className="text-green-500 text-sm mt-2">Login successful!</div>}
            </form>
            <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;



