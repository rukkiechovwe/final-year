import * as Yup from "yup";
import { Formik } from "formik";
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  TextareaAutosize,
} from "@mui/material";

const UpdateProfileForm = () => {
  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        bio: "",
        image: "",
        gender: "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        firstname: Yup.string().max(255).required("First Name is required"),
        lastname: Yup.string().max(255).required("Last Name is required"),
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        password: Yup.string().max(255).required("Password is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          setStatus({ success: false });
          setSubmitting(false);
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
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
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
                <OutlinedInput
                  id="firstname-login"
                  type="firstname"
                  value={values.firstname}
                  name="firstname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="John"
                  fullWidth
                  error={Boolean(touched.firstname && errors.firstname)}
                />
                {touched.firstname && errors.firstname && (
                  <FormHelperText error id="helper-text-firstname-signup">
                    {errors.firstname}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.lastname && errors.lastname)}
                  id="lastname-signup"
                  type="lastname"
                  value={values.lastname}
                  name="lastname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Doe"
                  inputProps={{}}
                />
                {touched.lastname && errors.lastname && (
                  <FormHelperText error id="helper-text-lastname-signup">
                    {errors.lastname}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                  id="email-login"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="name@faculty.uniben.edu"
                  inputProps={{}}
                />
                {touched.email && errors.email && (
                  <FormHelperText error id="helper-text-email-signup">
                    {errors.email}
                  </FormHelperText>
                )}
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
                    onChange={handleChange}
                    type="file"
                    hidden
                  />
                </Button>

                {touched.image && errors.image && (
                  <FormHelperText error id="helper-text-image-signup">
                    {errors.image}
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
