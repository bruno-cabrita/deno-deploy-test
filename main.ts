import { Application } from "https://deno.land/x/oak/mod.ts";
import { Database } from 'https://deno.land/x/aloedb@0.9.0/mod.ts'

// Database -------------------------------------------------------------------

interface Animal {
  type: string;
  name: string;
  greet: string;
}

const defaultAnimal:Animal = {
  type: 'Animal',
  name: 'Undefined',
  greet: 'Silence',
};

const dbAnimals = new Database<Animal>('./database/animals.json');
const dbAnimalsIsEmpty = await dbAnimals.count() == 0;

if(dbAnimalsIsEmpty) {
  await dbAnimals.insertOne({
    type: 'Dog',
    name: 'Bob',
    greet: 'Au-au...',
  });
}
const animal: Animal = await dbAnimals.findOne({ name: 'Bob' }) || defaultAnimal;

// HTTP Server ----------------------------------------------------------------

const app = new Application();

app.use((ctx) => {
  ctx.response.body = `${animal.name}, the ${animal.type}, says "${animal.greet}"`;
});

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${hostname ??
      "localhost"}:${port}`,
  );
});

await app.listen({ port: 8001 });