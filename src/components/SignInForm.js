import { useState } from 'react';
import { useAuth } from 'reactfire';
import { signIn } from "../services/signIn";

export const SignInForm = () => {
  

  const auth = useAuth();

  return <button onClick={() => signIn(auth).then}>Sign in with Google</button>;


};
