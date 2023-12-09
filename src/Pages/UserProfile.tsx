import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ProfileForm } from "../Components/ProfileForm";
import { ProfileInfos } from "../Components/ProfileInfos";
import { subscribeToUser } from "../firebase";
import { CaUser } from "../model";

export const UserProfile = () => {
  const [userProfile, setUserProfile] = useState<CaUser | null>(null);
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    if (userId) {
      const unsubscribeToUserProfile = subscribeToUser({
        userId: userId,
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
  }, [userId]);
  return (
    <Grid
      container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Grid item sm={4}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 2,
            mb: 4,
          }}
        >
          <IconButton onClick={() => navigate("/")}>
            <ArrowBackIosNewRoundedIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography sx={{ color: "white" }}>Home</Typography>
        </Box>
        <Box>
          <ProfileInfos userProfile={userProfile} />
          <ProfileForm userProfile={userProfile} />
        </Box>
      </Grid>
    </Grid>
  );
};
