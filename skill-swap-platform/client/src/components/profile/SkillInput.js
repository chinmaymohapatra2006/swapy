import React, { useState } from 'react';
import '../../styles/SkillInput.css';

const SkillInput = ({ skills, onChange, label, placeholder }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!skills.includes(input.trim())) {
        onChange([...skills, input.trim()]);
      }
      setInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    onChange(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="skill-input-container">
      <label className="skill-label">{label}</label>
      <div className="skills-display">
        {skills.map((skill, index) => (
          <span key={index} className="skill-tag">
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="remove-skill"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="skill-input"
      />
      <small className="skill-hint">Press Enter to add a skill</small>
    </div>
  );
};

export default SkillInput;