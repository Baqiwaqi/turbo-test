import { useState } from "react";
import { api } from "./Api";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);

  function getBaseUrl() {
    return "http://localhost:8080";
  }

  const signIn = async () => {
    const signInUrl = `${getBaseUrl()}/api/auth/signin`;
    // const redirectTo = Linking.createURL("/login");
    // const result = await Browser.openAuthSessionAsync(
    //   `${signInUrl}?expo-redirect=${encodeURIComponent(redirectTo)}`,
    //   redirectTo
    // );
    // if (result.type !== "success") return;
    // const url = Linking.parse(result.url);
    const redirectUrl = "http://localhost:3000/taskpane.html";
    const newUrl = new URL(`${signInUrl}?expo-redirect=${encodeURIComponent(redirectUrl)}`);

    window.location.href = newUrl.href;

    const sessionToken = newUrl.searchParams.get("session_token");

    // const sessionToken = String(url.queryParams?.session_token);
    if (!sessionToken) return;

    setToken(sessionToken);
  };

  const useUser = () => {
    const { data: session } = api.auth.getSession.useQuery();
    return session?.user ?? null;
  };

  const useSignIn = () => {
    const utils = api.useUtils();
    // const router = useRouter();

    return async () => {
      await signIn();
      await utils.invalidate();
      // router.replace("/");
    };
  };

  const deleteToken = async () => {
    // const signOutUrl = `${getBaseUrl()}/api/auth/signout`;
    // const redirectTo = Linking.createURL("/login");
    // const result = await Browser.openAuthSessionAsync(
    //   `${signOutUrl}?expo-redirect=${encodeURIComponent(redirectTo)}`,
    //   redirectTo
    // );
    // if (result.type !== "success") return;
    // const url = Linking.parse(result.url);

    const url = new URL("https://turbo-test-nextjs-five.vercel.app/api/auth/signout");

    window.location.href = url.href;
  };

  const useSignOut = () => {
    const utils = api.useUtils();
    const signOut = api.auth.signOut.useMutation();
    // const router = useRouter();

    return async () => {
      const res = await signOut.mutateAsync();
      if (!res.success) return;
      await deleteToken();
      await utils.invalidate();
      // router.replace("/");
    };
  };
  return { token, setToken, signIn, useUser, useSignIn, useSignOut };
}
