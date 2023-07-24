# Targeting FT Generator
A script that generates Targeting FTs for you.  
Needs NodeJS.

## How to use
1. Download `generate.js` and `fts.json` and put them into an empty directory
2. Using any text editor, edit the parameters at the top of the script
3. in a terminal, run `node generate.js`
4. Grab your FTs and put them in their respective Rotators, and put the fuse input FT into the cannon's `fuseInput` property if you want
5. Shoot down the first plane you see (optional)
## How it works
1. Converts the `TargetDistance`, `TargetElevation`, and `TargetHeading` (this one is relative to the plane's heading) Variables into X, Y and Z Coordinates.
2. Rotates the X, Y and Z Coordinates by first your Pitch angle then your Roll angle.
3. Converts those rotated XYZ Coordinates back into an Rlevation angle and an Azimuth angle your turrets can use.