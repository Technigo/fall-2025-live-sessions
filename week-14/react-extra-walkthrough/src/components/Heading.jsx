export const Heading = (props) => {
  const HeadingElement = props.variant || "h2";

  // if (props.variant === 'h1') {
  //   return <h1>{props.children}</h1>
  // } else if (props.variant === 'h2') {
  //   return <h2>{props.children}</h2>
  // }

  return (
    <HeadingElement style={{ color: props.color }} onClick={props.onClick}>
      {props.children}
    </HeadingElement>
  );
};
