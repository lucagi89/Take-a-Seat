'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProfileForm from '../../components/forms/ProfileForm';

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupContent />
    </Suspense>
  );
}

function SignupContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const password = searchParams.get('password') || '';

  // console.log(email, password);

  return (
    <div>
      <ProfileForm email={email} password={password} />
    </div>
  );
}
