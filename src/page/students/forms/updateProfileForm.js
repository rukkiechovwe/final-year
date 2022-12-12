import { Formik } from "formik";
import { doc, updateDoc } from "firebase/firestore";
import { Button, Grid, InputLabel, OutlinedInput, Stack } from "@mui/material";
import useAuth from "../../../utils/hooks/useAuth";
import Switch from "@mui/material/Switch";
import { db } from "../../../firebase";

const UpdateProfileForm = () => {
  const { user } = useAuth();
  console.log(user?.id);
  return (
    <Formik
      initialValues={{
        anon: user?.annonymous_stat,
        submit: null,
      }}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          setSubmitting(true);
          const student = doc(db, "users", user?.id);
          await updateDoc(student, {
            annonymous_stat: values.anon,
          });
          setStatus({ success: true });
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
        } 
        finally {
          setSubmitting(false);
        }
      }}
    >
      {({ handleSubmit, isSubmitting, values, setFieldValue }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* name, email, deparment, gender, annonymous status */}
            {/* user can only update annonymouse status */}
            <Grid item xs={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="name-signup">Full Name</InputLabel>
                <OutlinedInput
                  id="name-login"
                  type="name"
                  value={user?.name}
                  name="name"
                  placeholder="John Doe"
                  fullWidth
                  disabled
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email-signup">Email Address</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="email-login"
                  type="email"
                  value={user?.email}
                  name="email"
                  placeholder="name@faculty.uniben.edu"
                  disabled
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="department-signup">Department</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="department-login"
                  type="department"
                  value={user?.department}
                  name="department"
                  placeholder="Computer Science"
                  disabled
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="gender-signup">Gender</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="gender-login"
                  type="gender"
                  value={user?.gender}
                  name="gender"
                  placeholder="Male"
                  disabled
                />
              </Stack>
            </Grid>

            <Grid item xs={6}>
              <Stack spacing={1} direction="row" alignItems="center">
                <InputLabel htmlFor="department-signup">Anonymous</InputLabel>
                <Switch
                  value={values.anon}
                  onChange={(event, checked) => {
                    setFieldValue("anon", checked);
                  }}
                />
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
