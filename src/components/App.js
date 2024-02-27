import { useState  } from "react";

const BAD = [
  "刺客狼",
  "潜行狼",
  "炸弹狼",
  "伪装狼",
  "独狼",
]

const GOOD = [
  "警长",
  "勇士",
  "侦探",
  "天使",
  "哨子",
  "学者",
  "调皮鬼",
  "主持人",
  "平民",
]

const NEUTRAL = [
  "小丑",
  "臭鼬",
  "赏金",
  "赌徒",
]

const TOTAL_ROLES = [].concat(BAD, GOOD, NEUTRAL);

function RoleSelect({ className, existTags, onRoleSelectChange }) {
  
  const [lastSelected, setLastSelected] = useState("");
  
  function handleChange(e) {
    setLastSelected(e.target.value);
    onRoleSelectChange(e);
  }

  return (
    <select className={className} name="selectRole" defaultValue="选择身份"  onChange={handleChange}>
      <option disabled={true} value="选择身份">
        --选择身份--
      </option>
      {
        lastSelected && <option value={lastSelected} style={{display:'none'}}>{lastSelected}</option>
      }
      {
        TOTAL_ROLES.
        filter(role => !existTags.includes(role)).
        map(role => (<option key={role} value={role}>{role}</option>))
      }
    </select>
  );
}

function MemberTags({ tags, handleTagClick }) {
  return (
    <div className="tags-container">
      {
        tags.map(tag => ( <p key={tag} onClick={()=>handleTagClick(tag)} >{tag}</p>))
      }
    </div>
  );
}

function Member({ number }) {
  const [tags, setTags] = useState([]);

  function handleSelectChange(tag) {
    console.log(tag.target.value);
    const nextTags = [...tags.slice(-6), tag.target.value];
    setTags(nextTags);
  }

  function handleTagClick(tag) {
    console.log(tag);
    const nextTags = tags.filter(t => t !== tag);
    setTags(nextTags);
  }
  
  return (
    <>
      <div className="member">
        <div className="member-background-left member-background">
          <div className="member-number">{number}</div>
        </div>
        <div className="member-background-right member-background" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/character/dog.png`}}>
        </div>
        <MemberTags tags={tags} handleTagClick={handleTagClick}/>
        <RoleSelect  className="role-select" existTags={tags} onRoleSelectChange={handleSelectChange}/>
      </div>
    </> 
  );
}


function BoardMembers() {
  return (
    <>
      <div className="board-member">
        <div className="member-row">
          <Member number="1" />
          <Member number="2" />
        </div>
        <div className="member-row">
          <Member number="3" />
          <Member number="4" />
        </div>
        <div className="member-row">
          <Member number="5" />
          <Member number="6" />
        </div>
        <div className="member-row">
          <Member number="7" />
          <Member number="8" />
        </div>
        <div className="member-row">
          <Member number="9" />
          <Member number="10" />
        </div>
      </div>
    </>
  )
}


export default function Board() {
  return (
    <>
      <div className="board-main">
        <BoardMembers />  
      </div>
    </>
  );
}
