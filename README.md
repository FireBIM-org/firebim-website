# firebim-website
Codebase for the official firebim.org website


## Local development

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Public ontology registry (`/documentation/ontologies/`)

The FBO ontologies, their national modules and the FBO → IFC mapping are published as versioned static files
under `public/documentation/ontologies/` and browsable at https://firebim.org/documentation/ontologies/.
The registry needs no credentials and follows the URL structure of the FireBIM API:

```
/documentation/ontologies/index.json                                   # every ontology + every version (newest first)
/documentation/ontologies/<family>/<country>/index.json                # summary (latest / stable / default version)
/documentation/ontologies/<family>/<country>/versions.json             # version list
/documentation/ontologies/<family>/<country>/versions/<v>/metadata.json
/documentation/ontologies/<family>/<country>/versions/<v>/<file>.ttl
/documentation/ontologies/<family>/<country>/versions/<v>/terms.json   # parsed terms for the viewer
/documentation/ontologies/<family>/<country>/versions/<v>/mapping.json # mapping rows (fbo/ifc only)
```

`ontologies/catalog.json` is the source of truth for *which* ontologies exist (title, namespace, visibility).
Entries with `"visibility": "unlisted"` (IFC, RIR) are only used by the FireBIM platform sync hook and are not
shown on the website.

### Publishing a new release

1. Export the ontology from Notion (Turtle files `fbo.ttl`, `fbo-dk.ttl`, …, `fbo-ifc.ttl`).
2. Normalise namespaces to `https://firebim.org/ontologies/...`, stamp the version header and copy the files
   into the version folders:

   ```bash
   npm run ontologies:prepare -- --source ../ontologies_export --version 2026.09.04 --issued 2026-09-04 --status draft
   ```

   (For a file that is already canonical, simply create
   `public/documentation/ontologies/<family>/<country>/versions/<version>/` with the `.ttl` and a `release.json`
   containing `version`, `status` and `issued_at`.)
3. Regenerate the JSON registry: `npm run ontologies:build` (also runs automatically before `npm run build` and in CI).
4. Commit and push to `main` – GitHub Pages deploys the site. The new version appears on top everywhere; older
   versions stay available at their URLs. Change the status of a release later by editing its `release.json`.

Version identifiers use `YYYY.MM` or `YYYY.MM.DD`; statuses are `draft`, `candidate`, `stable`, `deprecated`, `withdrawn`.
