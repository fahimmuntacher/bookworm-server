import { getAuth } from "./auth";
import { SignInInput } from "./user.interface";
import { UserInput } from "./user.validation";

const userRegistration = async (payload: UserInput) => {
  const auth = await getAuth();

  // Create auth user
  const result = await auth.api.signUpEmail({
    body: {
      name: payload.name,
      email: payload.email,
      image:
        payload.image ||
        "https://i.ibb.co.com/sJF5Gzmh/blank-profile-picture-973460-1280.webp",
      password: payload.password,
    },
  });

  return {
    user: {
      ...result.user,
    },
    token: result.token,
  };
};

const userSignIn = async (payload: SignInInput) => {
  const auth = await getAuth();

  const result = auth.api.signInEmail({
    body: {
      email: payload.email,
      password: payload.password,
      rememberMe: payload.rememberMe,
    },
  });

  return {
    user: (await result).user,
    token: (await result).token,
  };
};

export const userService = {
  userRegistration,
  userSignIn,
};
