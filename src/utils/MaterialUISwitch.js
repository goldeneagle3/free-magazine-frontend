import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 16 16"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M 9 1 C 6.246094 1 4 3.246094 4 6 C 4 6.398438 4.089844 6.757813 4.179688 7.113281 L 1 10.292969 L 1 14 L 5 14 L 5 13 L 6 13 L 6 12 L 6.707031 12 L 7.886719 10.820313 C 8.242188 10.910156 8.601563 11 9 11 C 11.753906 11 14 8.753906 14 6 C 14 3.246094 11.753906 1 9 1 Z M 9 2 C 11.214844 2 13 3.785156 13 6 C 13 8.214844 11.214844 10 9 10 C 8.613281 10 8.234375 9.925781 7.851563 9.8125 L 7.570313 9.726563 L 6.292969 11 L 5 11 L 5 12 L 4 12 L 4 13 L 2 13 L 2 10.707031 L 5.273438 7.429688 L 5.1875 7.148438 C 5.074219 6.765625 5 6.386719 5 6 C 5 3.785156 6.785156 2 9 2 Z M 10 4 C 9.449219 4 9 4.449219 9 5 C 9 5.550781 9.449219 6 10 6 C 10.550781 6 11 5.550781 11 5 C 11 4.449219 10.550781 4 10 4 Z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 1.5,
      top: 0.9,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M 6.5 1 C 5.675781 1 5 1.675781 5 2.5 L 5 3 L 2.5 3 C 1.675781 3 1 3.675781 1 4.5 L 1 12.5 C 1 13.324219 1.675781 14 2.5 14 L 13.5 14 C 14.324219 14 15 13.324219 15 12.5 L 15 4.5 C 15 3.675781 14.324219 3 13.5 3 L 11 3 L 11 2.5 C 11 1.675781 10.324219 1 9.5 1 Z M 6.5 2 L 9.5 2 C 9.78125 2 10 2.21875 10 2.5 L 10 3 L 6 3 L 6 2.5 C 6 2.21875 6.21875 2 6.5 2 Z M 2.5 4 L 13.5 4 C 13.78125 4 14 4.21875 14 4.5 L 14 9 L 2 9 L 2 4.5 C 2 4.21875 2.21875 4 2.5 4 Z M 7 7 L 7 8 L 9 8 L 9 7 Z M 2 10 L 14 10 L 14 12.5 C 14 12.78125 13.78125 13 13.5 13 L 2.5 13 C 2.21875 13 2 12.78125 2 12.5 Z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));
