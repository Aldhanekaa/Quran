import { NextSeo } from "next-seo";
import Link from "next/link";
import { Fragment } from "react";

const title = "Signup | MTs Techno Natura";
const description =
  "Join komunitas website MTs Techno Natura sekarang! Website resmi Remaja Madrasah Tsanawiyah Technonatura Depok. Website buatan para programmer MTs.";

export default function signup() {
  return (
    <Fragment>
      <NextSeo
        title={title}
        description={description}
        canonical={process.env.PUBLIC_URL}
        openGraph={{
          url: process.env.PUBLIC_URL,
          title,
          description,
          type: "website",
          images: [
            {
              url: `${process.env.PUBLIC_URL}/ogp-img.png`,
              width: 256,
              height: 256,
              alt: "Mts Techno Natura Open Graph"
            }
          ],
          site_name: "MTs TechnoNatura"
        }}
      />
      <section className="w-full bg-white h-screen">
        <div className="mx-auto max-w-7xl h-full">
          <div className="h-full flex flex-col lg:flex-row">
            <div className="relative w-full bg-cover lg:w-6/12 xl:w-7/12 bg-gradient-to-r from-white via-white to-gray-100">
              <div className="relative flex flex-col items-center justify-center w-full h-full px-10 my-20 lg:px-16 lg:my-0">
                <div className="flex flex-col items-start space-y-8 tracking-tight lg:max-w-3xl">
                  <div className="relative">
                    <h1 className="mb-2 font-medium text-gray-700 ">
                      <Link href="/"> MTs TechnoNatura</Link> – Junior High
                      School
                    </h1>
                    <h2 className="text-5xl font-bold text-gray-900 xl:text-6xl">
                      Join and become a member.
                    </h2>
                  </div>
                  <p className="text-2xl text-gray-700">
                    Join and become one of our website member, you can post
                    blog, post news, post project, and many-many more!
                  </p>
                  <a
                    href="#_"
                    className="inline-block px-8 py-5 text-xl font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full bg-white lg:w-6/12 xl:w-5/12 h-full">
              <div
                className="flex flex-col 
items-center justify-center  w-full h-full p-10 lg:p-16 xl:p-24 
"
              >
                <h4 className="w-full text-3xl font-bold">Signup</h4>
                <p className="text-lg text-gray-500 mt-5">
                  or, if you have an account you can{" "}
                  <Link href="login">
                    <a className="text-blue-600 underline">sign in</a>
                  </Link>
                </p>
                <div className="relative w-full mt-10 space-y-8">
                  <div className="relative">
                    <label className="font-medium text-gray-900">Name</label>
                    <input
                      type="text"
                      className="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                      placeholder="Enter Your Name"
                    />
                  </div>
                  <div className="relative">
                    <label className="font-medium text-gray-900">Email</label>
                    <input
                      type="text"
                      className="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                      placeholder="Enter Your Email Address"
                    />
                  </div>
                  <div className="relative">
                    <label className="font-medium text-gray-900">
                      Password
                    </label>
                    <input
                      type="password"
                      className="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                      placeholder="Password"
                    />
                  </div>
                  <div className="relative">
                    <p className="text-gray-700 mb-5">
                      By creating account you agreed to our privacy policy and
                      the terms of use
                    </p>
                    <a
                      href="#_"
                      className="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease"
                    >
                      Create Account
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
