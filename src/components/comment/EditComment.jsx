import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import { MdOutlineModeEditOutline } from "react-icons/md";

import MultilineFormField from "../form/MultilineFormField";
import { validateCommentLength } from "../../validation/methods/length.method.validation";
import { useUpdateCommentMutation } from "../../features/comments/commentsSlice";
import SnackbarMUI from "../snackbar/SnackbarMUI";

export default function EditComment({ comment }) {
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [content, setContent] = React.useState(comment?.content);
  const [error, setError] = React.useState("");

  const [updateComment, { isLoading }] = useUpdateCommentMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleClear = () => {
    setContent("");
  };

  const submitHandler = async () => {
    if (!validateCommentLength(content)) {
      setError("Yorumunuz en fazla 250 karakter olmalıdır.");
      setOpenSnack(true);
      setOpen(false);
      return;
    }

    const reqBody = {
      commentId: comment?.commentId,
      content: content,
    };
    const rep = await updateComment(reqBody);

    if (rep?.error) {
      setError(rep?.error?.data?.message);
      setOpenSnack(true);
    }
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen} disabled={isLoading}>
        <MdOutlineModeEditOutline />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle align="center">Yorumu Düzenle</DialogTitle>
        <DialogContent>
          <MultilineFormField
            value={content}
            onChange={handleChange}
            // error={validateCommentLength(content)}
            helperText="En fazla 250 karakter olabilir."
            type="text"
            rows={10}
            fullWidth={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClear}>Clear</Button>
          <Button onClick={submitHandler}>Gönder</Button>
        </DialogActions>
      </Dialog>
      <SnackbarMUI open={openSnack} setOpen={setOpenSnack} text={error} />
    </>
  );
}
