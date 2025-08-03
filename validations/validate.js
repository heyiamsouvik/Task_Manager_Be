const { z } = require("zod");

const registerSchema = z.object({
  username: z.string().min(5, "Username must be at least 5 characters"),
  email: z.email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
const loginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

module.exports = { registerSchema,loginSchema };
