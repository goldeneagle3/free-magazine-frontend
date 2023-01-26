import React from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { ImPencil2 } from "react-icons/im";
import {
  useMakeAuthorMutation,
  useMakeEditorMutation,
} from "../../features/user/usersSlice";
import { useNavigate } from "react-router-dom";

const UsersList = ({ users }) => {
  const navigate = useNavigate();
  const [makeAuthor, { isLoading, isError, error }] = useMakeAuthorMutation();
  const [
    makeEditor,
    { isLoading: edtLoading, isError: edtIsError, error: edtError },
  ] = useMakeEditorMutation();

  const onSubmitHandler = async (userId) => {
    const resp = await makeAuthor(userId);

    if (resp?.error) {
      console.log(resp.error);
    } else {
      navigate("/home");
    }
  };
  const onSubmitHandlerEditor = async (userId) => {
    const resp = await makeEditor(userId);

    if (resp?.error) {
      console.log(resp.error);
    } else {
      navigate("/home");
    }
  };

  return (
    <List sx={{ mt: 3, width: "100%", maxWidth: 700, bgcolor: "transparent" }}>
      {users?.map((u) => (
        <ListItem
          key={u.id}
          secondaryAction={
            <Stack direction="row" spacing={3} >
              <IconButton
                edge="end"
                aria-label="yazar"
                onClick={() => onSubmitHandler(u.id)}
                sx={{gap:1}}
                disabled={isLoading || edtLoading}
              >
                <ImPencil2 size={20} color="#1e0202" />
                <Typography>Yazar Yap</Typography>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="editor"
                onClick={() => onSubmitHandlerEditor(u.id)}
                sx={{gap:1}}
                disabled={isLoading || edtLoading}
              >
                <ImPencil2 size={20} color="#1e0202" />
                <Typography>Editor Yap</Typography>
              </IconButton>
            </Stack>
          }
        >
          <ListItemText
            primary={<Typography variant="h5">{u.username} </Typography>}
          />
        </ListItem>
      ))}
      {(isError || edtIsError) && (
        <Typography variant="h5" color="red">
          {error ? error?.data?.message : edtError?.data?.message}
        </Typography>
      )}
    </List>
  );
};

export default UsersList;
