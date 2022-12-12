import * as Yup from "yup";
import { Formik } from "formik";
import { doc, updateDoc } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  TextareaAutosize,
} from "@mui/material";
import useAuth from "../../../utils/hooks/useAuth";
import { db, storage } from "../../../firebase";

const UpdateProfileForm = () => {
  const { user } = useAuth();

  return (
    <Formik
      initialValues={{
        bio: "",
        file: "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        file: Yup.string().max(255).required("Image is required"),
        bio: Yup.string()
          .max(255)
          .required("A short bio of yourself is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        setSubmitting(true);
        const storageRef = ref(storage, `images/${user.name}`);
        uploadBytes(storageRef, values.file)
          .then((_) => {
            console.log("uploaded");
            getDownloadURL(ref(storage, storageRef)).then(async (url) => {
              // update firestore with counselors data
              const counselor = doc(db, "users", user?.id);
              await updateDoc(counselor, {
                bio: values.bio,
                file: url,
              });
              setStatus({ success: true });
            });
          })
          .catch((err) => {
            console.log(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
          });
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        setFieldValue,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="fullname-profile">Full Name*</InputLabel>
                <OutlinedInput
                  id="fullname-profile"
                  type="fullname"
                  value={user.name}
                  name="fullname"
                  placeholder="John Doe"
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email-profile">Email Address*</InputLabel>
                <OutlinedInput
                  id="email-profile"
                  type="email"
                  value={user.email}
                  name="email"
                  placeholder="counselor@gmail.com"
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="gender-profile">Gender</InputLabel>
                <OutlinedInput
                  id="gender-profile"
                  type="gender"
                  value={user.gender}
                  name="gender"
                  placeholder="Male"
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="image-signup">Upload Image</InputLabel>
                <Button variant="oulined" component="label">
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.image && errors.image)}
                    id="image-signup"
                    value={values.image}
                    name="image"
                    onBlur={handleBlur}
                    type="file"
                    hidden
                    onChange={(event) => {
                      console.log(event.currentTarget.files[0]);
                      setFieldValue("file", event.currentTarget.files[0]);
                    }}
                  />
                </Button>

                {touched.file && errors.file && (
                  <FormHelperText error id="helper-text-image-signup">
                    {errors.file}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="bio">Short Bio*</InputLabel>
                <TextareaAutosize
                  error={Boolean(touched.bio && errors.bio)}
                  id="bio"
                  type="bio"
                  value={values.bio}
                  name="bio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  minRows={5}
                  placeholder="Short Bio"
                />
                {touched.bio && errors.bio && (
                  <FormHelperText error id="helper-text-bio-signup">
                    {errors.bio}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>

            <Grid item xs={8} />
            <Grid item xs={4}>
              <Button
                disableElevation
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
              >
                Update Profile
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default UpdateProfileForm;
