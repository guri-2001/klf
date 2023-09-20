"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import Image from 'next/image';
import style from '../styles/Loginin.module.css'

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                email, password, redirect: false,
            });

            if (res.error) {
                { `${setError(<div style={{ color: "red" }}>Invalid Credentials</div>)}` }
                return;
            }

            console.log(res);

            router.replace("/dashboard");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={style.main} style={{overflow:"hidden"}}>
            <div className={style.login_box}>
                <Image src="/logo.png" alt="Logo" className={style.logo} height={70} width={150} />
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="abc@gmail.com"
                                autoComplete='off'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {
                            error &&
                            <div>
                                {error}
                            </div>
                        }
                        <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: "10px" }}>Login</button>
                    </div>
                </form>
                <div className="text-center mt-3">
                    <Link href="/forget" className="text-muted">Forgot Password?</Link>
                </div>
                <div className="text-center mt-3">
                    Don&apos;t have an account? <Link href="/signup" className="text-primary">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginForm