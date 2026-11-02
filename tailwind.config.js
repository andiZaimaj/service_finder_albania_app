/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        cream: "#F4ECDB",
        creamSoft: "#FAF4E6",
        sand: "#E0CFAE",
        ink: "#1F2A26",
        ink2: "#3A4944",
        inkSoft: "#5C6A65",
        inkMute: "rgba(31,42,38,0.55)",
        sage: "#4A7F76",
        sageDeep: "#2F6259",
        sageSoft: "#9CC1B7",
        sageMint: "#CFE3DA",
      },
      fontFamily: {
        jakarta: ["PlusJakartaSans_400Regular"],
        "jakarta-medium": ["PlusJakartaSans_500Medium"],
        "jakarta-semibold": ["PlusJakartaSans_600SemiBold"],
        "jakarta-bold": ["PlusJakartaSans_700Bold"],
        "display": ["InstrumentSerif_400Regular_Italic"],
      },
    },
  },
  plugins: [],
};
