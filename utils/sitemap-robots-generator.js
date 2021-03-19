const fs = require("fs");

const globby = require("globby");
const prettier = require("prettier");
const robotstxt = require("generate-robotstxt");
const { resolve } = require("path");

module.exports = async function (domain) {
  const prettierConfig = await prettier.resolveConfig(
    resolve(".prettierrc.json")
  );


  const date = new Date().toJSON();

  const pages = await globby([
    "pages/**/*{.page.tsx,.mdx}",
    "!pages/blog/[post].page.tsx",
    "!pages/_*.js",
    "!pages/api"
  ]);

  const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${pages
            .map((page) => {
              const route = page
                .replace("pages", "")
                .replace(".page.tsx", "")
                .replace(".mdx", "")
                .replace("/index", "");

              return `
                <url>
                  <loc>${`${domain}${route}`}</loc>
                  <lastmod>${date}</lastmod>
                </url>
              `;
            })
            .join("")}

      </urlset>
    `;
  const robots = await robotstxt({
    policy: [
      {
        userAgent: "*",
        allow: "/*",
        disallow: "/api/*"
      }
    ],
    sitemap: `${domain}/sitemap.xml`,
    host: domain
  });

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html"
  });

  fs.writeFileSync("public/sitemap.xml", formatted);
  fs.writeFileSync("public/robots.txt", robots);
};
