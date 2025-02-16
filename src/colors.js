export function getColors(mode) {
    if (mode !== "mystery") {
        return {
            g: "#008F0E",
            y: "#D5A021"
        }
    }

    let color1 = colors[Math.floor(Math.random() * colors.length)];
    let color2;
    do {
        color2 = colors[Math.floor(Math.random() * colors.length)];
    } while (color1 === color2);

    return {
        g: color1,
        y: color2
    }
}

const colors = [
    "#008F0E",
    "#127D60",
    "#3C673C",
    "#626f5c",
    "#0B4F6C",
    "#0681B1",
    "#401FFF",
    "#09275f",
    "#8D7D01",
    "#D5A021",
    "#A80874",
    "#802392",
    "#490250",
    "#52489C",
    "#D90368",
    "#EA0B3F",
    "#715B5E",
    "#873D48",
    "#AF4319",
    "#C03221",
    "#471800",
];