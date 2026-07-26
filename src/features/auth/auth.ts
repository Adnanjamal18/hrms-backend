import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../../config/db.js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    // By default, better-auth expects 'email' and 'password'
    // using the `additionalFields` or hooks during registration other fields can be added as well.
  },
  trustedOrigins: ["http://localhost:5173"],
  // Advanced: If you want to automatically sync extra fields during sign up
  user: {
    modelName: "User",
    fields: {
      name: "fullName",
    },
    additionalFields: {
      username: { type: "string" },
      mobile: { type: "string", required: false },
      roleId: { type: "number" },
    }
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user: any) => {
          return {
            data: {
              ...user,
              roleId: 2, // Dynamically assign default USER role
            }
          }
        }
      }
    }
  }
});
