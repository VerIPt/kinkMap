'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('max.mustermann@email.com');
  const [password, setPassword] = useState('passwort123');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    
    // Mock login delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Set user as logged in (you can use localStorage, context, etc.)
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify({
      name: 'Max Mustermann',
      email: 'max.mustermann@email.com',
      id: '1'
    }));
    
    // Redirect to main app
    router.push('/app-main');
  };

  return (
    <div className="min-h-screen bg-background-primary flex flex-col">
      {/* Header */}
      <Header showBackButton={true} showHomeButton={false} title="Anmelden" />

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div className="max-w-sm mx-auto w-full space-y-6">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary to-primary-700 bg-clip-text text-transparent">
                kinkMap
              </span>
            </h1>
            <p className="text-text-secondary">
              Willkommen zurück!
            </p>
          </div>

          {/* Login Form */}
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  E-Mail
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-Mail eingeben"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Passwort
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Passwort eingeben"
                />
              </div>

              <Button
                onClick={handleLogin}
                className="w-full h-12 text-lg font-semibold"
                variant="primary"
                isLoading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Anmelden...' : 'Anmelden'}
              </Button>
            </div>
          </Card>

          {/* Demo Info */}
          <Card className="p-4 bg-primary/10 border-primary/20">
            <div className="text-center">
              <h3 className="font-semibold text-primary mb-2">Demo-Zugangsdaten</h3>
              <p className="text-sm text-text-secondary">
                Die Felder sind bereits mit Demo-Daten ausgefüllt. 
                Einfach auf &quot;Anmelden&quot; klicken!
              </p>
            </div>
          </Card>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-text-secondary">
              Noch kein Konto?{' '}
              <button
                onClick={() => router.push('/auth/register')}
                className="text-primary font-semibold hover:underline"
              >
                Jetzt registrieren
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}