/* 
  This is a 404 Not Found page.
  It will be shown when the user navigates to a route that doesn't exist.
  
  In App.jsx, this will be used with a catch-all route:
  <Route path="*" element={<NotFound />} />
*/

// TODO: Import Link from "react-router" to add navigation back to home

export const NotFound = () => {
  return (
    <div className="page not-found">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>

      {/* TODO: Add a Link back to the home page */}
    </div>
  );
};
