// const userRegistration = async (req: Request, res: Response) => {
//   try {
//     const validatedData = userSchema.parse(req.body);

//     const result = await userService.userRegistration(validatedData);

//     res.status(201).json({
//       success: true,
//       message: "User created successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // user sign in controller
// const userSignIn = async (req: Request, res: Response) => {
//   try {
//     const validatedData = signInSchema.parse(req.body);
//     const result = await userService.userSignIn(validatedData);
//     res.status(201).json({
//       success: true,
//       message: "User created successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// const userSignOut = async (req: Request, res: Response) => {
//   try {
//     const authToken = req.headers.authorization;

//     if (!authToken || !authToken.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "Authorization token is missing",
//       });
//     }

//     const token = authToken.split(" ")[1];
//     await userService.userSignOut(token);
//     res.status(200).json({
//       success: true,
//       message: "User signed out successfully",
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
export const userControllers = {};
