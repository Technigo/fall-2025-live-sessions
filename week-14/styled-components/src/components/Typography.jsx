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


/*

// In some other file:
<Typography className="myTitle" variant='h2'>Title</Typography>
<Typography variant='p'>Lorem ipsum long text right here</Typography>

// Above renders this in the DOM:
<h2 class="typography typograph-h2 myTitle">Title</h2>
<p class="typography typograph-p myTitle">Lorem ipsum long text right here</p> 

*/
