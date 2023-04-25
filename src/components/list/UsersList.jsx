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
  useUnMakeAuthorMutation,
  useUnMakeEditorMutation,
} from "../../features/user/usersSlice";
import { useNavigate } from "react-router-dom";

const UsersList = ({ users }) => {
  const navigate = useNavigate();

  // Author State
  const [makeAuthor, { isLoading }] = useMakeAuthorMutation();
  const [unMakeAuthor, { isLoading: unMakeAtrLdn }] = useUnMakeAuthorMutation();

  // Editor State
  const [makeEditor, { isLoading: edtLoading }] = useMakeEditorMutation();
  const [unMakeEditor, { isLoading: unEdtLoading }] = useUnMakeEditorMutation();

  // Author Funcs
  const onSubmitHandlerAuthor = async (userId) => {
    const resp = await makeAuthor(userId);

    if (resp?.error) {
      console.log(resp.error);
    } else {
      navigate("/home");
    }
  };
  const onSubmitHandlerUnMakeAuthor = async (userId) => {
    const resp = await unMakeAuthor(userId);

    if (resp?.error) {
      console.log(resp.error);
    } else {
      navigate("/home");
    }
  };

  // Editor Funcs
  const onSubmitHandlerEditor = async (userId) => {
    const resp = await makeEditor(userId);

    if (resp?.error) {
      console.log(resp.error);
    } else {
      navigate("/home");
    }
  };
  const onSubmitHandlerUnEditor = async (userId) => {
    const resp = await unMakeEditor(userId);

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
            <Stack direction="row" spacing={3}>
              {u?.roles?.find((r) => r === "ROLE_AUTHOR") ? (
                <IconButton
                  edge="end"
                  aria-label="yazar"
                  onClick={() => onSubmitHandlerUnMakeAuthor(u?.id)}
                  sx={{ gap: 1 }}
                  disabled={
                    isLoading || unMakeAtrLdn || edtLoading || unEdtLoading
                  }
                >
                  <ImPencil2 size={20} color="#ed1111" />
                  <Typography>Yazarlıktan Çıkart</Typography>
                </IconButton>
              ) : (
                <IconButton
                  edge="end"
                  aria-label="yazar"
                  onClick={() => onSubmitHandlerAuthor(u?.id)}
                  sx={{ gap: 1 }}
                  disabled={
                    isLoading || unMakeAtrLdn || edtLoading || unEdtLoading
                  }
                >
                  <ImPencil2 size={20} color="#1e0202" />
                  <Typography>Yazar Yap</Typography>
                </IconButton>
              )}
              {u?.roles?.find((r) => r === "ROLE_EDITOR") ? (
                <IconButton
                  edge="end"
                  aria-label="editor"
                  onClick={() => onSubmitHandlerUnEditor(u?.id)}
                  sx={{ gap: 1 }}
                  disabled={
                    isLoading || unMakeAtrLdn || edtLoading || unEdtLoading
                  }
                >
                  <ImPencil2 size={20} color="#ed1111" />
                  <Typography>Editorlükten Çık</Typography>
                </IconButton>
              ) : (
                <IconButton
                  edge="end"
                  aria-label="editor"
                  onClick={() => onSubmitHandlerEditor(u?.id)}
                  sx={{ gap: 1 }}
                  disabled={
                    isLoading || unMakeAtrLdn || edtLoading || unEdtLoading
                  }
                >
                  <ImPencil2 size={20} color="#1e0202" />
                  <Typography>Editor Yap</Typography>
                </IconButton>
              )}
            </Stack>
          }
        >
          <ListItemText
            primary={<Typography variant="h5">{u.username} </Typography>}
          />
        </ListItem>
      ))}
      {/* {(isError || edtIsError) && (
        <Typography variant="h5" color="red">
          {error ? error?.data?.message : edtError?.data?.message}
        </Typography>
      )} */}
    </List>
  );
};

export default UsersList;
