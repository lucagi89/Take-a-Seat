
import googleSignIn from "../../hooks/googleAuth";

const GoogleSignInButton = () => {
  return (
    <button onClick={googleSignIn} style={{ padding: "10px", fontSize: "16px" }}>
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
