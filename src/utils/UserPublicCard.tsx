import { Avatar, Box, Typography } from "@mui/material";

import { CaUser } from "../model";
import { UserMFABadge } from "./UserMFABadge";

interface UserPrublicCardProps {
  user: CaUser | null;
}

export const UserPublicCard = ({ user }: UserPrublicCardProps) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Avatar src={user?.photoUrl} alt={"profile pic"} />
        <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ mr: 1 }} variant="caption" color="white">
              {user?.userName}
            </Typography>
            {user?.mfaEnabled && (
              <UserMFABadge value={user?.mfaEnabled ?? false} />
            )}
          </Box>
          <Typography variant="caption" color="white">
            N#{user?.userNumber}
          </Typography>
          <Typography variant="caption" color="white">
            P#{user?.postCount}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
