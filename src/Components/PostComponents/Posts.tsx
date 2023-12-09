import AddIcon from "@mui/icons-material/Add";
import { Box, Fab, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { subscribeToMemes } from "../../firebase";
import { CaPost } from "../../model";
import { PostsList } from "./PostsList";

export const Posts = () => {
  const [posts, setPosts] = useState<CaPost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeToMemes = subscribeToMemes((memes) => {
      if (memes) {
        setPosts(memes);
      } else {
        console.error("no user");
      }
    });
    return () => {
      unsubscribeToMemes();
    };
  }, [navigate]);
  return (
    <Grid
      container
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <PostsList posts={posts} />
      <Box sx={{ position: "fixed", bottom: "32px", right: "32px" }}>
        <Link to="/meme-upload">
          <Fab
            sx={{ color: "purple", backgroundColor: "yellow" }}
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        </Link>
      </Box>
    </Grid>
  );
};
