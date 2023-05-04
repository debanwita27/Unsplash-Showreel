# Showreel sample for Unsplash profile.

A showreel showcasing the unsplash profile of Daniel Shapiro, made using Remotion and TypeScript.

## Approach

<!-- TODO -->

### Challenges
  - <!-- cutout ??? -->
  - <!-- sync with audio ??? -->
  - <!-- How do I manage timing of every sequence without using too many magic numbers ??? -->

## Build Instructions

To run this project locally, you will need NodeJS >= 18.0.0 (we use ESM in a script),
and a package manager (npm/pnpm/yarn).

1. First, clone the repository, cd to it's root and install dependencies:
```sh
$ git clone https://github.com/debanwita27/Unsplash-Showreel
$ cd Unsplash-Showreel
$ npm install
```

2. Next, we need to download the assets used in the video by running a script (`scripts/fetch-assets.mjs`):  
   Ensure that:
      - You have Node v18 or higher (Since we use the builtin `fetch`, top-level `await`, and ESM imports).
      - You're in the root directory of the project.
```sh
  $ node ./scripts/fetch-assets.mjs
```

3. Now, you can preview the video in the browser using:
```sh
$ npm start
```

4. To render the final MP4 output:
```sh
$ npm run build
```
