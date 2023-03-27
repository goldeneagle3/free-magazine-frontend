import React, { useState } from "react";
import { MdInsertPhoto } from "react-icons/md";
import {
  Stack,
  Button,
  Autocomplete,
  TextField,
  Checkbox,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import FormButton from "../button/FormButton";
import EditorToolbar, {
  formats,
  modules,
} from "./../../utils/QuillEditorToolbar";
import {
  validateContentLength,
  validateTitleLength,
} from "../../validation/methods/length.method.validation";
import {
  useGetPostByIdQuery,
  useUpdatePostMutation,
} from "../../features/posts/postSlice";
import { useGetCategoriesQuery } from "../../features/categories/categorySlice";
import FormField from "../form/FormField";
import { BASE_URL, photosApiUrl } from "../../config/urls";
import SnackbarMUI from "../snackbar/SnackbarMUI";
import { useNavigate } from "react-router-dom";

const EditPostComp = ({ postId }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetPostByIdQuery(postId);
  const {
    data: categories,
    isLoading: postLoading,
    isError,
    error,
  } = useGetCategoriesQuery();
  const [updatePost, { isLoading: updLoading }] = useUpdatePostMutation();
  const [value, setValue] = useState(data?.category);
  const [values, setValues] = useState({
    image: "",
    title: data?.title,
    subtitle: data?.subtitle,
    imageProtect: true,
  });
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(false);
  const [content, setContent] = useState(data?.content);

  const handleImageControlChange = (event) => {
    setValues({ ...values, imageProtect: !imageProtect });
  };

  const photoImage = `${BASE_URL}${photosApiUrl}/${data?.image}`;

  const handleChange = (name) => (event) => {
    const value =
      name === "image" ? event.target.files[0] : event.target?.value;
    setValues({ ...values, [name]: value });
  };

  const clearForm = () => {
    setValues({ ...values, title: "", subtitle: "", content: "" });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const { image, title, subtitle, imageProtect } = values;

    if (!validateTitleLength(title) || !validateContentLength(content)) {
      return;
    }

    setProgress(true);

    let newPost = new FormData();

    category && newPost.append("category", category);
    image && newPost.append("image", image);
    content && newPost.append("content", content);
    title && newPost.append("title", title);
    subtitle && newPost.append("subtitle", subtitle);
    newPost.append("imageProtect", imageProtect);

    const updatePostRequestBody = {
      postId: postId,
      reqBody: newPost,
    };

    const res = await updatePost(updatePostRequestBody);

    setProgress(false);

    if (res?.error) {
      setOpen(true);
    } else {
      clearForm();
      navigate("/home");
    }
  };

  const { image, title, subtitle, imageProtect } = values;

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
          sx={{ width: "100%", mb: 2 }}
          renderInput={(params) => (
            <TextField
              id="category"
              label="Kategori"
              placeHolder="Kategori Seç"
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
            hidden
            accept="image/*"
            type="file"
            onChange={handleChange("image")}
          />
        </Button>
        <span>{image ? image.name : ""}</span>
        <Stack direction="row" spacing={1} sx={{ pb: 4 }}>
          <img
            src={photoImage}
            style={{
              width: "20rem",
              height: "15rem",
            }}
            alt="post media"
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
          fieldName="title"
          value={title}
          onChange={handleChange("title")}
          error={!validateTitleLength(title)}
          helperText="Bir başlık giriniz."
          type="text"
          fullwidth={true}
          placeholder="Başlık"
        />
        <FormField
          fieldName="subtitle"
          value={subtitle}
          onChange={handleChange("subtitle")}
          type="text"
          fullwidth={true}
          placeholder="Alt Başlık"
        />
        <div style={{ maxWidth: "100%", margin: "2rem auto" }}>
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
          text="Güncelle"
          color="#ccc"
          bgcolor="#033f67"
          width={100}
          isDisabled={isLoading || postLoading || updLoading}
        />
      </Stack>
      {isError && <SnackbarMUI open={open} setOpen={setOpen} text={error} />}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </form>
  );
};

export default EditPostComp;
