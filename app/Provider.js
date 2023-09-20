"use client";

import { SessionProvider } from "next-auth/react";
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

export const AuthProvider = ({ children }) => {
    return (
        <>
            <CacheProvider>
                <ChakraProvider>
                    <SessionProvider>{children}</SessionProvider>
                </ChakraProvider>
            </CacheProvider>
        </>
    );
};
