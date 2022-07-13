
import { DenonConfig } from "https://deno.land/x/denon@2.5.0/mod.ts";
import { config as env } from "https://deno.land/std@0.146.0/dotenv/mod.ts"

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "deno run server.ts",
      desc: "run my app.ts file",
      allow: ['env', 'net'],
      env: await env(),
      importMap : './import_map.json'
    },
  },
};

export default config;