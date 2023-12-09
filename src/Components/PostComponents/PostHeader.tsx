import { MoreVert } from "@mui/icons-material";
import { Box, IconButton, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth, subscribeToUser } from "../../firebase";
import { CaPost, CaUser } from "../../model";
import { UserPublicCard } from "../../utils/UserPublicCard";

interface PostHeaderProps {
  post: CaPost;
}

export const PostHeader = ({ post }: PostHeaderProps) => {
  const [userProfile, setUserProfile] = useState<CaUser | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (post.userId) {
      const unsubscribeToUserProfile = subscribeToUser({
        userId: post.userId,
        observer: (profile: CaUser | null) => {
          setUserProfile(profile);
        },
        onError: (error) => {
          setUserProfile(null);
          console.error(error);
        },
      });
      return () => {
        unsubscribeToUserProfile();
      };
    }
  }, [post.userId]);
  const handleMoreVert = () => {
    if (!auth.currentUser) {
      navigate("/signin");
    }
    console.log("report post");
  };
  return (
    <Box>
      <ListItemText
        sx={{
          mt: 2,
          mb: 2,
        }}
        primary={<UserPublicCard user={userProfile} />}
        secondary={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              color={"white"}
              fontWeight={"bold"}
              sx={{
                overflowWrap: "break-word",
                wordBreak: "break-word",
              }}
            >
              {post.caption}
            </Typography>
            <IconButton onClick={handleMoreVert}>
              <MoreVert sx={{ color: "white" }} />
            </IconButton>
          </Box>
        }
      />
    </Box>
  );
};
