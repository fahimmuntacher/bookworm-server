import { connectDB } from "../../config/db";
import { getAuth } from "./auth";
import { User } from "./user.interface";
import { UserInput } from "./user.validation";

const AUTH_USERS_COLLECTION = "user";

const userRegistration = async (payload: UserInput) => {
  const db = await connectDB();
  const auth = await getAuth();

  // Create auth user
  const result = await auth.api.signUpEmail({
    body: {
      name: payload.name,
      email: payload.email,
      password: payload.password,
    },
  });
  //   console.log(result.user.id);

  // Add role to BetterAuth user
  await db.collection(AUTH_USERS_COLLECTION).updateOne(
    { id: result.user.id },
    {
      $set: {
        role: "user",
      },
    }
  );

  return {
    user: {
      ...result.user,
      role: "user",
    },
    token: result.token,
  };
};

export const userService = {
  userRegistration,
};
