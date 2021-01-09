//<!--z5224151	ZANNING WANG-->
// <!--2020.10.27	Tuesday-->
// <!--Lab07-exercise2-->
import React, {useEffect,useState, useRef} from 'react';
import './App.css';
import RenderAPP from './render'

let timeoout = null;

function App() {
  const [nameList, setNameList] = useState([]);
  const [content,setContent] = useState([]);
  const input = useRef();
  //fetch the content in useEffect
  useEffect(()=>{
    let webContent = [];
    console.log(nameList);
    Promise.all(
    nameList.map((item)=>
      fetch(`https://api.github.com/users/${item}`).then(res => res.json())
    )).then(res=>{
      console.log(res);
      webContent = res.map((item)=>[item.name, item.avatar_url, item.url])
      console.log(webContent);
      setContent(webContent);
    });
    console.log(content);
  },[nameList])

  //handle change after 500ms
  function handleChange(event){
    clearTimeout(timeoout);
    timeoout = setTimeout(()=>{
      // the first line will ping every time.
      // let res = event.target.value;
      let res = input.current.value;
      res = res.split(",");
      //remove the whitespace
      let temp = [];
      for (let i of res){
        temp.push(i.replace(/(^\s*)|(\s*$)/g, ""))
      }
      setNameList(temp);
      console.log(nameList);
    },500);
  }
  //function component to show the result
  function ShowFetch(){
    console.log(content)
      var contents = (
        content.map((item)=>{
          return(
            <RenderAPP val = {item}/>
          )}))
    return (
      <div>
        {contents}
      </div>
    )
  }

  return (
    <div>
      <div>Microsoft,Google</div>
      <input type="text" ref={input} onChange={handleChange}/>
      {{content}?<ShowFetch/>:null}
    </div>
  );
}

export default App;