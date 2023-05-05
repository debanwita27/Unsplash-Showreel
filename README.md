# Showreel sample for Unsplash profile.

A showreel showcasing the Unsplash profile of Daniel Shapiro, made using Remotion and TypeScript.

## Contents
- [Final Result](#final-result)
- [Approach](#approach)
  - [Design and Technical Decisions](#design-and-technical-decisions)
  - [Challenges](#challenges)
- [Build Instructions](#build-instructions)

## Final Result
  This is a GIF of the video. The actual video has audio included in it.
  <img src="./public/assets/video.gif"/>

## Approach

There were three approaches I had in mind initially -
- Creating an animation sequence in the browser and finding a way to [programmatically screen-record](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_Screen_Capture) it
- Using a JSON ⇒ video converter like [Shotstack](https://shotstack.io)
- Using a video editing library like [Remotion](https://www.remotion.dev/docs)

I ended up choosing Remotion since screen capturing would be added work and using a JSON template limits creative liberty (unless we're ready to write thousands of lines of JSON).

### Design and Technical Decisions

- **Choosing a theme**  
The first challenge was deciding the kind of profile I wanted to showcase and the background score. I decided to go with [Daniel Shapiro's](https://unsplash.com/dshap) pictures because of his almost-monochrome style of shots that aren't too loud. This allowed me to pair it with a poppy soundtrack and a snappy video style with quick cuts and a lot of colors to balance out the monochrome pictures.
- **Animation sequence**  
I had to leave the viewer with a clear message in a short span of 15 seconds, while also showcasing the photographer's profile. I had to find a sweet-spot between 1) fewer, but longer sequences, and 2) many short sequences. I ended up choosing four 3 second long sequences, as I felt it just short enough to not be boring, while still being long enough to convey the idea.  
The `ImageStack` and `Carousel` sequences were planned from the beginning. However, planning the third sequence proved to be a challenge. I had to scrape off the idea of showcasing images through a cutout of text. The reason has been elaborated in the [Challenges](#challenges) section.  
I re-planned the third sequence and decided to go with a fast-paced reel of changing images.
- **Stylistic choices in presentation**  
Since the photographs mostly revolved around the theme of travelling - mountains, monuments, deserts, vehicles, etc., I wanted the images to look like Polaroids. The textured backdrop in the beginning and at the end aims to create the feel of keeping the images on a wall/table-top. Overall, I wanted the showreel to elicit the excitement of planning a trip.
- **Preloading assets**  
Fetching images and the audio track (even from the local directory) was creating rendering issues since the initial sequence needs a lot of pictures to load one after the other. I decided to preload all assets at the beginning itself.

### Challenges
  - **Using cutout text**   
  Remotion doesn't allow URLs in the style attribute. Instead, it requires us to use the `Img` wrapper and set its size to cover the screen to use it as a background image. This proved to be a hindrance when I wanted to add a cutout text that shows the image that's behind it ( the conventional method is setting a background image and using either `background-clip` or `mix-blend-mode : screen` )
  - **Syncing visuals with audio**  
  Audio tracks in standard video editing softwares usually show a sound spectrum, which makes it easy to sync animations with the beat. The lack of a sound spectrum made the syncing process ad hoc and inconvenient
  - **Managing timeline**  
  Currently, the timeline is created by storing the start time and duration of each sequence in an object. The numbers, however, were also decided in an ad hoc fashion, and I wasn't able to find a way to time the video in a principled manner

  ## Build Instructions

To run this project locally, you will need Node.js >= 18.0.0 (we use ESM in a script),
and a package manager (npm/pnpm/yarn).

1. First, clone the repository, cd to its root and install dependencies:
```sh
$ git clone https://github.com/debanwita27/Unsplash-Showreel
$ cd Unsplash-Showreel
$ npm install
```

2. Next, we need to download the assets used in the video by running a script (`scripts/fetch-assets.mjs`):  
   Ensure that:
      - You have Node v18 or higher (Since we use the built-in `fetch`, top-level `await`, and ESM imports).
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