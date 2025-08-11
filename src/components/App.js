import { useEffect, useState } from "react";
import GitHubButton from 'react-github-btn'
import { getRoles } from "./roles";

function RoleSelect({ existTags, onRoleSelectChange, BAD, GOOD, NEUTRAL }) {
  const [step, setStep] = useState("camp"); // camp 或 role
  const [camp, setCamp] = useState("");
  const [lastSelected, setLastSelected] = useState("");

  function handleCampChange(e) {
    setCamp(e.target.value);
    setStep("role");
    setLastSelected("");
  }

  function handleRoleChange(e) {
    setLastSelected(e.target.value);
    onRoleSelectChange(e);
    setStep("camp");
    setCamp("");
  }

  const CAMP_OPTIONS = [
    { label: "狼人", value: "BAD", roles: BAD },
    { label: "好人", value: "GOOD", roles: GOOD },
    { label: "中立", value: "NEUTRAL", roles: NEUTRAL },
  ];
  const currentRoles = camp ? CAMP_OPTIONS.find(c => c.value === camp).roles : [];

  return (
    <>
      {step === "camp" ? (
        <select className="role-select" name="selectCamp" value={camp} onChange={handleCampChange}>
          <option value="">选择阵营</option>
          {CAMP_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <select className="role-select" name="selectRole" value={lastSelected || ""} onChange={handleRoleChange}>
          <option value="">选择身份</option>
          {currentRoles.filter(role => !existTags.includes(role)).map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      )}
    </>
  );
}

function MemberTags({ tags, handleTagClick, BAD, GOOD }) {
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

function Member({ number, BAD, GOOD, NEUTRAL }) {
  const [tags, setTags] = useState([]);

  function handleSelectChange(tag) {
    const nextTags = [...tags.slice(-6), tag.target.value];
    setTags(nextTags);
  }

  function handleTagClick(tag) {
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
        <MemberTags tags={tags} handleTagClick={handleTagClick} BAD={BAD} GOOD={GOOD}/>
        <RoleSelect existTags={tags} onRoleSelectChange={handleSelectChange} BAD={BAD} GOOD={GOOD} NEUTRAL={NEUTRAL}/>
    </div>
    </> 
  );
}

function BoardMembers({ BAD, GOOD, NEUTRAL }) {
  return (
    <div className="board-member">
      <div className="member-row">
        <Member number="1" BAD={BAD} GOOD={GOOD} NEUTRAL={NEUTRAL}/>
        <Member number="2" BAD={BAD} GOOD={GOOD} NEUTRAL={NEUTRAL}/>
      </div>
      <div className="member-row">
        <Member number="3" BAD={BAD} GOOD={GOOD} NEUTRAL={NEUTRAL}/>
        <Member number="4" BAD={BAD} GOOD={GOOD} NEUTRAL={NEUTRAL}/>
      </div>
      <div className="member-row">
        <Member number="5" BAD={BAD} GOOD={GOOD} NEUTRAL={NEUTRAL}/>
        <Member number="6" BAD={BAD} GOOD={GOOD} NEUTRAL={NEUTRAL}/>
      </div>
      <div className="member-row">
        <Member number="7" BAD={BAD} GOOD={GOOD} NEUTRAL={NEUTRAL}/>
        <Member number="8" BAD={BAD} GOOD={GOOD} NEUTRAL={NEUTRAL}/>
      </div>
      <div className="member-row">
        <Member number="9" BAD={BAD} GOOD={GOOD} NEUTRAL={NEUTRAL}/>
        <Member number="10" BAD={BAD} GOOD={GOOD} NEUTRAL={NEUTRAL}/>
      </div>
    </div>
  )
}

function Board({ BAD, GOOD, NEUTRAL }) {
  return (
    <div className="board-main">
      <div className="board-left"></div>
      <BoardMembers BAD={BAD} GOOD={GOOD} NEUTRAL={NEUTRAL}/>  
      <div className="board-right"></div>
    </div>
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
  const [roles, setRoles] = useState({ BAD: [], GOOD: [], NEUTRAL: [] });

  useEffect(() => {
    getRoles().then(setRoles);
  }, []);

  return (
    <div className="app">
      <Board BAD={roles.BAD} GOOD={roles.GOOD} NEUTRAL={roles.NEUTRAL}/>
      <Footer />
    </div>
  );
}
