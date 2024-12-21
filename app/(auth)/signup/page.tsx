'use client';
import ProfileForm from '../../components/forms/ProfileForm';
import { useSearchParams } from 'next/navigation';

export default function CompleteProfilePage() {
 const searchParams = useSearchParams();
 const email = searchParams.get('email') || null;
 const password = searchParams.get('password') || null;
 console.log(email, password);

  return (
    <div>
      <h1>One More Step</h1>
      <p>Complete your profile to find your seat</p>
      <ProfileForm email={email} password={password}/>
    </div>
  );
}
