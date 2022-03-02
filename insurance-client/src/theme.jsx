import { createMuiTheme } from "@material-ui/core/styles";

const Apptheme = createMuiTheme({
    typography: {
        button: {
            textTransform: "none",
            borderRadius: 0,
        },
        fontFamily: ["NotoSans-Regular, Arial, Verdana"].join(","),
    },
    palette: {
        primary: {
            main: "#42BABD",
            contrastText: "#333",
        },
        secondary: {
            main: "#333",
            contrastText: "#fff",
        },
        action: {
            hover: "#C6EAEB",
        },
    },
});

export default Apptheme;
