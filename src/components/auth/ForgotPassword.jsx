import React from "react";
import { MdOutlineError } from "react-icons/md";
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Snackbar,
  Tooltip,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForgotPasswordMutation } from "../../features/auth/authApiSlice";
import { validateEmail } from "../../validation/methods/email.method.validation";

const ForgotPassword = () => {
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [emailAddress, setEmailAddress] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const handleSubmit = async () => {
    if (!emailAddress || !validateEmail(emailAddress)) {
      setMessage("Lütfen kendinizin ,  geçerli olan email adresini giriniz.");
      return;
    }

    try {
      const body = {
        email: emailAddress,
      };

      const response = await forgotPassword(body);

      if (!response.error) {
        setOpenSnack(true);
        setMessage(response?.data?.message);
      } else {
        setOpenSnack(true);
        setMessage(response?.error?.message);
      }
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <>
      <Tooltip title="Şifrenizi resetlemek için tıklayın.">
        <Button
          variant="text"
          color="error"
          startIcon={<MdOutlineError />}
          onClick={handleClickOpen}
        >
          Şifrenizi mi Unuttunuz ?
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle fontWeight={1000}>Şifre Resetleme</DialogTitle>
        <DialogContent>
          <DialogContentText fontWeight={700}>
            Şifrenizi hatırlayamıyorsanız endişelenmeyin. Altta bulunan boşluğa
            dergiye üye olduğunuz email adresinizi giriniz ve gönder tuşuna
            tıklayınız. Email adresinize gönderdiğimiz mesajdaki linke
            tıklayarak yeni şifrenizi girebilirsiniz.
          </DialogContentText>
          <TextField
            autoFocus
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            margin="dense"
            id="email"
            label="Email Adresi"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal Et</Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            variant="outlined"
          >
            Gönder
          </Button>
        </DialogActions>
        {/* {message && <Typography sx={{ mx: 2, my: 2 }}> {message} </Typography>} */}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Dialog>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
      >
        <Alert onClose={handleCloseSnackBar} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ForgotPassword;
