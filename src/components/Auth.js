import { useSigninCheck } from 'reactfire';
import { SignInForm } from "./SignInForm";
import { Home } from "./Home";

export const Auth = () => {
  const { status, data: signinResult } = useSigninCheck();

  if (status === 'loading') {
    return <p> Loading... </p>;
  }

  const { signedIn } = signinResult;

  if (signedIn === true) {
    return <Home />;
  } 
  
  return <SignInForm />;

  
  


};