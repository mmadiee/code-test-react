import React, { useState } from "react";

function Item(prop) {
  const [isHidden, setIsHidden] = useState(true);

  const handleViewClick = () => {
    setIsHidden(!isHidden);
  };

  //Determine Status
  let status = "";
  if (prop.mission.upcoming) {
    status = "Upcoming";
  } else if (prop.mission.launch_success === false) {
    status = "Failed";
  } else if (prop.mission.launch_success === true) {
    status = "Success";
  }

  //Color for status
  const getStatusColor = (status) => {
    if (status === "Success") {
      return "green";
    } else if (status === "Failed") {
      return "red";
    } else if (status === "Upcoming") {
      return "cyan";
    }
    return "transparent";
  };

  // Determine Time Difference
  const currentYear = new Date().getFullYear();
  const launchYear = parseInt(prop.mission.launch_year);
  let launchDate = "";

  if (launchYear > currentYear) {
    const yearsRemaining = launchYear - currentYear;
    launchDate = `In ${yearsRemaining} year${yearsRemaining > 1 ? "s" : ""}`;
  } else if (launchYear < currentYear) {
    const yearsPassed = currentYear - launchYear;
    launchDate = `${yearsPassed} year${yearsPassed > 1 ? "s" : ""} ago`;
  } else {
    launchDate = "This year";
  }

  //Links
  let linksElement = [];
  if (prop.mission.links) {
    const filteredLinks = [
      ["article_link", prop.mission.links.article_link, "Article"],
      ["video_link", prop.mission.links.video_link, "Video"]
    ];
    linksElement = filteredLinks
      .filter(([key, value]) => value)
      .map(([key, value, name], index, array) => (
        <p key={key} className="card-links">
          {" | "}
          <a href={value} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        </p>
      ));
  }

  //Image
  let imageElement = (prop.mission.links && prop.mission.links.mission_patch ? (
    <img
      src={prop.mission.links.mission_patch}
      alt="Mission Patch"
      style={{ maxWidth: '100px', maxHeight: '100px' }}
    />
  ) : (
    <p>No image available</p>
  ))

  return (
    <div className="card">
      <div className="card-header">
        <h1 className="card-title">{prop.mission.mission_name}</h1>
        <div style={{
          backgroundColor: getStatusColor(status),
        }} className="card-status">{status}</div>
      </div>
      <div className="card-hidden-area" style={{ display: isHidden ? 'none' : 'block' }}>
        <div className="card-date-links">
          <p>{launchDate}</p>
          {linksElement}
        </div>
        <div className="card-image-description">
          {imageElement}
          <p className="card-details">{prop.mission.details ? prop.mission.details : "No details available"}</p>
        </div>
      </div>
      <button className="card-button" onClick={handleViewClick}>
        {isHidden ? 'VIEW' : 'HIDE'}
      </button>
    </div>
  )
}
export default Item;