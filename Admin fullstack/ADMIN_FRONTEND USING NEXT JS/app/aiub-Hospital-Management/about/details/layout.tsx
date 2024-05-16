import React, { ReactNode } from "react";

const details =({children}:{children:ReactNode})=>
{
  return(
<>
<div>About us</div>
<div>{children}</div>

</>
  
 
);

}

export default details