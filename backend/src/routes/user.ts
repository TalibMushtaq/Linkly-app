import { Request, Response, NextFunction } from "express";
import express from "express";
import bcrypt from "bcrypt";
import { UserModel } from "@/model/userModel";
import {
  userSignup,
  userSignin,
  type UserSignupInputs,
  type UserSigninInputs,
} from "../middleware/user.schema";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";
import { userAuth } from "@/middleware/auth";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// User signup endpoint
router.post(
  "/signup",
  async (req: Request<{}, {}, UserSignupInputs>, res: Response) => {
    try {
      // Validate request body against schema
      const validatedData = userSignup.parse(req.body);
      const { username, fullname, email, password } = validatedData;

      // Check if user already exists
      const existingUser = await UserModel.exists({ email });
      if (existingUser) {
        return res.status(409).json({
          message: "User Already Exists",
        });
      }

      // Hash password before storing
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user in database
      await UserModel.create({
        username,
        fullname,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        message: "User Created Successfully",
      });
    } catch (error) {
      // Handle validation errors
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: error.issues,
        });
      }
      console.error("signup error:", error);
      return res.status(500).json({
        message: "Internal Server error",
      });
    }
  }
);

// User signin endpoint
router.post(
  "/signin",
  async (req: Request<{}, {}, UserSigninInputs>, res: Response) => {
    try {
      // Validate request body
      const validatedData = userSignin.parse(req.body);
      const { email, username, password } = validatedData;

      // Find user by email or username
      const user = email
        ? await UserModel.findOne({ email })
        : await UserModel.findOne({ username });

      // Check if user exists
      if (!user) {
        return res.status(404).json({
          message: "User does not exist",
        });
      }

      // Verify password
      const passwordMatch = await bcrypt.compare(password, user.password!);

      if (passwordMatch) {
        // Generate JWT token
        const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET!, {
          expiresIn: "7d",
        });

        return res.status(200).json({
          token,
          message: "You have signed in",
        });
      } else {
        return res.status(401).json({
          message: "Incorrect credentials",
        });
      }
    } catch (err) {
      // Handle validation errors
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: err.issues,
        });
      }
      // Handle other errors
      if (err instanceof Error) {
        return res.status(500).json({
          message: "Invalid request",
          error: err.message,
        });
      }
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);

router.get("/verify", userAuth, (req, res) => {
  res.json({
    valid: true,
    userId: req.userid,
  });
});

// Global error handler for the router
router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("user-Router-Level Error", err);
  res.status(500).json({
    success: false,
    message: "Router error: " + err.message,
  });
});

export default router;
