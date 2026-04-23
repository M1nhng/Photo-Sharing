import React, { useState, useEffect } from "react";
import { Typography, Button, Divider, Paper } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserDetail, a React component of Project 4.
 * Displays details of a specific user and a link to view their photos.
 */
function UserDetail({ setTopBarContext }) {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    fetchModel(`/user/${userId}`)
      .then((data) => {
        setUser(data.data);
        if (setTopBarContext) {
          setTopBarContext(`${data.data.first_name} ${data.data.last_name}`);
        }
      })
      .catch((err) => {
        setUser(null);
        setError(err.message || "Cannot load user details");
      });
  }, [userId, setTopBarContext]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div className="userdetail-container">
      <Typography variant="h4" className="userdetail-name">
        {user.first_name} {user.last_name}
      </Typography>
      <Divider className="userdetail-divider" />
      <Paper elevation={0} className="userdetail-info">
        <div className="userdetail-row">
          <Typography variant="subtitle1" className="userdetail-label">Location:</Typography>
          <Typography variant="body1">{user.location}</Typography>
        </div>
        <div className="userdetail-row">
          <Typography variant="subtitle1" className="userdetail-label">Occupation:</Typography>
          <Typography variant="body1">{user.occupation}</Typography>
        </div>
        <div className="userdetail-row">
          <Typography variant="subtitle1" className="userdetail-label">Description:</Typography>
          <Typography variant="body1">{user.description}</Typography>
        </div>
      </Paper>
      <Button
        variant="contained"
        component={Link}
        to={`/photos/${user._id}`}
        className="userdetail-btn"
      >
        View Photos
      </Button>
    </div>
  );
}

export default UserDetail;
