// ============================================================
//  data.js — Single source of truth for projects & experiences
//
//  Fields:
//    cardSubtitle — short line shown on the index page card
//    subtitle     — longer text shown in the hero on the detail page
//    isGame       — true  → button says "Play Game"
//                   false → button says "Visit Website"
//    date         — used for display AND for sorting (most recent first)
//                   format: "Mon YYYY" or "Mon YYYY - Mon YYYY" or "Mon YYYY · Label"
//                   sorting uses the START date; "Present" end means it sorts
//                   above finished projects, with the most recent start winning.
//
//  To add a new PROJECT or EXPERIENCE, copy the template block
//  at the bottom of each section and fill it in. Nothing else
//  needs to be touched.
//
//  Keys used in `skills` arrays must match keys defined in skills.js
// ============================================================

const projects = {

    bloodbound: {
        title: "Bloodbound Knights",
        date: "Jun 2023 - Present",
        isGame: true,
        cardSubtitle: "A full solo-developed game released on Steam.",
        subtitle: "BloodBound Knights is a fast-paced roguelike shoot 'em up where you battle through procedurally generated levels, unleash powerful spells, and upgrade your gear. Choose your class, master unique abilities, level up, customize your playstyle, and become unstoppable.",
        description: `
            <p>BloodBound Knights is an intense rogue-like shoot 'em up where you take on the role of a powerful soldier. Unlock unique spells and upgrade your abilities in the shop to save yourself.</p>

            <h3><u>Key Features</u></h3>
            <ul>
                <li><strong>Choose Your Character</strong> : Pick from a diverse cast of classes, each with their own unique magical or physical abilities. Whether you wield fire, ice, lightning, arcane energy or you just like to smash enemies, every character offers a different playstyle.</li>
                <li><strong>Fast-Paced Combat</strong> : Engage in action-packed shoot 'em up combat. Dodge enemy attacks while unleashing powerful spells in dynamic, intense battles.</li>
                <li><strong>Level Up & Progress</strong> : Gain experience, level up your character, and unlock stronger spells and abilities.</li>
                <li><strong>Unique Spells & Abilities</strong> : Master spells and techniques that can be upgraded for devastating effects. Level up to unlock new powers and enhance your combat strategy.</li>
                <li><strong>Rogue-like Gameplay</strong> : Experience procedurally generated levels with new challenges every time you play. No two runs are the same !</li>
                <li><strong>Shop System</strong> : Gain gold by slaying enemies, defeating bosses and level upping, and buy powerful upgrades and buffs for your character.</li>
            </ul>

            <h3><u>Gameplay Highlights</u></h3>
            <ul>
                <li>Unlock new spells as you progress</li>
                <li>Cast active abilities and automatic spells</li>
                <li>Face endless hordes and powerful bosses</li>
                <li>Procedurally generated levels every run</li>
                <li>Level up and grow stronger each adventure</li>
                <li>Buy upgrades to enhance your character</li>
            </ul>
        `,
        playLink: "https://store.steampowered.com/app/3577770/BloodBound_Knights/",
        heroImg: "images/Project Files/BBK/Hero/Library Hero.png",
        heroPosition: "center 20%",
        cardImg: "images/Project Files/BBK/Project Image/BBK.png",
        cardImgPosition: "center",
        screenshots: [
            "images/Project Files/BBK/Screenshots/CharacterSelection.gif",
            "images/Project Files/BBK/Screenshots/Abilities.gif",
            "images/Project Files/BBK/Screenshots/Shop.gif"
        ],
        skills: ["ue5", "blueprint", "git", "photoshop", "premiere"]
    },

    aimbuddy: {
        title: "Aim Buddy",
        date: "Dec 2025 - Jan 2026",
        isGame: true,
        cardSubtitle: "A compact 2D aim trainer designed for second-screen play.",
        subtitle: "A compact 2D aim-trainer mini game inspired by osu!, designed to be played while you're dead in an FPS.",
        description: `
            <p>Running in a small window on a second monitor, this game activates after you die in a shooter, turning downtime into meaningful practice. Click fast appearing circles as they vanish and respawn across the screen, sharpening your aim and reaction time.</p>
            <p>Every successful hit grants XP, letting you level up and unlock cosmetic skins over time. It's a lightweight way to stay engaged, improve your aim, and build long-term progression while waiting to jump back into the action.</p>
        `,
        playLink: "https://gabtrex.itch.io/aim-buddy",
        heroImg: "images/Project Files/AB/Hero/Library Hero.png",
        heroPosition: "center 0%",
        cardImg: "images/Project Files/AB/Project Image/AB.png",
        cardImgPosition: "center",
        screenshots: [
            "images/Project Files/AB/Screenshots/1.png",
            "images/Project Files/AB/Screenshots/2.png",
            "images/Project Files/AB/Screenshots/3.png"
        ],
        skills: ["unity", "csharp", "git", "photoshop"]
    },

    portfolio: {
        title: "Portfolio",
        date: "Mar 2026 - Present",
        isGame: false,
        cardSubtitle: "The website you’re currently on.",
        subtitle: "The website you’re currently on.",
        description: `
            <p>Made in about 24 hours and improved over time.</p>
        `,
        playLink: "https://gabtrex.github.io/",
        heroImg: "images/Project Files/Portfolio/Hero/Hero.png",
        heroPosition: "center 75%",
        cardImg: "images/Project Files/Portfolio/Project Image/Hero.png",
        cardImgSize: "135%",
        screenshots: [
            "images/Project Files/Portfolio/Screenshots/1.gif",
            "images/Project Files/Portfolio/Screenshots/2.gif",
            "images/Project Files/Portfolio/Screenshots/3.gif"
        ],
        skills: ["html", "css", "javascript", "git", "photoshop"]
    },

    veilshifter: {
        title: "Veil Shifter",
        date: "Jan 2026 · Global Game Jam",
        isGame: true,
        cardSubtitle: "A 48h jam game built in a two-developer team.",
        subtitle: "Participated in my second Global Game Jam with the theme masks as part of a two-developer team, creating a game within 48 hours.",
        description: `
            <p>A fast paced first person game in which players switch and combine masks to create unique weapons and abilities combos, mastering dynamic traversal mechanics and combat to clear levels and defeat enemies in the shortest time possible.</p>
            <p>Designed and built all map levels, focusing on layout, pacing, and player flow to support engaging gameplay. Implemented the full mask system, including selection, switching, and usability mechanics, ensuring each mask felt responsive, intuitive, and seamlessly integrated into both traversal and combat.</p>
            <p>AI was used in this project to generate the mask models, for the UI and the game Logo.</p>
            <p>Global Game Jam 2026, 48h | Theme : Mask</p>
        `,
        playLink: "https://gabtrex.itch.io/veil-shifter",
        heroImg: "images/Project Files/VeilShifter/Hero/Hero.png",
        heroPosition: "center 0%",
        cardImg: "images/Project Files/VeilShifter/Project Image/VS.png",
        cardImgPosition: "left center",
        screenshots: [
            "images/Project Files/VeilShifter/Screenshots/1.png",
            "images/Project Files/VeilShifter/Screenshots/2.png",
            "images/Project Files/VeilShifter/Screenshots/3.png"
        ],
        skills: ["unity", "csharp", "git", "blender", "photoshop", "gamejam"]
    },

    mam: {
        title: "Meurtre à Monaco",
        date: "Nov 2025 · Internal Game Jam",
        isGame: true,
        cardSubtitle: "A Cluedo-style mystery built solo in 48 hours.",
        subtitle: "Participated in my first Game Jam with the theme 'on the track', working in a five-person team as the sole developer to create a game within 48 hours.",
        description: `
            <p>Between mystery and the smell of gasoline, welcome to Monaco. You are a driver and must stay focused on the road, but at the last minute, Yukio, one of the drivers, was found dead by the organizer... A tragedy blending high-speed thrills with intense puzzles, discover a Cluedo-style mystery set around the race! So get on the track and solve the Murder in Monaco!</p>
            <p>Global Game Jam 2026, 48h | Theme : On the Track</p>
        `,
        playLink: "https://gabtrex.itch.io/meurtre-monaco",
        heroImg: "images/Project Files/MAM/Hero/MAM.png",
        heroPosition: "center 15%",
        cardImg: "images/Project Files/MAM/Project Image/MAM.png",
        cardImgSize: "135%",
        screenshots: [
            "images/Project Files/MAM/Screenshots/1.gif",
            "images/Project Files/MAM/Screenshots/2.gif",
            "images/Project Files/MAM/Screenshots/3.png"
        ],
        skills: ["godot", "git", "photoshop", "gamejam"]
    },

    // ── ADD NEW PROJECTS BELOW ──────────────────────────────
    //
    // example: {
    //     title: "My New Game",
    //     date: "Jan 2026",
    //     isGame: true,                          // true = "Play Game", false = "Visit Website"
    //     cardSubtitle: "One-line pitch for the index card.",
    //     subtitle: "Longer description shown in the hero on the detail page.",
    //     description: `<p>Full description here.</p>`,
    //     playLink: "https://...",
    //     heroImg: "images/Project Files/Example/Hero/hero.png",
    //     heroPosition: "center 20%",
    //     cardImg: "images/Project Files/Example/Project Image/card.png",
    //     cardImgPosition: "center",
    //     screenshots: ["images/Project Files/Example/1.png", "images/Project Files/Example/2.png", "images/Project Files/Example/3.png"],
    //     skills: ["unity", "csharp", "git"]
    // },

};

