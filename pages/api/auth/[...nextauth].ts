import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { dbUser } from "@/database";


declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}


export const authOptions:NextAuthOptions = {

  providers: [
    // Configure one or more authentication providers
    Credentials({
      name: 'Custom login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'correo@google.com' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },
      async authorize(credentials): Promise<any> {
        // console.log({credentials})
        
        // Any object returned will be saved in `user` property of the JWT
        let user =  await dbUser.checkUserEmailPassword( credentials?.email!, credentials?.password! );
        // console.log('***** Authorize')
        // console.log({user})
        return user;
      }
    }),  
  ],

  //Custom Pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },

  session: {
    maxAge: 2592000, /// 30d
    strategy: 'jwt',
    updateAge: 86400, //cada día
  },

  // callbacks
  callbacks: {
    //todo: probar que funcione SignIn para devolver un mensaje de error si ingreso credenciales incorrectas
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log('******User:' + user);
    //   console.log('******profile:' + profile);
    //   const isAllowedToSignIn = true
    //   if (isAllowedToSignIn) {
    //     return true
    //   } else {
    //     // Return false to display a default error message
    //     return false
    //     // Or you can return a URL to redirect to:
    //     // return '/unauthorized'
    //   }
    // },

    async jwt({ token, account, user }){

      // console.log({ token, account, user })
      if( account ){
        token.accessToken = account.access_token;

        switch( account.type ){

          case 'credentials':
            token.user = user;

          break;

        }
      }


      return token;
    },


    async session({ session, token, user }){
      // console.log({ session, token, user })
      session.accessToken = token.accessToken as any;
      session.user = token.user as any;

      return session;
    },
  }
}
export default NextAuth(authOptions)