// interface TypographyProps {
//     className?: string;
//     variant?: 'h1' | 'h2' | 'h3' | 'p';
//     children: React.ReactNode;
// }

export const Typography = (props) => {
  const ComponentEl = props.variant ? props.variant : 'p';

  return (
    <ComponentEl className={`typography typography-${props.variant} ${props.className || ''}`}>
      {props.children}
    </ComponentEl>
  );
};
