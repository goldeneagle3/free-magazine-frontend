import {
  Autocomplete,
  Backdrop,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { MdInsertPhoto } from "react-icons/md";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";

import { useGetCategoriesQuery } from "../../features/categories/categorySlice";
import { useAddPostForEditorMutation } from "../../features/posts/postSlice";
import { useGetAuthorsQuery } from "../../features/user/usersSlice";
import {
  validateContentLength,
  validateTitleLength,
} from "../../validation/methods/length.method.validation";
import FormButton from "../button/FormButton";
import FormField from "../form/FormField";
import EditorToolbar, {
  formats,
  modules,
} from "./../../utils/QuillEditorToolbar";
import MainLoadingComp from "../loading/MainLoadingComp";
import SnackbarMUI from "../snackbar/SnackbarMUI";
import userInput from "./../../hooks/user.input.hook";

const EditorNewPostComp = () => {
  const navigate = useNavigate();

  const { data: categories, isLoading } = useGetCategoriesQuery();
  const { data: authors, isLoading: authrsLoading } = useGetAuthorsQuery();
  const [addNewPost, { isLoading: postLoading }] =
    useAddPostForEditorMutation();

  const [value, setValue] = React.useState(
    categories ? categories[categories?.length - 1]?.name : null
  );
  const [athrsValue, setAthrsValue] = React.useState(
    categories ? categories[authors?.length - 1]?.username : null
  );
  const [author, setAuthor] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(false);
  const [error, setError] = React.useState("");
  const [content, setContent] = React.useState("");

  const {
    text: photo,
    textChangeHandler: photoChangeHandler,
    clearHandler: photoClearHandler,
  } = userInput();

  const {
    text: title,
    shouldDisplayError: titleHasError,
    textChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    clearHandler: titleClearHandler,
  } = userInput(validateTitleLength);

  const {
    text: subtitle,
    shouldDisplayError: subtitleHasError,
    textChangeHandler: subtitleChangeHandler,
    inputBlurHandler: subtitleBlurHandler,
    clearHandler: subtitleClearHandler,
  } = userInput();

  const clearForm = () => {
    photoClearHandler();
    titleClearHandler();
    subtitleClearHandler();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (titleHasError) return;

    if (!validateContentLength(content)) {
      return;
    }

    setProgress(true);

    let newPost = new FormData();

    category && newPost.append("category", category);
    author && newPost.append("author", author);
    photo && newPost.append("image", photo);
    content && newPost.append("content", content);
    title && newPost.append("title", title);
    subtitle && newPost.append("subtitle", subtitle);

    const resp = await addNewPost(newPost);

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

  if (isLoading || authrsLoading) {
    return <MainLoadingComp isLoading={isLoading || authrsLoading} />;
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack spacing={1} sx={{ alignItems: "center" }}>
        <Autocomplete
          disablePortal
          id="category"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={category}
          onInputChange={(event, newInputValue) => {
            setCategory(newInputValue);
          }}
          options={categories?.map((c) => c.name).sort()}
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField
              id="category"
              label="Kategori"
              placeholder="Kategori Seç"
              fullWidth
              {...params}
            />
          )}
        />
        <Autocomplete
          disablePortal
          id="author"
          value={athrsValue}
          onChange={(event, newValue) => {
            setAthrsValue(newValue);
          }}
          inputValue={author}
          onInputChange={(event, newInputValue) => {
            setAuthor(newInputValue);
          }}
          options={authors?.map((c) => c.username).sort()}
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField
              id="author"
              label="Yazar"
              placeholder="Yazar Seç"
              fullWidth
              {...params}
            />
          )}
        />
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
            onChange={photoChangeHandler}
          />
        </Button>
        <span>{photo ? photo.name : ""}</span>
        <FormField
          fieldName="title"
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
          fieldName="subtitle"
          value={subtitle}
          onChange={subtitleChangeHandler}
          onBlur={subtitleBlurHandler}
          error={subtitleHasError}
          helperText="Alt başlık giriniz."
          type="text"
          fullwidth={true}
          placeholder="Alt başlık"
        />
        <div style={{ maxWidth: "100%", margin: "3rem auto" }}>
          <EditorToolbar />
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder={"Metninizi buraya ekleyin..."}
            modules={modules}
            formats={formats}
            style={{ height: "40rem" }}
          />
        </div>
        <FormButton
          text="Yazıyı Ekle"
          color="#ccc"
          bgcolor="#033f67"
          width={100}
          isDisabled={postLoading}
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

export default EditorNewPostComp;
