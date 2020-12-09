import React from 'react';
import PropTypes from 'prop-types';

const Resume = (props) => {
  const {
    data,
  } = props;

  const { skillmessage } = data;
  const education = data.education.map((element) => (
    <div key={element.school}>
      <h3>{element.school}</h3>
      <p className="info">
        {element.degree}
        {' '}
        <span>&bull;</span>
        <em className="date">{element.graduated}</em>
      </p>
      <p>{element.description}</p>
    </div>
  ));
  const work = data.work.map((element) => (
    <div key={element.company}>
      <h3>{element.company}</h3>
      <p className="info">
        {element.title}
        <span>&bull;</span>
        {' '}
        <em className="date">{element.years}</em>
      </p>
      <p>{element.description}</p>
    </div>
  ));
  const skills = data.skills.map((element) => {
    const className = `bar-expand ${element.name.toLowerCase()}`;
    return (
      <li key={element.name}>
        <span style={{ width: element.level }} className={className} />
        <em>{element.name}</em>
      </li>
    );
  });

  return (
    <section id="resume">

      <div className="row work">
        <div className="three columns header-col">
          <h1><span>Work</span></h1>
        </div>

        <div className="nine columns main-col">
          {work}
        </div>
      </div>

      <div className="row skill">
        <div className="three columns header-col">
          <h1><span>Skills</span></h1>
        </div>

        <div className="nine columns main-col">
          <p>
            {skillmessage}
          </p>
          <div className="bars">
            <ul className="skills">
              {skills}
            </ul>
          </div>
        </div>

        <div className="row education">
          <div className="three columns header-col">
            <h1><span>Education</span></h1>
          </div>

          <div className="nine columns main-col">
            <div className="row item">
              <div className="twelve columns">
                {education}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Resume.propTypes = PropTypes.shape({
  education: PropTypes.arrayOf(PropTypes.shape({
    degree: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    graduated: PropTypes.string.isRequired,
    school: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  skillmessage: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.shape({
    level: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  work: PropTypes.arrayOf(PropTypes.shape({
    company: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    years: PropTypes.string.isRequired,
  }).isRequired).isRequired,
}).isRequired;

export default Resume;
