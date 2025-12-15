import { codeToHtml } from "shiki";

export async function highlightCode(
  code: string,
  lang: string = "text",
  theme: "dark" | "light" = "dark"
) {
  return await codeToHtml(code, {
    lang,
    theme: theme === "dark" ? "github-dark" : "github-light",
  });
}
