"use client";
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import style from '../styles/Header.module.css'
import {  Image } from "@chakra-ui/react";
import { CgProfile } from 'react-icons/cg';
// import { useRouter } from "next/router";
import LinkHeading from '../components/headerHeading'


const Header = () => {

    const { data: session } = useSession()
    // const router = useRouter();

    return (
        <div className={style.main}>
            {/* <Box bg='white' w='100%' px={300} py={3}> */}
            <div className='flex items-center justify-center'>
                <Image
                    src='/logo.png'
                    w={'150px'}
                    h={'75px'}
                    alt='Logo'
                />
            </div>

            <div className='flex font-normal gap-5 justify-center items-center'>
                <Link href='/dashboard' className={style.link}>
                    DASHBOARD
                </Link>
                {/* <DashboardHeading /> */}
                {/* <a href={`${session?router.push('/admindashboard'):router.push('/admin')}`} className={style.link}>
                    ADMIN
                </a> */}
                {/* <LinkHeading />  */}
                <Link href='#' className={style.link}>
                    CONTACT
                </Link>
                <Link href='#' className={style.link}>
                    EXPLORE
                </Link>
            </div>
            <div className="flex items-center gap-5 justify-center" >
                {
                    session ?
                        <div>
                            <div className={style.profileIcon_div}>
                                <CgProfile className={style.profileIcon} onClick={() => signOut({ callbackUrl: "/" })}/>
                                <span >Profile</span>
                            </div>
                        </div>
                        :
                        // <button
                        //     className="bg-sky-400 text-black hover:bg-sky-600 py-2 px-4"
                        //     onClick={() => signIn()}
                        // >
                        //     Sign In
                        // </button>
                        " "
                }
                <div className='flex items-center '>
                    <button className="bg-sky-400 text-black hover:text-white" id={style.getBtn}>Get Started</button>
                    {/* <span className='text-2xl ' id={style.btnarrow}><HiOutlineArrowNarrowRight className={style.btnIcon}/></span> */}
                </div>
            </div>
            {/* </Box> */}
        </div>
    );
};

export default Header;