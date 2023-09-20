"use client";
import { signIn } from 'next-auth/react'

export default function Home() {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    flexDirection: "column",
                    backgroundColor: "rgb(241 245 249)"
                }}
            >
                <h1 style={{ fontSize: "50px", marginTop: "-50px" }}>To access the Dashboad</h1> <br />
                <button className="btn btn-primary" onClick={() => signIn()}>
                    Sign in
                </button>
            </div>
        </>
    );
}
