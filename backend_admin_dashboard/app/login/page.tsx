"use client";

import Loading from "@/components/Loading";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="lodingdata flex flex-col flex-center wh_100">
        <Loading />
        <h1 className="mt-1">Loading...</h1>
      </div>
    );
  }

  async function handleLogin() {
    await signIn("google");
  }

  if (session) {
    return null; // Return null while redirecting
  }

  if (!session) {
    return (
      <div className="loginfront flex flex-center flex-col full-w">
        <Image src="/img/coder.png" width={250} height={250} alt="Coder" />
        <h1>Welcome Admin of the vbmblogs 👋</h1>
        <p>
          Visit our main website <a href="https://vbmcoder.in">vbmblogs</a>
        </p>
        <button onClick={handleLogin} className="mt-2">
          Login with Google
        </button>
      </div>
    );
  }
}
