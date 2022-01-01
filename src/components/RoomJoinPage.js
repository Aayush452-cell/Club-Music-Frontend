import React,{useState} from "react";
import { useNavigate } from "react-router";
import { TextField,Button,Grid,Typography } from "@mui/material";
import { Link } from "react-router-dom";

const RoomJoinPage = () => {
  
    let [roomCode,setRoomCode] = useState("");
    let [error,setError] = useState("");
    let navigate = useNavigate();

    let handleRoomCodeChange = (value) => {
        setRoomCode(value);
    }

    let roomButtonPressed = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code: roomCode,
            }),
        };
        fetch(BASE_URL+'api/join-room/', requestOptions)
            .then((response) => {
                if(response.ok){
                    navigate("/room/"+roomCode);
                }
                else{
                    setError("Room code not found");
                }
            })
            .catch((error)=>{
                console.log(error);
            });
    }
 

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Join a Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            error={error}
            label="Code"
            placeholder="Enter a Room Code"
            value={roomCode}
            helperText={error}
            variant="outlined"
            onChange={(e)=>handleRoomCodeChange(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="primary"
            onClick={roomButtonPressed}
          >
            Enter Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="secondary" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default RoomJoinPage;
