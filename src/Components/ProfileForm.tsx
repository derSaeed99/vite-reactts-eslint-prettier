import { Button, FormControlLabel, Grid, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { Switch, TextField } from "formik-mui";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { updateUserProfile } from "../firebase";
import { CaUser } from "../model";

interface UserProfileFormProps {
  userProfile: CaUser | null;
}

export interface UserProfileFormValues {
  userName: string;
  bio: string;
  mfaEnabled?: boolean;
}

export const ProfileForm = ({ userProfile }: UserProfileFormProps) => {
  const { userId } = useParams<{ userId: string }>();
  const [initialValues, setInitialValues] = useState<UserProfileFormValues>({
    userName: "",
    bio: "",
    mfaEnabled: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (userProfile) {
      setInitialValues({
        userName: userProfile.userName,
        bio: userProfile.bio ?? "",
        mfaEnabled: userProfile.mfaEnabled,
      });
    }
  }, [userProfile]);
  const handleSubmit = async (values: UserProfileFormValues) => {
    if (userId) {
      console.log(values.mfaEnabled);
      const updateData = {
        userName: values.userName || initialValues.userName,
        bio: values.bio || initialValues.bio,
        mfaEnabled: values.mfaEnabled,
      };
      try {
        await updateUserProfile(userId, updateData);
        navigate("/");
      } catch (e) {
        console.warn(e);
      }
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ dirty, values }) => (
        <Form>
          <Grid container direction="column" sx={{ mt: 2 }}>
            <Grid item>
              <Field
                sx={{
                  mb: 2,
                  color: "white",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  borderRadius: 50,
                  ":hover": {
                    color: "white",
                    border: "1px solid rgba(255, 255, 255, 0)",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 0.23)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                }}
                InputLabelProps={{ sx: { color: "white" } }}
                name="userName"
                component={TextField}
                label="Username"
              />
            </Grid>
            <Grid item>
              <Field
                sx={{
                  mb: 2,
                  color: "white",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  borderRadius: 50,
                  ":hover": {
                    color: "white",
                    border: "1px solid rgba(255, 255, 255, 0)",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 0.23)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                }}
                InputLabelProps={{ sx: { color: "white" } }}
                name="bio"
                component={TextField}
                label="Description"
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                checked={values.mfaEnabled}
                control={
                  <Field
                    sx={{
                      mb: 2,
                      ml: 1,
                      color: "white",
                      border: "1px solid rgba(255, 255, 255, 0.5)",
                      borderRadius: 50,
                      ":hover": {
                        color: "white",
                        border: "1px solid rgba(255, 255, 255, 0)",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "rgba(0, 0, 0, 0.23)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                    }}
                    type="checkbox"
                    name="mfaEnabled"
                    component={Switch}
                  />
                }
                labelPlacement="end"
                label={
                  <Typography sx={{ mb: 2, ml: 2 }} color="white">
                    Multi-Factor Auth
                  </Typography>
                }
              />
            </Grid>
            <Grid item>
              <Button type="submit" disabled={!dirty}>
                Save
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
