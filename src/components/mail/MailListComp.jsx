import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { MdOutlineMarkunread, MdMarkunread } from "react-icons/md";
import { Link } from "react-router-dom";

const MailListComp = ({ mails }) => {
  return (
    <List sx={{ maxWidth: 900, width: "100%", mt: 3 }}>
      {mails &&
        mails.map((m) => (
          <ListItem
            key={m?.id}
            sx={{
              justifyContent: "space-between",
              borderBottom: "1px solid gray",
            }}
          >
            <ListItemIcon>
              {m?.read ? (
                <MdOutlineMarkunread fontSize={25} />
              ) : (
                <MdMarkunread fontSize={25} />
              )}
            </ListItemIcon>
            <ListItemText primary={m?.title} secondary={m?.email} />

            <ListItemSecondaryAction>
              <Link to={"/administration/mails/" + m?.id}>
                <Typography>{moment(m?.createDateTime).fromNow()}</Typography>
              </Link>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
    </List>
  );
};

export default MailListComp;
