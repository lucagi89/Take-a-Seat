import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { useAuthState } from "../../hooks/useAuthState";

const withAuth = <P extends object>(Component: FC<P>) => {
  const WrappedComponent: FC<P> = (props) => {
    const router = useRouter();
    const { user, loading } = useAuthState();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/login");
      }
    }, [user, loading]);

    if (loading) {
      return <div>Loading...</div>; // Optional: Replace with a spinner or skeleton UI
    }

    return user ? <Component {...props} /> : null;
  };

  return WrappedComponent;
};

export default withAuth;
