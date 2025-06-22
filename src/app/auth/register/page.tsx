'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('max.mustermann@email.com');
  const [password, setPassword] = useState('passwort123');
  const [confirmPassword, setConfirmPassword] = useState('passwort123');
  const [name, setName] = useState('Max Mustermann');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    
    // Mock registration delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Set user as logged in
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify({
      name: name,
      email: email,
      id: '1'
    }));
    
    // Redirect to onboarding
    router.push('/onboarding');
  };

  return (
    <div className="min-h-screen bg-background-primary flex flex-col">
      {/* Header */}
      <Header showBackButton={true} showHomeButton={false} title="Registrieren" />

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
              Erstelle dein Konto
            </p>
          </div>

          {/* Registration Form */}
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Name
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Vollständiger Name"
                />
              </div>

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

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Passwort bestätigen
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Passwort wiederholen"
                />
              </div>

              <Button
                onClick={handleRegister}
                className="w-full h-12 text-lg font-semibold"
                variant="primary"
                isLoading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Registrieren...' : 'Registrieren'}
              </Button>
            </div>
          </Card>

          {/* Demo Info */}
          <Card className="p-4 bg-primary/10 border-primary/20">
            <div className="text-center">
              <h3 className="font-semibold text-primary mb-2">Demo-Registrierung</h3>
              <p className="text-sm text-text-secondary">
                Die Felder sind bereits ausgefüllt. 
                Einfach auf &quot;Registrieren&quot; klicken!
              </p>
            </div>
          </Card>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-text-secondary">
              Bereits ein Konto?{' '}
              <button
                onClick={() => router.push('/auth/login')}
                className="text-primary font-semibold hover:underline"
              >
                Jetzt anmelden
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}