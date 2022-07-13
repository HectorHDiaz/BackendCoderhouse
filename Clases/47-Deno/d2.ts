import { parse } from "https://deno.land/std@0.147.0/datetime/mod.ts";


console.log(parse("20-01-2019", "dd-MM-yyyy")); // output : new Date(2019, 0, 20)