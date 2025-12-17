/*
  EXERCISE 9: useLocation + useEffect
  ------------------------------------
  useLocation gives you information about the current URL.
  Combined with useEffect, you can react to route changes!

  Common use cases:
  - Track page views for analytics
  - Scroll to top on navigation
  - Reset form state when navigating away
  - Show different content based on URL

  Steps:
  1. Import useLocation from "react-router"
  2. Import useState and useEffect from "react"
  3. Create a page view counter that updates on navigation
  4. Log each page visit to the console
*/

// TODO: Import useLocation from "react-router"
import { useLocation } from "react-router";
// TODO: Import useState and useEffect from "react"
import { useState, useEffect } from "react";

export const Dashboard = () => {
  // TODO: Get the current location
  const location = useLocation();

  // TODO: Create state to track navigation history
  const [navigationHistory, setNavigationHistory] = useState([]);

  // TODO: Use useEffect to track page views
  useEffect(() => {
    // This runs every time the URL changes
    console.log("📍 Page viewed:", location.pathname);

    // Add to navigation history
    setNavigationHistory((prev) => [
      ...prev,
      {
        path: location.pathname,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    // In a real app, you might:
    // - Send analytics data
    // - Scroll to top of page
    // - Reset some component state
  }, [location.pathname]); // 👈 Re-run when pathname changes

  return (
    <div className="page dashboard">
      <h1>Dashboard</h1>
      <p>
        This page demonstrates tracking navigation with useLocation + useEffect.
      </p>

      <div className="dashboard-section">
        <h2>Navigation History</h2>
        <p>Navigate around the app and watch the history grow!</p>
        {/* This does not work, moved to Navigation instead! */}

        <ul className="history-list">
          {navigationHistory.map((entry, index) => (
            <li key={index}>
              <span className="history-time">{entry.timestamp}</span>
              <span className="history-path">{entry.path}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
