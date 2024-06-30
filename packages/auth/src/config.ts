import type {
  DefaultSession,
  NextAuthConfig,
  Session as NextAuthSession,
} from "next-auth";
import { skipCSRFCheck } from "@auth/core";
import { CosmosAdapter } from "@komit/db/auth-adapter";
import AzureAd from "next-auth/providers/azure-ad"

import { env } from "../env";

declare module "next-auth" {
  export interface Session extends DefaultSession {
    accessToken: string;
    idToken: string;
    tenantId: string;
    idp: string;
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }
}


const adapter = CosmosAdapter({
  clientOptions: {
    endpoint: env.COSMOS_DB_ENDPOINT ?? "https://localhost:8081",
    key: env.COSMOS_DB_KEY ?? ""
  },
})


export const isSecureContext = env.NODE_ENV !== "development";

export const authConfig = {
  adapter,
  // In development, we need to skip checks to allow Expo to work
  // ...(!isSecureContext
  //   ? {
  //       skipCSRFCheck: skipCSRFCheck,
  //       trustHost: true,
  //     }
  //   : {}),
  secret: process.env.AUTH_SECRET,
  providers: [
    AzureAd({
      // authorization: `https://login.microsoftonline.com/${process.env.AUTH_AD_TENANT_ID!}/oauth2/v2.0/authorize`,
      clientId: env.AUTH_AD_CLIENT_ID,
      clientSecret: env.AUTH_AD_CLIENT_SECRET,
      tenantId: env.AUTH_AD_TENANT_ID,
    }),
  ],
  callbacks: {

    jwt: async ({ token, account }) => {
      console.log("jwt callback", token, account);
      
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }

      return token;
    },
    session:async ({ session, token,user }) => {
        console.log("session callback", session, token, user);

      return {
      ...session,
      user: {
        ...session.user,
        // accessToken: token.accessToken,
        // idToken: token.idToken,
        // tenantId: token.tenantId,
        // idp: "", // Add the missing property 'idp'
        // id: token.sub,
      },
    };
    }
  },
} satisfies NextAuthConfig;

export const validateToken = async (
  token: string,
): Promise<NextAuthSession | null> => {
  const sessionToken = token.slice("Bearer ".length);
  const session = await adapter.getSessionAndUser?.(sessionToken);
  return session
    ? {
        tenantId: "",
        idp: "", // Add the missing property 'idp'
        accessToken:"",// session.session.accessToken,
        idToken:"",// session.session.idToken,
        //,sessin.session.user.id,
        user: {
          ...session.user,
          
          name: session.user.name, 
        },
        expires: session.session.expires.toISOString(),
      }
    : null;
};

export const invalidateSessionToken = async (token: string) => {
  await adapter.deleteSession?.(token);
};