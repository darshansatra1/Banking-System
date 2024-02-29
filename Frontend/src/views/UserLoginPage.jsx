import React from "react";
import Login from "../components/forms/userForms/Login";
import { Logo } from "../components/shared/Logo";
import Footer from "../components/home/components/layout/Footer";

export const UserLoginPage = () => {
  return (
    <>
      <nav
        class="relative flex w-full items-center justify-between bg-white py-2 shadow-sm shadow-neutral-700/10 dark:bg-neutral-800 dark:shadow-black/30 lg:flex-wrap lg:justify-start"
        data-te-navbar-ref>
        <div class="flex w-full flex-wrap items-center justify-between px-6">
          <div class="flex items-center">
            <button
              class="block border-0 bg-transparent py-2 pr-2.5 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
              type="button" data-te-collapse-init data-te-target="#navbarSupportedContentY"
              aria-controls="navbarSupportedContentY" aria-expanded="false" aria-label="Toggle navigation">
              <span class="[&>svg]:w-7">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-7 w-7">
                  <path fill-rule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clip-rule="evenodd" />
                </svg>
              </span>
            </button>

            <div className="max-w-[200px]">
              <Logo bg={false} textSize="text-lg md:text-2xl lg:text-3xl" />
            </div>
          </div>

          <div class="my-1 flex items-center lg:my-0 lg:ml-auto">
            
          </div>
        </div>
      </nav>
      <div className="min-h-screen max-w-7xl w-full mx-auto flex justify-center items-center flex-col lg:flex-row gap-4 p-4 md:p-10">
        <Login />
      </div>
      <Footer />
      </>
  );
};
