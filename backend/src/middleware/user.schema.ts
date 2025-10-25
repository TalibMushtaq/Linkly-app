import * as z  from "zod";


export const userSignup = z.object({

  username: z
    .string()
    .min(5, { message: 'Username must be at least 5 characters' })
    .max(10, { message: 'Username cannot exceed 10 characters' })
    .nonempty({ message: 'Username is required' }),

  email: z
    .string()
    .max(25, { message: 'Email must be 25 characters or fewer' })
    .email({ message: 'Invalid email address' })
    .nonempty({ message: 'Email is required' }),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(16, { message: 'Password cannot exceed 16 characters' })
    .nonempty({ message: 'Password is required' }),

  fullname: z
    .string()
    .min(5, { message: 'Full name must be at least 5 characters' })
    .max(25, { message: 'Full name cannot exceed 25 characters' })
    .nonempty({ message: 'Full name is required' }),
});


export const userSignin = z.object({

  email: z
    .string()
    .email({ message: 'Invalid email' })
    .optional(),

  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .optional(),

  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})
.refine((data) => data.email || data.username, {
  message: 'Provide either email or username',
  path: ['email'],
});




export type UserSignupInputs = z.infer<typeof userSignup>;
export type UserSigninInputs = z.infer<typeof userSignin>;