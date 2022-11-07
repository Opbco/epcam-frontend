import React from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { Container, Typography } from "@mui/material";
import ImageHome from "./../assets/home_image.jpg";

const Grid = styled("div")(({ theme }) => ({
  display: "flex",
  margin: "2rem auto",
  flexDirection: "column",
  gap: 40,
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));

const GridLeft = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const GridRight = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const Home = () => {
  return (
    <Container>
      <Grid>
        <GridLeft>
          <Avatar
            alt="MINESUP"
            src={ImageHome}
            sx={{ width: "100%", height: "auto" }}
          />
        </GridLeft>
        <GridRight>
          <Typography variant="body1" gutterBottom component="p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
            voluptatibus. Repudiandae non laborum consequuntur molestias, labore
            necessitatibus consectetur asperiores repellendus iste? Temporibus
            quos est ducimus minima recusandae porro repellendus architecto?
          </Typography>
        </GridRight>
      </Grid>
    </Container>
  );
};

export default Home;
