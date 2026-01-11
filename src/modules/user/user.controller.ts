import { Request, Response } from "express";
import { userService } from "./user.service";
import { userSchema } from "./user.validation";

const userRegistration = async (req: Request, res: Response) => {
  try {
    const validatedData = userSchema.parse(req.body);

    const result = await userService.userRegistration(validatedData);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const userControllers = {
  userRegistration,
};
