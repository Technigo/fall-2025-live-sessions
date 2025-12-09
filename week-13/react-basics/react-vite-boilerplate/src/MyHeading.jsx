export const MyHeading = (props) => {
  console.log("props", props);

  return <h1 className={props.className}>{props.children}</h1>;
};
