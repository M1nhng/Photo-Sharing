import React, { useState, useEffect } from "react";
import {
  Typography,
  Divider,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Format a date string to a user-friendly format.
 */
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * UserPhotos - Normal mode: shows ALL photos with comments.
 * Advanced mode: shows ONE photo at a time with stepper.
 */
function UserPhotos({ setTopBarContext, advancedFeatures }) {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [userName, setUserName] = useState("");
  // For advanced mode: track current photo index via URL or state
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchModel(`/photosOfUser/${userId}`).then((data) => {
      setPhotos(data.data);
    });
    fetchModel(`/user/${userId}`).then((data) => {
      const name = `${data.data.first_name} ${data.data.last_name}`;
      setUserName(name);
      if (setTopBarContext) {
        setTopBarContext(`Photos of ${name}`);
      }
    });
  }, [userId, setTopBarContext]);

  // Reset index when switching users or mode
  useEffect(() => {
    setCurrentIndex(0);
  }, [userId, advancedFeatures]);

  if (!photos.length) {
    return (
      <div className="userphotos-container">
        <Typography>No photos found for this user.</Typography>
      </div>
    );
  }

  // ---- ADVANCED MODE: single photo with stepper ----
  if (advancedFeatures) {
    const photo = photos[currentIndex];
    return (
      <div className="userphotos-container">
        <Typography variant="h5" className="userphotos-title">
          Photos of {userName}
        </Typography>
        <Divider className="userphotos-divider" />

        {/* Stepper controls */}
        <div className="userphotos-stepper">
          <IconButton
            onClick={() => setCurrentIndex((i) => i - 1)}
            disabled={currentIndex === 0}
            color="primary"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="body2" className="userphotos-stepper-label">
            Photo {currentIndex + 1} / {photos.length}
          </Typography>
          <IconButton
            onClick={() => setCurrentIndex((i) => i + 1)}
            disabled={currentIndex === photos.length - 1}
            color="primary"
          >
            <ArrowForwardIcon />
          </IconButton>
        </div>

        {/* Single photo */}
        <PhotoCard photo={photo} />
      </div>
    );
  }

  // ---- NORMAL MODE: all photos ----
  return (
    <div className="userphotos-container">
      <Typography variant="h5" className="userphotos-title">
        Photos of {userName}
      </Typography>
      <Divider className="userphotos-divider" />
      {photos.map((photo) => (
        <PhotoCard key={photo._id} photo={photo} />
      ))}
    </div>
  );
}

/**
 * PhotoCard - renders a single photo with its comments.
 */
function PhotoCard({ photo }) {
  return (
    <Card className="photo-card" elevation={2}>
      <CardMedia
        component="img"
        image={`/images/${photo.file_name}`}
        alt={photo.file_name}
        className="photo-img"
      />
      <CardContent>
        <Typography variant="caption" color="text.secondary" className="photo-date">
          📅 {formatDate(photo.date_time)}
        </Typography>
        {photo.comments && photo.comments.length > 0 && (
          <div className="photo-comments-section">
            <Typography variant="subtitle2" className="photo-comments-header">
              Comments ({photo.comments.length})
            </Typography>
            <Divider />
            {photo.comments.map((comment) => (
              <div key={comment._id} className="comment-block">
                <div className="comment-header">
                  <Typography variant="body2" className="comment-author">
                    <Link
                      to={`/users/${comment.user._id}`}
                      className="comment-author-link"
                    >
                      {comment.user.first_name} {comment.user.last_name}
                    </Link>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(comment.date_time)}
                  </Typography>
                </div>
                <Typography variant="body2" className="comment-text">
                  {comment.comment}
                </Typography>
                <Divider className="comment-divider" />
              </div>
            ))}
          </div>
        )}
        {(!photo.comments || photo.comments.length === 0) && (
          <Typography variant="body2" color="text.secondary" className="no-comments">
            No comments yet.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default UserPhotos;
