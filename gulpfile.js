import gulp from "gulp";
import newer from "gulp-newer";
import webp from "gulp-webp";
import ttf2woff2 from "gulp-ttf2woff2";
import imagemin from "gulp-imagemin";

const { src, dest, watch, task, series } = gulp;

const imagesInput = "assets/**/*.{jpg,jpeg,png,webp}";
const fontsInput = "assets/**/*.ttf";

const output = "public/assets";

function compressImages() {
  return src(imagesInput)
    .pipe(newer(output))
    .pipe(imagemin())
    .pipe(dest(output));
}

function imagesToWebp() {
  return src(imagesInput).pipe(newer(output)).pipe(webp()).pipe(dest(output));
}

function fontsToWoff2() {
  return src(fontsInput)
    .pipe(newer(output))
    .pipe(ttf2woff2())
    .pipe(dest(output));
}

function watcher() {
  watch(fontsInput, fontsToWoff2);
  watch(imagesInput, compressImages);
  watch(imagesInput, imagesToWebp);
}

task("default", series(fontsToWoff2, compressImages, imagesToWebp, watcher));
task("build", series(fontsToWoff2, compressImages, imagesToWebp));
