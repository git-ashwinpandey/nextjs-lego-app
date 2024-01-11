import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from '@/utils/mongoose';
import userdata from '@/models/user';
import bcrypt from 'bcrypt';
require('dotenv').config();

export default NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password:  { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await userdata.findOne({ email: credentials.email });
        if (user && bcrypt.compare(credentials.password, user.password)) {
          return { id: user._id, email: user.email };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/login'
  },
});
