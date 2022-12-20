import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Grid, Stack, Typography } from "@mui/material";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Detail from "../../components/details";
import CircularLoader from "../../components/circularLoader";

export default function AdminCounselorDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = async (id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUser(docSnap.data());
      setLoading(false);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if (params.id) {
      setLoading(true);
      fetchData(params.id);
    } else {
      navigate(`/counselors`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <div>
      <Detail
        prevTitle="Counselor"
        prev="/counselors"
        activeTitle="Details"
        active={`/counselor-detail/${params.id}`}
      >
        {loading ? (
          <CircularLoader />
        ) : (
          <>
            <Grid item xs={12}>
              <Avatar src={user?.file} sx={{ width: 80, height: 80 }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row">
                <Typography variant="h5">Name:</Typography>
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  {user?.name}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row">
                <Typography variant="h5">Email:</Typography>
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  {user?.email}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row">
                <Typography variant="h5">Gender:</Typography>
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  {user?.gender}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row">
                <Typography variant="h5">Days Available:</Typography>
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  {user?.availableDays?.join(" ,")}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} >
              <Stack direction="row">
                <Typography variant="h5" noWrap>Time Available:</Typography>
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  {user?.availableTime?.join(" ,")}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row">
                <Typography variant="h5">Bio:</Typography>
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  {user?.bio ? user.bio : "Not set yet"}
                </Typography>
              </Stack>
            </Grid>
          </>
        )}
      </Detail>
    </div>
  );
}
