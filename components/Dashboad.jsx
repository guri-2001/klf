// "use client";
import React from "react";
import style from "../styles/dashboad.module.css";
import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";
// import clientPromise from "../lib/mongo";

const Dashboard = ({ movies }) => {

    console.log(movies);

    return (
        <>
            <div className={style.main}>
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <Link className="navbar-brand" href="/userPage">
                                <Image src={'/logo.png'} alt="" height={100} width={100} style={{ height: "50px" }} />
                            </Link>
                            <div className="collapse navbar-collapse" id="navbarNav" style={{ display: "flex", justifyContent: "flex-end", marginRight: "10px" }}>
                                <ul
                                    className="navbar-nav"
                                >
                                    <li className="nav-item">
                                        <Link className="nav-link active" href="#">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" href="#">
                                            Listing
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" href="/loadPost">
                                            Post Load
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" href="#">
                                            Analytics
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            {/* <button
                                className="btn btn-primary"
                                onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
                            >
                                SignOut
                            </button> */}
                        </div>
                    </nav>
                </header>

            </div>

        </>
    );
};

export default Dashboard;


export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("facebook");

        const movies = await db
            .collection("users")
            .find({})
            // .sort({ metacritic: -1 })
            // .limit(3)
            .toArray();
        return {
            props: { movies: JSON.parse(JSON.stringify(movies)) },
        };
    } catch (e) {
        console.error(e);
    }
}