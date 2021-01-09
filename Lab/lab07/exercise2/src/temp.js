//<!--z5224151	ZANNING WANG-->
// <!--2020.10.27	Tuesday-->
// <!--Lab07-exercise2-->
import React, {useEffect,useState, useRef} from 'react';
import './App.css';

let timeoout = null;

function App() {
  const [nameList, setNameList] = useState([]);
  const [content,setContent] = useState([]);
  const [result, setResult] = useState();
  const input = useRef();

  useEffect(()=>{
    let webContent = [];
    console.log(nameList);
    Promise.all(
      nameList.map((item)=>
        fetch(`https://api.github.com/users/${item}`).then(res => res.json())
      )).then(res=>{
      console.log(res);
      webContent = res.map((item)=>[item.name, item.avatar_url, item.url])
      let temp = showFetch(webContent);
      setResult(temp);
    });
    setContent(webContent);
    console.log(content);
  },[nameList])

  function handleChange(event){
    clearTimeout(timeoout);
    timeoout = setTimeout(()=>{
      let res = event.target.value;
      res = res.split(",");
      // temp.push(res);
      // console.log(nameList);
      setNameList(res);
      console.log(nameList);
    },2000);
  }
  function showFetch(res){
    console.log(content)
    var contents = (
      res.map((item)=>{
        return(
          <div key={item[0]}>
            <a href={item[2]}>{item[0]}</a>
            <img width="50px" height="50px" src={item[1]}  alt={item[0]}/>
          </div>
        );
      })
    )

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
      {/*{{content}?<ShowFetch/>:null}*/}
      {result}
    </div>

  );
}

export default App;