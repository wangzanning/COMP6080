//write in function component
import React from "react";
function RenderContent(props){
  console.log(props.val);
  return (
    <div key={props.val[0]}>
      <img width="50px" height="50px" src={props.val[1]}  alt={props.val[0]}/><br/>
      <a href={props.val[2]}>{props.val[0]}</a>
    </div>
  )
}
export default RenderContent;