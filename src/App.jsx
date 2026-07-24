import { useState } from "react"
import a from "./assets/question.json"
import { useEffect } from "react"
import { Select } from "./components/Select"
const questions=a.map((q)=>{return {id:q.id,question:q.question}})
const options=a.map((q)=>{return {id:q.id,options:q.options}})
const answers=a.map((q)=>{return {id:q.id,answer:q.correctAnswer}})
const size=questions.length;
const ansrec=[]
let iscalculated=false;
ansrec.length=size+1
export const  App=()=>{
  const [questionid,setquestionid]=useState(1);
  const [currquestion,setcurrquestion]=useState(questions.filter((q)=>{return q.id===questionid}))
  const [curroption,setcurroption]=useState(options.filter((q)=>{return q.id===questionid}))
  const [curranswer,setcurranswer]=useState(answers.filter((q)=>{return q.id===questionid}))
  const [chooseanswer,setchooseanswer]=useState(null)
  const [settimer,settimert]=useState(null)
  const [score,setscore]=useState(0)
 useEffect(()=>{
     if(questionid>questions.length) return
     setcurrquestion(questions.filter((q)=>{return q.id===questionid}))
     setcurroption(options.filter((q)=>{return q.id===questionid}))
     setcurranswer(answers.filter((q)=>{return q.id===questionid}))
     ansrec[questionid]=chooseanswer;
     setchooseanswer(null)
     if(questionid==questions.length) return
    const t=setTimeout(() => {
      setquestionid(questionid+1);
     }, 10000);
     settimert(t);
     
 },[questionid])
 useEffect(()=>{
   console.log(chooseanswer)
 },[chooseanswer,iscalculated])
  return (<div>
    <div>{currquestion[0].question}</div>
     <Select chooseanswer={chooseanswer} setchooseanswer={setchooseanswer} curroption={curroption}/>
     <button onClick={()=>{setquestionid(questionid+1) 
            clearTimeout(settimer)
     }}>next</button>
     {questionid>questions.length&&<button onClick={()=>{
      for(let i=1;i<=size;i++)
      {
        if(ansrec[i]===answers[i-1].answer) setscore(score+1)
      }
      iscalculated=true
     }}>submit</button>}
     {iscalculated&&<div>your score is {score}</div>}
  </div>)
}