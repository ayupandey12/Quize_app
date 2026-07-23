import { useState } from "react"
import a from "./assets/question.json"
import { useEffect } from "react"
const questions=a.map((q)=>{return {id:q.id,question:q.question}})
const options=a.map((q)=>{return {id:q.id,options:q.options}})
const answers=a.map((q)=>{return {id:q.id,answer:q.correctAnswer}})
export const  App=()=>{
  const [questionid,setquestionid]=useState(1);
  const [currquestion,setcurrquestion]=useState(questions.filter((q)=>{return q.id===questionid}))
  const [curroption,setcurroption]=useState(options.filter((q)=>{return q.id===questionid}))
  const [curranswer,setcurranswer]=useState(answers.filter((q)=>{return q.id===questionid}))
  
 useEffect(()=>{
     setcurrquestion(questions.filter((q)=>{return q.id===questionid}))
     setcurroption(options.filter((q)=>{return q.id===questionid}))
     setcurranswer(answers.filter((q)=>{return q.id===questionid}))
     if(questionid==questions.length) return
     setTimeout(() => {
      setquestionid(questionid+1);
     }, 2000);
  
 },[questionid])
 
  
  return <div>
    <div>{currquestion[0].question}</div>
    <div>{curroption[0].options}</div>
    <div>{curranswer[0].answer}</div>
  </div>
}