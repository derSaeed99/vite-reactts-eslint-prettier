import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Box, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { auth } from "../../firebase";
import { CaPost } from "../../model";

interface PostFooterProps {
  post: CaPost;
}
export const PostFooter = ({ post }: PostFooterProps) => {
  const navigate = useNavigate();
  const handleUpvote = () => {
    if (!auth.currentUser) {
      navigate("/signin");
    }
    console.log("upvote");
  };
  const handleDownVote = () => {
    if (!auth.currentUser) {
      navigate("/signin");
    }
    console.log("downvote");
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        mt: 1,
      }}
    >
      <IconButton
        size="medium"
        sx={{ color: "GrayText" }}
        onClick={handleUpvote}
      >
        <ThumbUpOffAltIcon />
      </IconButton>
      <Box>
        <Typography variant="body1" sx={{ color: "GrayText" }}>
          {post.upvotes}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
        <IconButton
          size="medium"
          sx={{ color: "GrayText" }}
          onClick={handleDownVote}
        >
          <ThumbDownOffAltIcon />
        </IconButton>
        <Typography variant="body1" sx={{ color: "GrayText", ml: 1 }}>
          {post.downvotes}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
        <IconButton size="medium" sx={{ color: "GrayText" }}>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <Typography variant="body1" sx={{ color: "GrayText", ml: 1 }}>
          {Math.floor(Math.random() * 100)}
        </Typography>
      </Box>
    </Box>
  );
};
