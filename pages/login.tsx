import styles from "@/styles/Login.module.css"
import {AiFillUnlock} from "react-icons/ai"
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]"


export default function Login({
  providers,
}: InferGetServerSidePropsType< typeof getServerSideProps>) {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <AiFillUnlock className={styles.icon} />
          <div className={styles.header}>
            <h1>Heltica</h1>
            <p>connecting people together</p>
          </div>
          <>
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button className= {styles.btn} onClick={() => signIn(provider.id)}>
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
          </>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}