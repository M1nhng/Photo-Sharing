import './App.css';

import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

const App = () => {
  const [topBarContext, setTopBarContext] = useState("");
  const [advancedFeatures, setAdvancedFeatures] = useState(false);

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar
              context={topBarContext}
              advancedFeatures={advancedFeatures}
              onToggleAdvancedFeatures={() => setAdvancedFeatures((prev) => !prev)}
            />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList />
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route path="/" element={<Navigate to="/users" replace />} />
                <Route
                  path="/users/:userId"
                  element={<UserDetail setTopBarContext={setTopBarContext} />}
                />
                <Route
                  path="/photos/:userId"
                  element={
                    <UserPhotos
                      setTopBarContext={setTopBarContext}
                      advancedFeatures={advancedFeatures}
                    />
                  }
                />
                <Route path="/users" element={<UserList />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
