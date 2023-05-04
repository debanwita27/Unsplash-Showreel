/**
 *  @fileoverview A script to fetch images from the Unsplash API,
 *  and store them under `src/assets/`.
 */
import {createApi} from 'unsplash-js';
import fetch from 'node-fetch';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// ESLint complains that `process` isn't defined.
// This is because the project's ESLint configuration uses
// remotion's default configs (including tsconfig, and eslintrc).
// I'd rather not include @types/node for the entire project just for this
// one script.

// eslint-disable-next-line
const accessKey = process.env.UNSPLASH_API_KEY;
const unsplash = createApi({accessKey, fetch});

const username = 'dshap';

const result = await unsplash.users.getPhotos({username, perPage: 30});
if (result.errors) {
	throw new Error(result.errors[0]);
}
const feed = result.response;
const {results} = feed;

results.forEach(async (result, index) => {
	const url = result.urls.small;
	const resp = await fetch(url);
	if (resp.status !== 200) {
		console.error(
			`Failed to fetch resource from ${url} (status ${resp.status})`
		);
	}

	const outDir = 'public/assets/';
	resp.body.pipe(fs.createWriteStream(path.join(outDir, `photo-${index}.jpg`)));
});
