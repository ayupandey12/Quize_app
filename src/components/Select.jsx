export const Select=({chooseanswer,setchooseanswer,curroption})=>{
    return <select defaultValue={"select the option below"} value={chooseanswer} name="quesop" id="quesop" onChange={(e)=>{setchooseanswer(e.target.value)}}>
      <option disabled id="quesop" >{"select the option below"}</option>
      {curroption[0].options.map((val)=>{return <option id="quesop">{val}</option>})}
    </select>
}