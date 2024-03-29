import { useState  } from "react";
import GitHubButton from 'react-github-btn'

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

function RoleSelect({ existTags, onRoleSelectChange }) {
  
  const [lastSelected, setLastSelected] = useState("");
  
  function handleChange(e) {
    setLastSelected(e.target.value);
    onRoleSelectChange(e);
  }

  return (
    <select className="role-select" name="selectRole" defaultValue="选择身份"  onChange={handleChange}>
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
  function campClassName(tag) {
    if (BAD.includes(tag)) {
      return "tag-bad";
    } else if (GOOD.includes(tag)) {
      return "tag-good";
    } else {
      return "tag-neutral";
    }
  }
  return (
    <div className="tags-container">
      {
        tags.map(tag => ( <p className={campClassName(tag)} key={tag} onClick={()=>handleTagClick(tag)} >{tag}</p>))
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
        <RoleSelect existTags={tags} onRoleSelectChange={handleSelectChange}/>
    </div>
    </> 
  );
}


function BoardMembers() {
  return (
    <>
      <div className="board-member">
        <div className="member-row">
          <Member number="1"/>
          <Member number="2"/>
        </div>
        <div className="member-row">
          <Member number="3"/>
          <Member number="4"/>
        </div>
        <div className="member-row">
          <Member number="5"/>
          <Member number="6"/>
        </div>
        <div className="member-row">
          <Member number="7"/>
          <Member number="8"/>
        </div>
        <div className="member-row">
          <Member number="9"/>
          <Member number="10"/>
        </div>
      </div>
    </>
  )
}

function Board() {
  return (
    <>
      <div className="board-main">
        <div className="board-left"></div>
        <BoardMembers />  
        <div className="board-right"></div>
      </div>
    </>
  );
}

function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        圆梦狼人杀辅助工具 @xsymphony
      </div>
      <GitHubButton 
          href="https://github.com/xsymphony/dreamstar" 
          data-color-scheme="no-preference: light; light: light; dark: dark;" 
          data-icon="octicon-star"
          data-size="small" 
          aria-label="Star buttons/github-buttons on GitHub">
            Star
      </GitHubButton>
    </div>
  )
}

export default function App() {
  return (
    <>
      <div className="app">
        <Board />
        <Footer />
      </div>
    </>
  );
}