// ============================================================

const experiences = {

    playmanity: {
        title: "Community Manager",
        date: "Jun 2022 – Present",
        cardSubtitle: "Community management, events & content.",
        subtitle: "Playmanity",
        description: `
            <p>Community Manager at Playmanity, serving as the primary point of contact and public-facing presence for the community. Responsible for organizing events and giveaways, actively engaging with users, and maintaining a dynamic and interactive environment to foster long-term community retention and growth.</p>
        `,
        websiteLink: "https://playmanity.net",
        heroImg: "images/Experience Files/Playmanity/Hero/Pm.png",
        heroPosition: "center 0%",
        cardImg: "images/Experience Files/Playmanity/Experience Image/Pm.png",
        cardImgPosition: "left center",
        skills: ["community", "eventorg", "photoshop", "premiere"]
    },

    // ── ADD NEW EXPERIENCES BELOW ───────────────────────────
    //
    // example: {
    //     title: "Job Title",
    //     date: "Jan 2024 – Present",
    //     cardSubtitle: "One-line pitch for the index card.",
    //     subtitle: "Company Name (shown in hero on detail page).",
    //     description: `<p>What you did there.</p>`,
    //     websiteLink: "https://...",
    //     heroImg: "images/Experience Files/Company/Hero/hero.png",
    //     heroPosition: "center 20%",
    //     cardImg: "images/Experience Files/Company/Experience Image/card.png",
    //     cardImgPosition: "center",
    //     skills: ["photoshop"]
    // },

};

