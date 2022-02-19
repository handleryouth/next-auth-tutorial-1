import { useSession, signOut, getSession } from "next-auth/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  /*
The useSession hook provides the session data and the 
authentication status. There are three possible statutes 
— loading, authenticated, and unauthenticated .
  */
  const { data: session, status } = useSession({
    // The session data is stored in the cookie.

    /*
    example below is used to protecting the page 
    from unauthorized access/users.
    
    another way to protect the page is to use serversideprops or
     middleware from nextjs. example below
    */

    required: true,
    onUnauthenticated: () => {
      router.push("/api/auth/signin");
    },
  });
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return (
      <>
        Signed in as {session.user!.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col">
        <span>Not signed in</span>
        <span
          className="text-red-500 cursor-pointer"
          onClick={() => router.push("/api/auth/signin")}
        >
          click here to login
        </span>
      </div>
    );
  }

  return <div>Hello world</div>;
};

/*
to read the authentication status from the server, we can add getSession method to getserversideprops.

useSession and getSession are 2 different things. from client side, useSession is used to get the session data.

from server side, getSession is used to get the session data.

example getSession below:

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  console.log(session);

  return {
    props: {
      session,
    },
  };
};


getSession can also be used in the API routes. but instead of passing the context, we pass the request "req".

export default async function handle (req, res) {
  const session = await getSession({req})
  console.log({session})
  res.status(200).json({session})

}

*/

// WAY OF PROTECTION PAGES
// 1. SERVERSIDE-WAY
/*
we can simply use the getSession method and use redirects inside getServerSideProps.
export const getServerSideProps = async (ctx) => {
  //check if the user is authenticated from the server
  const session = await getSession(ctx);
  if(!session){
    return{
      redirect: {
        permanent: false,
        destination: '/api/auth/signin'
      },
      props: {}
    }
  }
  return {
    props: {
      session
    }
  }


}

//2. MIDDLEWARE-WAY
/*

The example below is a middleware that is created at /pages/protected/_middleware.js . This middleware will 
protect all the pages under the /protected route.

read more about middleware in the nextjs documentation.

*/

/*
  import {getToken} from "next-auth/jwt"
  import {NextResponse} from "next/server"

  export async function middleware (req){
    const session = await getToken({
      req,
      secret: process.env.SECRET,
      secureCookie: process.env.NEXTAUTH_URL?.startsWith("https://")

    })

    if(!session) return NextResponse.redirect('/api/auth/signin')

  }


/*

*/

export default Home;
