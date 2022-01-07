import React from "react";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";
import { BASE_URL } from "../config";

const Room = (props) => {
  let { roomcode } = useParams();
  let defaultVotes = 2;
  let navigate = useNavigate();

  let [votesToSkip, setvotesToSkip] = useState(defaultVotes);
  let [guestCanPause, setguestCanPause] = useState(true);
  let [IsHost, setIsHost] = useState(false);
  let [showSettings, setshowSettings] = useState(false);
  let [spotifyauthenticated, setspotifyauthenticated] = useState(false);
  let [song, setsong] = useState({});

  useEffect(() => {
    getRoom();
  }, [roomcode]);

  let getRoom = async () => {
    let response = await fetch(BASE_URL+"/api/get-room" + "?code=" + roomcode);
    if (!response.ok) {
      navigate("/");
      return;
    }
    let data = await response.json();
    setvotesToSkip(data.votes_to_skip);
    setguestCanPause(data.guest_can_pause);
    setIsHost(data.is_host);
    console.log(data.is_host);
    authenticateSpotify();
    setInterval(getCurrentSong, 1000);
    
  };

  let getCurrentSong = () => {
      fetch(BASE_URL+"/spotify/current-song")
      .then((response) => {
          if(!response.ok){
              return {};
          } else {
              return response.json();
          }
      })
      .then((data) => {
            setsong(data);
            //console.log(data);
      }).catch(err => {
              navigate("/");
            });
  }

  let authenticateSpotify = () => {
      console.log("authenticating");
      fetch(BASE_URL+"/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
            setspotifyauthenticated(data.status);
            console.log(data.status);
            if(!data.status){
                fetch("/spotify/get-auth-url")
                .then((response) => response.json())
                .then((data) => {
                    window.location.replace(data.url);
                });
            }
      }).catch(err => {
              navigate("/");
            });
  }

  let leaveButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch(BASE_URL+"/api/leave-room/", requestOptions).then((_response) => {
      navigate("/");
    });
  }

  let renderSettingsButton = () => {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setshowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  };

  let renderSettings = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage
            update={true}
            votesToSkip={votesToSkip}
            guestCanPause={guestCanPause}
            roomcode={roomcode}
            updateCallback={getRoom}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setshowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  };

  if (showSettings) {
    return renderSettings();
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code: {roomcode}
        </Typography>
      </Grid>
      <MusicPlayer {...song}/> 
      {IsHost ? renderSettingsButton() : null}
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={leaveButtonPressed}
        >
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
};

export default Room;
