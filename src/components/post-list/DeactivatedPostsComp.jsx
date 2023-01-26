import React from "react";
import { GiConfirmed } from "react-icons/gi";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useActivatePostMutation } from "../../features/posts/postSlice";
import { useNavigate } from "react-router-dom";

const DeactivatedPostsComp = ({ posts }) => {
  const navigate = useNavigate();
  const [activePost, { isLoading }] = useActivatePostMutation();

  const activeHandler = async (postId) => {
    const resp = await activePost(postId);
    if (!resp.error) {
      navigate("/home");
    } else {
      console.log(resp.error);
    }
  };

  return (
    <List sx={{ width: "100%", maxWidth: 700, bgcolor: "background.paper" }}>
      {posts?.map((value) => {
        return (
          <ListItem
            key={value}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="posts"
                onClick={() => activeHandler(value?.id)}
                disabled={isLoading}
              >
                <GiConfirmed />
              </IconButton>
            }
            sx={{ mb: 3 }}
          >
            <ListItemText
              id={value?.id}
              primary={value?.title}
              secondary={
                <Stack direction="row" spacing={2}>
                  <Typography>{value?.username} </Typography>
                  <Typography> {value?.category} </Typography>
                </Stack>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default DeactivatedPostsComp;
