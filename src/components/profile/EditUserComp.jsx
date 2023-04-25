import React, { useState } from "react";
import { MdInsertPhoto } from "react-icons/md";
import { useSelector } from "react-redux";
import { Stack, Button, Checkbox, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

import FormButton from "../button/FormButton";
import FormField from "../form/FormField";
import MultilineFormField from "../form/MultilineFormField";
import {
  useGetAuthorByQuery,
  useUpdateUserMutation,
} from "../../features/user/usersSlice";
import { BASE_URL, photosApiUrl } from "../../config/urls";
import { selectCurrentUsername } from "../../features/auth/authSlice";
import ResourceNotFound from "../error/ResourceNotFound";

const EditUserComp = ({ username }) => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUsername);
  const { data, isLoading } = useGetAuthorByQuery(username);

  const [updateUserFn, { isLoading: usrLoading, isError, error }] =
    useUpdateUserMutation();
  const photoImage = data?.image && `${BASE_URL}${photosApiUrl}/${data?.image}`;
  const [values, setValues] = useState({
    firstName: data?.firstName,
    lastName: data?.lastName,
    description: data?.description,
    image: "",
    imageProtect: true,
  });

  const { firstName, lastName, description, image, imageProtect } = values;


  if (!isLoading && currentUser !== data?.username) {
    return <Navigate to="/posts" />;
  }

  const handleImageControlChange = (event) => {
    setValues({ ...values, imageProtect: !imageProtect });
  };

  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const { firstName, lastName, description, image, imageProtect } = values;

    if (!imageProtect && image === null) {
      return;
    }

    let newUser = new FormData();

    firstName && newUser.append("firstName", firstName);
    lastName && newUser.append("lastName", lastName);
    description && newUser.append("description", description);
    image && newUser.append("image", image);
    newUser.append("imageProtect", imageProtect);

    const updateUserRequestBody = {
      userId: data?.id,
      updateUser: newUser,
    };

    const resp = await updateUserFn(updateUserRequestBody);
    if (!resp.error) {
      navigate("/users/" + resp.data?.username);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack spacing={2} sx={{ alignItems: "center" }}>
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
            alt="user media"
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
        <MultilineFormField
          fieldName="description"
          value={description}
          onChange={handleChange("description")}
          helperText="Bio en fazla 240 karakter olmalıdır."
          type="text"
          rows={7}
          fullWidth={true}
        />
        <FormField
          fieldName="firstName"
          value={firstName}
          onChange={handleChange("firstName")}
          placeholder="İsminizi giriniz"
          type="text"
        />
        <FormField
          fieldName="lastName"
          value={lastName}
          onChange={handleChange("lastName")}
          placeholder="Soyadınızı giriniz"
          type="text"
        />
        <FormButton
          text="Gönder"
          color="#ccc"
          bgcolor="#033f67"
          width={100}
          isDisabled={usrLoading || isLoading}
        />
        {isError && <ResourceNotFound isError={isError} error={error} />}
      </Stack>
    </form>
  );
};

export default EditUserComp;
