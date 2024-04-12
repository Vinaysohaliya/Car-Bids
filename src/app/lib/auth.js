import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import prisma from "../api/config/prisma";

export const authOptions = {
    
    secret: process.env.NEXTAUTH_SECRET || "secret",

    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "email", type: "email", placeholder: "1231231231" },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials) {
            
            const existingUser = await prisma.user.findFirst({
                where: {
                    email: credentials.email
                }
            });
 
            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.number,
                        role:existingUser.role,
                    }
                }
                return null;
            }
          },
        })
    ],
    callbacks: {
        jwt: async ({ user, token }) => {
        if (user) {
            token.uid = user.id;
            token.role=user.role
        }
        return token;
        },
      session: ({ session, token}) => {
          if (session.user) {
              session.user.id = token.uid
              session.user.role=token.role
          }
          return session
      }
    },
  }
 