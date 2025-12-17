/* 
  EXERCISE 5: Programmatic Navigation with useNavigate
  -----------------------------------------------------
  In this exercise, you'll use the useNavigate hook to navigate
  programmatically after a form submission.
  
  Steps:
  1. Import useNavigate from "react-router"
  2. Call useNavigate() to get the navigate function
  3. Use navigate("/path") to redirect after form submission
*/

// TODO: Import useNavigate from "react-router"

export const Contact = () => {
  // TODO: Get the navigate function using useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (not really, this is just a demo)");

    // TODO: Use navigate() to redirect to the home page after submission
  };

  return (
    <div className="page contact">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required />
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};