// ============================================================
//  Date sorting utility — used by index.html
//
//  Rules:
//  1. Always sorts by the START date (first Mon YYYY found).
//  2. If the string contains "Present", it's treated as ongoing.
//     Ongoing projects sort above finished ones.
//     Among two ongoing projects, the more recent START date wins.
//     e.g. "Mar 2026 - Present" > "Jun 2023 - Present"
//  3. Finished projects sort by their START date after that.
// ============================================================

const MONTHS = { jan:0, feb:1, mar:2, apr:3, may:4, jun:5, jul:6, aug:7, sep:8, oct:9, nov:10, dec:11 };

function parseStartDate(dateStr) {
    if (!dateStr) return 0;
    // Find the first "Mon YYYY" in the string
    var m = dateStr.match(/([a-z]{3})\s+(\d{4})/i);
    if (m) {
        var month = MONTHS[m[1].toLowerCase()];
        if (month === undefined) month = 0;
        return new Date(parseInt(m[2]), month).getTime();
    }
    // Fallback: bare year
    var y = dateStr.match(/(\d{4})/);
    if (y) return new Date(parseInt(y[1]), 0).getTime();
    return 0;
}

function isOngoing(dateStr) {
    return /present/i.test(dateStr);
}

function sortedEntries(obj) {
    return Object.entries(obj).sort(function(a, b) {
        var aOngoing = isOngoing(a[1].date);
        var bOngoing = isOngoing(b[1].date);
        // Ongoing always beats finished
        if (aOngoing && !bOngoing) return -1;
        if (!aOngoing && bOngoing) return 1;
        // Both same status → sort by start date descending
        return parseStartDate(b[1].date) - parseStartDate(a[1].date);
    });
}