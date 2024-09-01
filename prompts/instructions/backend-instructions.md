# Backend Instructions

Use this guide for backend work in the project.

It uses Supabase, Drizzle ORM, and Server Actions.

Write the complete code for every step. Do not get lazy. Write everything that is needed.

Your goal is to completely finish whatever the user asks for.

## Steps

- new tables go in a new schema file in `/db/schema` like @example-schema.ts
  - export any new schemas in `/db/schema/index.ts` @schema/index.ts
  - add new tables to the schema in `/db/db.ts` @db.ts
- new queries go in a new queries file in `/db/queries` like @example-queries.ts
- add new actions to a new actions file in `/actions` like @example-actions.ts
- make sure to use the `ActionState` from `/types/action-types.ts` @action-types.ts
- once complete, make sure the user generates the new schema with `db:generate` and migrates it with `db:migrate`
- you may also be asked to implement frontend features, so make sure the above is complete before building out those frontend features

## Requirements

- data fetching should be done in a server component and pass the data down as props
