declare module "better-auth" {
  interface User {
    id?: string;
    email?: string;
    role: "user" | "admin";
    image?: string;
  }

  type BetterAuthOptions = {
    database: any;
    emailAndPassword?: {
      enabled: boolean;
      requireEmailVerification?: boolean;
    };
    trustedOrigins?: string[];
    user?: {
      additionalFields?: Record<string, any>;
    };
  };

  interface AuthAPI {
    getSession(options: { headers: Record<string, any> }): Promise<{ user: User } | null>;
    // Add other API methods like signUp, signIn, signOut if needed
  }

  export default function betterAuth(options: BetterAuthOptions): {
    api: AuthAPI;
  };
}
