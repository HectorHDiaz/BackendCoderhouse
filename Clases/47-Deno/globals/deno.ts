console.log(Deno.args)
console.log(Deno.env.get('PORT'))

await Deno.writeTextFile('deno.txt', 'abcd')