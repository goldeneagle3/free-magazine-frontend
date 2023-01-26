import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { BASE_URL, photosApiUrl } from "../../config/urls";
import { Stack } from "@mui/material";

export default function PlainPostCard({ post }) {
  const postImage = `${BASE_URL}${photosApiUrl}/${post?.imageId}`;

  return (
    <Card
      sx={{
        maxWidth: 345,
        bgcolor: "transparent",
        border: "none",
        boxShadow: "none",
      }}
    >
      <CardMedia sx={{ height: 140 }} image={postImage} title="Post Media" />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          textAlign="left"
          fontWeight={800}
          sx={{ pb: 1 }}
        >
          {post?.title}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {post?.username}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {post?.category}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
