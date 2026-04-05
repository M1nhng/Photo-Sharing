import React from "react";
import { AppBar, Toolbar, Typography, FormControlLabel, Checkbox } from "@mui/material";
import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 * Left side: student name
 * Right side: context reflecting what is shown in main content region
 */
function TopBar({ context, advancedFeatures, onToggleAdvancedFeatures }) {
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar className="topbar-toolbar">
        <Typography variant="h5" color="inherit" className="topbar-name">
          Nguyễn Chu Minh-B23DCDT170
        </Typography>
        <div className="topbar-spacer" />
        {onToggleAdvancedFeatures !== undefined && (
          <FormControlLabel
            control={
              <Checkbox
                checked={advancedFeatures}
                onChange={onToggleAdvancedFeatures}
                sx={{ color: "white", "&.Mui-checked": { color: "white" } }}
              />
            }
            label={
              <Typography variant="body2" color="inherit">
                Enable Advanced Features
              </Typography>
            }
            className="topbar-checkbox"
          />
        )}
        {context && (
          <Typography variant="h6" color="inherit" className="topbar-context">
            {context}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
