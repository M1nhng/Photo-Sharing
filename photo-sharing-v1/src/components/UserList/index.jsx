import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 * Displays a list of all users. Clicking a user navigates to their UserDetail.
 */
function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchModel("/user/list")
      .then((data) => {
        setUsers(data.data);
      })
      .catch((err) => {
        setError(err.message || "Cannot load users");
      });
  }, []);

  return (
    <div>
      <Typography variant="h6" className="userlist-title">
        Users
      </Typography>
      <Divider />
      {error ? (
        <Typography color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      ) : null}
      <List component="nav" className="userlist-list">
        {users.map((user) => (
          <React.Fragment key={user._id}>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={`/users/${user._id}`}>
                <ListItemText primary={`${user.first_name} ${user.last_name}`} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;
