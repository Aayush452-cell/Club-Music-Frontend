import React, { useState } from "react";
import {
  Typography,
  FormHelperText,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  Grid,
  TextField,
  Button,
  Collapse,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const CreateRoomPage = (props) => {
  let navigate = useNavigate();
  let [votesToSkip, setvotesToSkip] = useState(props.votesToSkip);
  let [guestCanPause, setguestCanPause] = useState(props.guestCanPause);
  let [errorMsg, seterrorMsg] = useState("");
  let [successMsg, setsuccessMsg] = useState("");

  let handleVotesChange = (value) => {
    setvotesToSkip(value);
  };

  let handleGuestCanPauseChange = (value) => {
    setguestCanPause(value);
  };

  let handleRoomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };
    fetch("api/create-room/", requestOptions)
      .then((response) => response.json())
      .then((data) => navigate("/room/" + data.code));
  };

  let handleUpdateButtonPressed = () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
        code: props.roomcode,
      }),
    };
    fetch("/api/update-room/", requestOptions).then((response) => {
        if (response.ok) {
          setsuccessMsg("Room updated successfully !");
        } else {
          seterrorMsg("Error while updating room !");
        }
        props.updateCallback();
      });
    }

  let renderCreateButtons = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleRoomButtonPressed}
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  };

  let renderUpdateButtons = () => {
    return (
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleUpdateButtonPressed}
        >
          Update Room
        </Button>
      </Grid>
    );
  };

  const title = props.update ? "Update Room" : "Create A Room";

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Collapse in={errorMsg != "" || successMsg != ""}>
          {successMsg != "" ? (
            <Alert
              severity="success"
              onClose={() => {
                setsuccessMsg("");
              }}
            >
              {successMsg}
            </Alert>
          ) : (
            <Alert
              severity="error"
              onClose={() => {
                seterrorMsg("");
              }}
            >
              {errorMsg}
            </Alert>
          )}
        </Collapse>
      </Grid>

      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue={props.guestCanPause.toString()}
            onChange={(e) => handleGuestCanPauseChange(e.target.value)}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            onChange={(e) => handleVotesChange(e.target.value)}
            defaultValue={props.votesToSkip}
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
          />
          <FormHelperText>
            <div align="center">Votes Required To Skip Song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
        {props.update ? renderUpdateButtons() : renderCreateButtons()}
    </Grid>
  );
};

export default CreateRoomPage;
