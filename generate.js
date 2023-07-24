// HOW TO USE:
// 1. Set your parameters down below
// 2. Run the script (use node.js)
// 3. Look at the out.txt for your new FTs

// NOTES:
// 1. I would not recommend using this for a turret with Cannons since the bullet drop compensation FT is terrible

// ADD PARAMS HERE

// How fast your bullets go in m/s
const BULLET_SPEED = 1250
// Whether you're firing out shells or bullets ('true' if shells, 'false' for bullets)
const HAS_BULLET_DROP = true
// The X position of your turret in meters (right is positive)
const TURRET_X = 0;
// The Y position of your turret in meters (up is positive)
const TURRET_Y = 0;
// The Z position of your turret in meters (forward is positive)
const TURRET_Z = 0;

// DO NOT MOD EVERYTHING PAST HERE UNLESS YOU KNOW WHAT YOU ARE DOING

const fts = require("./fts.json");
const fs = require("node:fs")

function generateFTs(speed, hasBulletDrop) {
    const targets = fts.targets;
    const sources = fts.source;
    const extras = fts.extras;

    if (hasBulletDrop) {
        sources.t_elev += ` + ${extras.t_bdc}`;
    }

    const outT = {};
    const outS = {};
    const outE = {};

    for (const sName in sources) {
        const sCode = sources[sName];
        outS[sName] = sCode
            .replaceAll("GUN_SPEED", speed.toString())
            .replaceAll("TUR_X", TURRET_X.toString())
            .replaceAll("TUR_Y", TURRET_Y.toString())
            .replaceAll("TUR_Z", TURRET_Z.toString())
    }

    for (const tName in targets) {
        const tCode = targets[tName];
        outT[tName] = tCode.replaceAll("GUN_SPEED", speed.toString())
    }

    for (const eName in extras) {
        const eCode = extras[eName];
        outE[eName] = eCode.replaceAll("GUN_SPEED", speed.toString())
    }

    return { sources: outS, targets: outT, extras: outE };
}

function compileFTs(srcs, tgts) {
    const compiledTargets = {}

    for (const tName in tgts) {
        let tCode = tgts[tName];
        let oldCode = "";
    
        do {
            oldCode = tCode
            for (const sName in srcs) {
                tCode = tCode.replaceAll(sName, `(${srcs[sName]})`);
            }
        } while (tCode != oldCode);
        compiledTargets[tName] = tCode.replaceAll(" ", "");
    }

    return compiledTargets;
}

const generated = generateFTs(BULLET_SPEED, HAS_BULLET_DROP);
const out = compileFTs(generated.sources, generated.targets);

fs.writeFileSync("out.txt",
`---- Turret Elevation ----
${out.t_relev}
---- Turret Turning ----
${out.t_rhead}
---- Flak Fuse Input (optional) ----
${generated.extras.t_travtime.replaceAll(" ", "")}
`);
