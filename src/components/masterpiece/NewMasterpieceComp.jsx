import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdInsertPhoto } from "react-icons/md";
import ReactQuill from "react-quill";
import { Backdrop, Button, CircularProgress, Stack } from "@mui/material";

import userInput from "../../hooks/user.input.hook";
import { validateContentTitleLength } from "../../validation/methods/length.method.validation";
import MainLoadingComp from "../loading/MainLoadingComp";
import FormField from "../form/FormField";
import EditorToolbar, {
  formats,
  modules,
} from "./../../utils/QuillEditorToolbar";
import FormButton from "../button/FormButton";
import SnackbarMUI from "../snackbar/SnackbarMUI";
import {
  useCreateMusicMutation,
  useCreatePictureMutation,
} from "../../features/masterpiece/masterpieceSlice";
import { genres } from "../../utils/genres";

const NewMasterpieceComp = ({ genre }) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const [createMusic, { isLoading }] = useCreateMusicMutation();
  const [createPicture, { isLoadingPicture }] = useCreatePictureMutation();

  const {
    text: title,
    shouldDisplayError: titleHasError,
    textChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    clearHandler: titleClearHandler,
  } = userInput(validateContentTitleLength);

  const {
    text: owner,
    shouldDisplayError: ownerHasError,
    textChangeHandler: ownerChangeHandler,
    inputBlurHandler: ownerBlurHandler,
    clearHandler: ownerClearHandler,
  } = userInput();

  const {
    text: showLink,
    shouldDisplayError: showLinkHasError,
    textChangeHandler: showLinkChangeHandler,
    inputBlurHandler: showLinkBlurHandler,
    clearHandler: showLinkClearHandler,
  } = userInput();

  const {
    text: showLink2,
    shouldDisplayError: showLink2HasError,
    textChangeHandler: showLink2ChangeHandler,
    inputBlurHandler: showLink2BlurHandler,
    clearHandler: showLink2ClearHandler,
  } = userInput();

  const {
    text: marketLink,
    shouldDisplayError: marketLinkHasError,
    textChangeHandler: marketLinkChangeHandler,
    inputBlurHandler: marketLinkBlurHandler,
    clearHandler: marketLinkClearHandler,
  } = userInput();

  const {
    text: image,
    textChangeHandler: imageChangeHandler,
    clearHandler: imageClearHandler,
  } = userInput();

  const clearForm = () => {
    titleClearHandler();
    ownerClearHandler();
    showLinkClearHandler();
    showLink2ClearHandler();
    marketLinkClearHandler();
    imageClearHandler();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (titleHasError) return;

    if (image === "") {
      setError("Lütfen bir resim ekleyiniz.");
      setOpen(true);
      return;
    }

    setProgress(true);

    let newMasterpiece = new FormData();

    title && newMasterpiece.append("title", title);
    owner && newMasterpiece.append("owner", owner);
    showLink && newMasterpiece.append("showLink", showLink);
    showLink2 && newMasterpiece.append("showLink2", showLink2);
    marketLink && newMasterpiece.append("marketLink", marketLink);
    image && newMasterpiece.append("image", image);
    info && newMasterpiece.append("info", info);

    const resp =
      genre === genres.MUSIC
        ? await createMusic(newMasterpiece)
        : await createPicture(newMasterpiece);

    if (resp.error) {
      setProgress(false);
      setError(resp.error?.data?.message);
      setOpen(true);
    } else {
      clearForm();
      setProgress(false);
      navigate("/home");
    }
  };

  if (isLoading || isLoadingPicture) {
    return <MainLoadingComp isLoading={isLoading || isLoadingPicture} />;
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack spacing={1} sx={{ alignItems: "center" }}>
        <Button
          variant="contained"
          component="label"
          endIcon={<MdInsertPhoto />}
        >
          Upload
          <input
            id="image"
            hidden
            accept="image/*"
            type="file"
            onChange={imageChangeHandler}
          />
        </Button>
        <span>{image ? image.name : ""}</span>
        <FormField
          fieldName="başlık"
          value={title}
          onChange={titleChangeHandler}
          onBlur={titleBlurHandler}
          error={titleHasError}
          helperText="Bir başlık giriniz."
          type="text"
          fullwidth={true}
          placeholder="Başlık"
        />
        <FormField
          fieldName="eser sahibi"
          value={owner}
          onChange={ownerChangeHandler}
          onBlur={ownerBlurHandler}
          error={ownerHasError}
          helperText="Bir eser sahibi giriniz."
          type="text"
          fullwidth={true}
          placeholder="Eser Sahibi"
        />
        <FormField
          fieldName="erişim linki 1"
          value={showLink}
          onChange={showLinkChangeHandler}
          onBlur={showLinkBlurHandler}
          error={showLinkHasError}
          helperText="Bir erişim linki 1 giriniz."
          type="text"
          fullwidth={true}
          placeholder="Erişim Linki"
        />
        <FormField
          fieldName="erişim linki 2"
          value={showLink2}
          onChange={showLink2ChangeHandler}
          onBlur={showLink2BlurHandler}
          error={showLink2HasError}
          helperText="Bir erişim linki 2 giriniz."
          type="text"
          fullwidth={true}
          placeholder="Erişim Linki 2"
        />
        <FormField
          fieldName="market linki"
          value={marketLink}
          onChange={marketLinkChangeHandler}
          onBlur={marketLinkBlurHandler}
          error={marketLinkHasError}
          helperText="Bir market linki giriniz."
          type="text"
          fullwidth={true}
          placeholder="Eserinizin pazar yerini giriniz"
        />
        <div style={{ maxWidth: "100%", margin: "3rem auto" }}>
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
        <FormButton
          text="Eseri Ekle"
          color="#ccc"
          bgcolor="#033f67"
          width={100}
          isDisabled={isLoadingPicture || isLoading}
        />
      </Stack>
      <SnackbarMUI open={open} setOpen={setOpen} text={error} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </form>
  );
};

export default NewMasterpieceComp;
