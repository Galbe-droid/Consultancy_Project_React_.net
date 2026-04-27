import { Typography, Grid, Card, CardContent } from "@mui/material";

function SmallCard({ title, value }: { title: string; value: string }) {
    return (
        <Grid sx={{
            xs: 12,
            md: 4
        }}>
          <Card sx={{ background: "#1e1e1e" }}>
            <CardContent>
              <Typography color="text.secondary">{title}</Typography>
              <Typography variant="h5">{value}</Typography>
            </CardContent>
          </Card>
        </Grid>
    )
}

export default SmallCard