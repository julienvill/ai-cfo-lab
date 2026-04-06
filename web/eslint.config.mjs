import { dirname } from "path"
import { fileURLToPath } from "url"
import nextConfig from "@next/eslint-plugin-next"
import prettier from "eslint-config-prettier"

const __dirname = dirname(fileURLToPath(import.meta.url))

export default [
  {
    plugins: {
      "@next/next": nextConfig,
    },
    rules: {
      ...nextConfig.configs.recommended.rules,
      ...nextConfig.configs["core-web-vitals"].rules,
    },
  },
  prettier,
  {
    ignores: [".next/", "node_modules/"],
  },
]
