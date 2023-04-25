import {
  Autocomplete,
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { MdInsertPhoto } from "react-icons/md";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";

import { BASE_URL, photosApiUrl } from "../../config/urls";
import { useUpdatePostForEditorMutation } from "../../features/posts/postSlice";
import {
  validateContentLength,
  validateTitleLength,
} from "../../validation/methods/length.method.validation";
import FormButton from "../button/FormButton";
import FormField from "../form/FormField";
import SnackbarMUI from "../snackbar/SnackbarMUI";
import EditorToolbar, {
  formats,
  modules,
} from "./../../utils/QuillEditorToolbar";
import { useGetSubCategoriesByCategoryQuery } from "../../features/sub-categories/subCategorySlice";

const EditorEditPostComp = ({ post, categories }) => {
  const navigate = useNavigate();
  const [updatePost, { isLoading, isError, error }] =
    useUpdatePostForEditorMutation();
  const [value, setValue] = useState(post?.category);
  const [values, setValues] = useState({
    image: "",
    title: post?.title,
    subtitle: post?.subtitle,
    imageProtect: true,
  });
  const [category, setCategory] = useState( post?.category ? post.category : "");
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(false);
  const [content, setContent] = useState(post?.content);

  const { data: subCategories } = useGetSubCategoriesByCategoryQuery(category, {
    skip: false,
  });
  const [subCtgValue, setSubCtgValue] = useState(
    subCategories ? subCategories[subCategories?.length - 1].name : null
  );

  console.log(post)
  const [subCategory, setSubCategory] = useState(post?.subCategory ? post.subCategory : "");


  const handleImageControlChange = (event) => {
    setValues({ ...values, imageProtect: !imageProtect });
  };

  const photoImage = `${BASE_URL}${photosApiUrl}/${post?.image}`;

  const handleChange = (name) => (event) => {
    const value =
      name === "image" ? event.target.files[0] : event.target?.value;
    setValues({ ...values, [name]: value });
  };

  const clearForm = () => {
    setValues({ ...values, title: "", subtitle: "" });
    setContent("");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (category === "" || subCategory === "") {
      return;
    }

    const { image, title, subtitle, imageProtect } = values;

    if (!validateTitleLength(title) || !validateContentLength(content)) {
      return;
    }

    setProgress(true);

    let newPost = new FormData();

    category && newPost.append("category", category);
    subCategory && newPost.append("subCategory", subCategory);
    image && newPost.append("image", image);
    content && newPost.append("content", content);
    title && newPost.append("title", title);
    subtitle && newPost.append("subtitle", subtitle);
    newPost.append("imageProtect", imageProtect);

    const updatePostRequestBody = {
      postId: post?.id,
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
        <Autocomplete
          disablePortal
          id="subCategory"
          value={subCtgValue}
          onChange={(event, newValue) => {
            setSubCtgValue(newValue);
          }}
          inputValue={subCategory}
          onInputChange={(event, newInputValue) => {
            setSubCategory(newInputValue);
          }}
          options={subCategories?.map((c) => c.name).sort()}
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField
              id="subCategory"
              label="Alt Kategori"
              placeholder="Alt Kategori Seç"
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
          isDisabled={isLoading}
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

export default EditorEditPostComp;
