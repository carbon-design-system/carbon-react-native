/* eslint-disable prettier/prettier */
const {execSync} = require('child_process');
const fs = require('fs');
const gradleRegex = /versionCode [0-9]+\n/;
const plistFile = 'example/ios/CarbonReactNativeExample/Info.plist';
const gradleFile = 'example/android/app/build.gradle';
const versionCodFile = 'example/src/constants/versionCode.ts';

let androidGradle = fs.readFileSync(gradleFile, {encoding: 'utf8'});
const oldCode = androidGradle.match(gradleRegex)[0].replace('versionCode ', '').trim();
const newCode = String(Number(oldCode) + 1);

console.info(`Bumping iOS to versionCode ${newCode}`);
execSync(`/usr/libexec/PlistBuddy -c "Set :CFBundleVersion ${newCode}" "${plistFile}"`, {stdio: 'inherit'});

console.info(`Bumping Android to versionCode ${newCode}`);

if (typeof androidGradle === 'string') {
  androidGradle = androidGradle.replace(gradleRegex, `versionCode ${newCode}\n`);
} else {
  throw new Error('bump.js: unable to read android gradle file');
}

fs.writeFileSync(gradleFile, androidGradle);

console.info(`Bumping version code for app to versionCode ${newCode}`);

fs.writeFileSync(versionCodFile, `export const versionCode = ${newCode};\n`);
