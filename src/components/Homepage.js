import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, ButtonGroup, Button } from "@mui/material";
import { useNavigate } from "react-router";

const Homepage = () => {

   let navigate = useNavigate();
   
   useEffect(() => {
        (async () => {
            fetch("api/user-in-room/")
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                if(data.code !== undefined && data.code !== null){
                    console.log(data.code)
                    console.log("hello")
                    navigate("/room/" + data.code);
                }
                else{
                    navigate("/");
                }
            });
        })()
   },[])

   
   

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <Typography variant="h3" compact="h3">
          Club Music
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button color="primary" to="/join" component={Link}>
            Join a Room
          </Button>
          <Button color="secondary" to="/create" component={Link}>
            Create a Room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default Homepage;
