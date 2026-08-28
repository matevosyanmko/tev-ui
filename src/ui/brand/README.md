# Brand components

Reusable Tevvoice-branded components composed from the primitives in
`../primitives`. Empty for now.

Same structure as a primitive: one folder per component, `index.tsx` as the
published entry point, `<Name>.tsx` for the implementation, plus optional
`<Name>.types.ts` / `<Name>.variants.ts` / `<Name>.stories.tsx`.

A brand component is published as `@tev/ui/brand/<Name>` — see the `exports`
map in `package.json`. Story titles go under `Brand/*`.
