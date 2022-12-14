import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function CounselorSummary({ name, gender, image }) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="150"
        image={image}
        alt="green iguana"
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h3">{name}</Typography>
        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          {gender}
        </Typography>
      </CardContent>
    </Card>
  );
}
