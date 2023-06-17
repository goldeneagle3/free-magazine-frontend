import React from "react";
import { MdInsertPhoto, MdOutlineEdit } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { BASE_URL, photosApiUrl } from "../../config/urls";
import FormField from "../form/FormField";
import EditorToolbar, {
  formats,
  modules,
} from "./../../utils/QuillEditorToolbar";
import SnackbarMUI from "../snackbar/SnackbarMUI";
import {
  useUpdateMovieByIdMutation,
  useUpdateMusicByIdMutation,
  useUpdatePictureByIdMutation,
} from "../../features/masterpiece/masterpieceSlice";
import { validateContentTitleLength } from "../../validation/methods/length.method.validation";
import { genres } from "../../utils/genres";

const UpdateMasterpiece = ({ data, genre }) => {
  const photoImage = data?.image && `${BASE_URL}${photosApiUrl}/${data?.image}`;
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [values, setValues] = React.useState({
    title: data?.title,
    owner: data?.owner,
    info: data?.info,
    image: "",
    imageProtect: true,
    showLink: data?.showLink,
    showLink2: data?.showLink2,
    marketLink: data?.marketLink,
  });
  const [error, setError] = React.useState("");
  const [info, setInfo] = React.useState(data?.info);
  const [updateMusic, { isLoading: ldMusic }] = useUpdateMusicByIdMutation();
  const [updatePicture, { isLoading: ldPicture }] =
    useUpdatePictureByIdMutation();
  const [updateMovie, { isLoading: ldMovie }] = useUpdateMovieByIdMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageControlChange = (event) => {
    setValues({ ...values, imageProtect: !values.imageProtect });
  };

  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const { title, owner, image, imageProtect, showLink, showLink2, marketLink } =
    values;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!imageProtect && image === null) {
      console.log("heyyy");
      return;
    }

    if (title === "" || !validateContentTitleLength(title)) {
      setOpenSnack(true);
      setError("Provide a valid title less than 75 characters , please.");
      return;
    }

    if (owner === "") {
      setOpenSnack(true);
      setError("Provide a valid owner , please.");
      return;
    }

    let editMasterpieceBody = new FormData();

    title && editMasterpieceBody.append("title", title);
    owner && editMasterpieceBody.append("owner", owner);
    info && editMasterpieceBody.append("info", info);
    showLink && editMasterpieceBody.append("showLink", showLink);
    showLink2 && editMasterpieceBody.append("showLink2", showLink2);
    marketLink && editMasterpieceBody.append("marketLink", marketLink);
    image && editMasterpieceBody.append("image", image);
    editMasterpieceBody.append("imageProtect", imageProtect);

    console.log(editMasterpieceBody);

    const reqBody = {
      id: data?.id,
      body: editMasterpieceBody,
    };

    const resp =
      genre === genres.MUSIC
        ? await updateMusic(reqBody)
        : genre === genres.PICTURE
        ? await updatePicture(reqBody)
        : genre === genres.MOVIE
        ? await updateMovie(reqBody)
        : null;

    if (resp?.error) {
      setError(resp?.error?.data?.message);
      setOpenSnack(true);
    }
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <MdOutlineEdit />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle
          sx={{
            mb: 2,
            bgcolor: theme.palette.primary.dark,
            color: theme.palette.primary.light,
          }}
          align="center"
        >
          Eseri Düzenle
        </DialogTitle>
        <DialogContent>
          <Stack
            spacing={2}
            sx={{ textAlign: "center", alignItems: "center", margin: "auto" }}
          >
            <Button
              variant="contained"
              component="label"
              endIcon={<MdInsertPhoto />}
            >
              Upload
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleChange("image")}
              />
            </Button>
            <Typography align="center">{image ? image.name : ""}</Typography>
            <Stack direction="row" spacing={1} sx={{ pb: 3 }}>
              <img
                src={photoImage}
                style={{
                  justifyContent: "center",
                  width: "20rem",
                  height: "15rem",
                }}
                alt="masterpiece media"
              />
              <Stack direction="row" spacing={0} alignItems="center">
                <Checkbox
                  checked={imageProtect}
                  onChange={handleImageControlChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <Typography> Fotoğrafı koru. </Typography>
              </Stack>
            </Stack>
            <FormField
              value={title}
              onChange={handleChange("title")}
              helperText="En fazla 75 karakter olabilir."
              type="text"
            />
            <FormField
              value={owner}
              onChange={handleChange("owner")}
              helperText="Please , provide a owner."
              type="text"
            />
            <FormField
              value={showLink}
              onChange={handleChange("showLink")}
              helperText="Please , provide a showLink."
              type="text"
            />
            <FormField
              value={showLink2}
              onChange={handleChange("showLink2")}
              helperText="Please , provide a showLink2."
              type="text"
            />
            <FormField
              value={marketLink}
              onChange={handleChange("marketLink")}
              helperText="Please , provide a marketLink."
              type="text"
            />
            <div style={{ maxWidth: "100%", margin: "2rem auto" }}>
              <EditorToolbar />
              <ReactQuill
                theme="snow"
                value={info}
                onChange={setInfo}
                placeholder={"Metninizi buraya ekleyin..."}
                modules={modules}
                formats={formats}
                style={{ height: "40rem" }}
              />
            </div>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal Et</Button>
          <Button
            onClick={submitHandler}
            disabled={ldMusic || ldPicture || ldMovie}
          >
            Gönder
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarMUI open={openSnack} setOpen={setOpenSnack} text={error} />
    </>
  );
};

export default UpdateMasterpiece;
