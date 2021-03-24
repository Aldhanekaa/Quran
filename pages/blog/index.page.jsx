// import { Container, Row, Col, Card } from "react-bootstrap";
import { NextSeo } from "next-seo";
// import matter from "gray-matter";
// import Link from "next/link";

// import style from "../../styles/blog/Posts.module.css";
// import "bootstrap/dist/css/bootstrap.min.css";

const title = "Our Blog | Sekilas 13";
const description =
  "Daftar tulisan blog Karya Ilmiah Remaja SMP Negeri 13 Bekasi";

export default function Blog({ data }) {
  return (
    <>
      <h1>hel</h1>
    </>
  );
}

// export async function getStaticProps() {
//   const fs = require("fs");

//   const files = fs.readdirSync(`${process.cwd()}/posts`, "utf-8");

//   const blogs = files.filter((fn) => fn.endsWith(".md"));

//   const data = blogs.map((blog) => {
//     const path = `${process.cwd()}/posts/${blog}`;
//     const rawContent = fs.readFileSync(path, {
//       encoding: "utf-8"
//     });

//     const content = matter(rawContent).data;
//     const redirect = blog.replace(".md", "");
//     return { content, redirect };
//   });

//   return {
//     props: {
//       data
//     }
//   };
// }
