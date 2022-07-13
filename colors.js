let currentTheme = 'curiosities'

const themes = {
  twilight: [
    '#292831',
    '#fbbbad',
    '#ee8695',
    '#4a7a96',
    '#333f58',
  ],
  ice_cream: [
    '#7c3f58',
    '#eb6b6f',
    '#f9a875',
    '#fff6d3',
  ],
  gameboy: [
    '#332c50',
    '#46878f',
    '#94e344',
    '#e2f3e4',
  ],
  midnight: [
    '#130208',
    '#1f0510',
    '#31051e',
    '#460e2b',
    '#7c183c',
    '#d53c6a',
    '#ff8274',
  ],
  crimson: [
    '#1b0326',
    '#7a1c4b',
    '#ba5044',
    '#eff9d6',
  ],
  pastel: [
    '#6d8d8a',
    '#a8c8a6',
    '#655057',
    '#cb8175',
    '#e2a97e',
    '#f0cf8e',
    '#f6edcd',
  ],
  curiosities: [
    '#46425e',
    '#15788c',
    '#00b9be',
    '#ff6973',
    '#ffb0a3',
    '#ffeecc',
  ]
}

const setTheme = (theme) => {
  currentTheme = theme;
}

const pickColor = () => {
  const themeColors = themes[currentTheme]
  return themeColors[floor(random(themeColors.length))] + `${ALPHA.toString(16)}`
}

const pickBackground = (alpha, reversed = false) => {
  const index = reversed ? 0 : -1
  const themeColors = themes[currentTheme]
  return themeColors.at(index) + `${alpha.toString(16)}`
}