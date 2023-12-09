import { CardMedia, Divider, Grid, List, ListItem } from "@mui/material";

import { CaPost } from "../../model";
import { PostFooter } from "./PostFooter";
import { PostHeader } from "./PostHeader";

interface PostsListProps {
  posts: CaPost[];
}

export const PostsList = ({ posts }: PostsListProps) => {
  return (
    <List>
      {posts?.map((post) => (
        <>
          <ListItem key={post.postId} sx={{ borderRadius: "8px" }}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Grid item xs={12} sm={12}>
                <PostHeader post={post} />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CardMedia
                  component="img"
                  src={post.mediaUrl}
                  alt={post.caption}
                  style={{
                    width: "100%",
                    objectFit: "contain",
                  }}
                  sx={{ maxHeight: "45vh", p: 0, m: 0 }}
                />
              </Grid>
              <Grid item xs={12}>
                <PostFooter post={post} />
              </Grid>
            </Grid>
          </ListItem>
          <Grid item xs={12}>
            <Divider sx={{ borderColor: "GrayText" }} />
          </Grid>
        </>
      ))}
    </List>
  );
};
