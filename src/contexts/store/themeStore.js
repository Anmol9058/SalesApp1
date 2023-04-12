export const dark_theme = {
  background: '#121212',
  textcolor: '#ffffff',
  primary: '#46ACFF',    
  primary_light: "#46ACFF",
  accent: "#343434",
  light_accent: "#606060",
  inputbackground: '#344955',
  textinput: "#9A9A9A",
  errorcolor: '#FF5252',
  green: '#1BE090',
  successcolor: '#00C853',
  infocolor: '#63c0df',
  white: '#ffffff',
  titlecolor: "#202426",
  black: "#000000",
  light_green: "#6CD872",
  subtitle: "#A9A8A8",
  accenttextcolor: "#F1F8FE",
  yellow: "#F4C343",
  backgroundcolor: "#333333",
  buttonbackground: "#C5242C",
  lightGrey:'#f2f5f5',
  light_grey:"#F0F0F0"
};

export const light_theme = {
  background: '#121212',
  textcolor: '#ffffff',
  primary: '#921C11',
  primary_light: "#63c0df",
  accent: "#343434",
  light_accent: "#606060",
  inputbackground: '#344955',
  textinput: "#9A9A9A",
  errorcolor: '#FF5252',
  green: '#228B22',
  successcolor: '#00C853',
  infocolor: '#63c0df',
  white: '#ffffff',
  titlecolor: "#202426",
  black: "#000000",
  light_green: "#6CD872",
  subtitle: "#A9A8A8",
  accenttextcolor: "#F1F8FE",
  yellow: "#F4C343",
  backgroundcolor: "#333333",
  buttonbackground: "#C5242C"


};

const themeStore = {
  theme: dark_theme,
  currentTheme: 'dark',
  userTheme: false,
};

export default themeStore;
