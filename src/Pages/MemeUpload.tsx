import { Box, Grid } from "@mui/material";

import { MemeForm } from "../Components/MemeForm";
import { TopBar } from "../Components/TopBar";
export const MemeUpload = () => {
  return (
    <>
      <TopBar />
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid item sm={4}>
          <Box sx={{ mt: 4 }}>
            <MemeForm />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
