import { useRouter } from "next/router";
import { useEffect } from "react";
import { useWeb3 } from "../../context/Web3Context";

const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element | any => {
  const router = useRouter();
  const isBrowser = typeof window !== "undefined";
  const { connected, loading } = useWeb3();

  console.log(
    `CONNECTED ${connected} LOADING ${loading} ISBROWSER ${isBrowser}`
  );

  useEffect(() => {
    if (!isBrowser) return;
    if (!connected && !loading) {
      router.push("/welcome");
    }
  }, [isBrowser, connected, router, loading]);

  return (
    <>
      {!connected && null}
      {connected && children}
    </>
  );
};

export default ProtectedRoute;
