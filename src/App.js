import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Button, IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import Draggable from "react-draggable";
import { Download, FileUpload } from "@mui/icons-material";
import {styled} from "@mui/system"
import uenrLogo from "./uenr-logo.png";
import hostlinkLogo from "./hostlink-logo.jpg"
import { Box } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "10px",
  },
  input: {
    display: "none",
  },
  previewContainer: {
    position: "relative",
  },
  logo: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
}));

function App() {
  const classes = useStyles();
  const [image, setImage] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [logo, setLogo] = useState(uenrLogo)
  const handleUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const logoImg = new Image();
      logoImg.onload = () => {
        ctx.drawImage(logoImg, position.x, position.y);
        const a = document.createElement("a");
        a.download = "edited-image.png";
        a.href = canvas.toDataURL();
        a.click();
      };
      logoImg.src = logo;
    };
    img.src = image;
  };


  const DispImage = styled("img")({
    maxWidth: "90%",
    maxHeight: "auto",
    textAlign: "center"
  });

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        onChange={handleUpload}
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <FileUpload />
        </IconButton>
      </label>
      <Box>
        <Button
          sx={{ margin: "5px 0" }}
          variant="contained"
          onClick={() => {
            setLogo(logo === uenrLogo ? hostlinkLogo : uenrLogo);
          }}
        >
          Switch logo
        </Button>
      </Box>
      {image ? (
        <div className={classes.previewContainer}>
          <Draggable
            handle=".logo-handle"
            defaultPosition={{ x: 0, y: 0 }}
            position={position}
            onDrag={handleDrag}
          >
            <div className={`${classes.logo} logo-handle`}>
              <img src={logo} alt="logo" />
            </div>
          </Draggable>
          <div className="disp-image">
            <DispImage src={image} alt="preview" />
          </div>
        </div>
      ) : (
        <Typography>Upload an image</Typography>
      )}
      {image && (
        <Button
        sx={{margin:"5px 0"}}
          startIcon={<Download />}
          variant="contained"
          color="primary"
          onClick={handleDownload}
        >
          Save
        </Button>
      )}
    </div>
  );
}

export default App;
