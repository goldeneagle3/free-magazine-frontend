import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { MdArrowBack, MdMarkunread, MdOutlineMarkunread } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useMakeReadMessageMutation } from "../../features/contact/contactSlice";

const SingleMailComp = ({ message }) => {
  const navigate = useNavigate();
  const [makeRead, { isLoading }] = useMakeReadMessageMutation();

  const onClickHandler = async (e) => {
    e.preventDefault();

    await makeRead(message?.id);
  };

  return (
    <div>
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          mb: 2,
        }}
      >
        <MdArrowBack fontSize={30} />
      </IconButton>
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4" fontWeight={900} align="left">
            {message?.title}
          </Typography>
          <Typography variant="h6"> {message?.email}</Typography>
        </Stack>
        <p className="paragraph p-padding-right-medium">{message?.content}</p>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <p className="paragraph--min">
            {moment(message?.createDateTime).fromNow()}
          </p>
          {message?.read ? (
            <IconButton>
              <MdOutlineMarkunread fontSize={20} />
            </IconButton>
          ) : (
            <Tooltip title="Okundu olarak işaretle">
              <IconButton onClick={onClickHandler} disabled={isLoading}>
                <MdMarkunread fontSize={20} />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Stack>
    </div>
  );
};

export default SingleMailComp;
