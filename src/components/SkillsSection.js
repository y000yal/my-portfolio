import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  FiCode, FiDatabase, FiServer, FiMonitor, FiTool, FiShield, FiZap, FiCheckCircle,
  FiBox, FiCloud, FiGitBranch, FiTerminal, FiSettings, FiLayers, FiPackage
} from 'react-icons/fi';

const SkillsSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [viewMode, setViewMode] = useState('raw'); // 'raw' or 'preview'

  useEffect(() => {
    const handleGlobalSimulate = () => {
      simulateApiRequest();
    };
    window.addEventListener('simulateAllApiRequests', handleGlobalSimulate);
    return () => {
      window.removeEventListener('simulateAllApiRequests', handleGlobalSimulate);
    };
  }, []);

  const simulateApiRequest = async () => {
    setIsLoading(true);
    setShowResponse(false);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowResponse(true);
    setIsLoading(false);
  };

  const formatJSON = (obj) => {
    return JSON.stringify(obj, null, 2);
  };

  const renderPreview = () => {
    const getSkillLevel = (skillName) => {
      if (skillsData.proficiency_levels.expert.includes(skillName)) return "Expert";
      if (skillsData.proficiency_levels.advanced.includes(skillName)) return "Advanced";
      if (skillsData.proficiency_levels.intermediate.includes(skillName)) return "Intermediate";
      if (skillsData.proficiency_levels.beginner.includes(skillName)) return "Beginner";
      return "Intermediate";
    };

    const renderSkillBar = (level) => {
      const levels = {
        'Expert': 100,
        'Advanced': 80,
        'Intermediate': 60,
        'Beginner': 40
      };
      const percentage = levels[level] || 60;
      return (
        <div className="skill-bar-container">
          <div 
            className={`skill-bar ${level.toLowerCase()}`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      );
    };

    const getSkillIcon = (skillName) => {
      const iconMap = {
        'PHP': <FiCode />,
        'JavaScript': <FiCode />,
        'TypeScript': <FiCode />,
        'Laravel': <FiCode />,
        'WordPress': <FiCode />,
        'Vue.js': <FiCode />,
        'React': <FiCode />,
        'HTML5': <FiCode />,
        'CSS3': <FiCode />,
        'SCSS': <FiCode />,
        'Bootstrap': <FiCode />,
        'Tailwind CSS': <FiCode />,
        'Docker': <FiBox />,
        'Git': <FiGitBranch />,
        'MySQL': <FiDatabase />,
        'PostgreSQL': <FiDatabase />,
        'Azure': <FiCloud />,
        'AWS': <FiCloud />,
        'Lumen': <FiCode />,
        'Yii2': <FiCode />,
        'Vuex': <FiCode />,
        'jQuery': <FiCode />,
        'Axios': <FiCode />,
        'Material-UI': <FiCode />,
        'Rancher': <FiBox />,
        'GitHub Actions': <FiGitBranch />,
        'Jenkins': <FiSettings />,
        'Graphana': <FiMonitor />,
        'Prometheus': <FiMonitor />,
        'DigitalOcean': <FiCloud />,
        'GitHub': <FiGitBranch />,
        'Azure Git': <FiGitBranch />,
        'JIRA': <FiSettings />,
        'Trello': <FiSettings />,
        'Asana': <FiSettings />,
        'VS Code': <FiTerminal />,
        'PHPStorm': <FiTerminal />,
        'Postman': <FiTerminal />,
        'phpMyAdmin': <FiDatabase />,
        'MySQL Workbench': <FiDatabase />
      };
      return iconMap[skillName] || <FiCode />;
    };

    return (
      <div className="preview-container">
        <h1>Technical Skills & Expertise</h1>
        
        <div className="skills-section">
          <h2><FiServer /> Backend Development</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3><FiCode /> Programming Languages</h3>
              {skillsData.data.backend.languages.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-icon">{getSkillIcon(skill)}</span>
                    <span className="skill-name">{skill}</span>
                  </div>
                  <div className="skill-level">
                    {renderSkillBar(getSkillLevel(skill))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="skill-category">
              <h3><FiCode /> Frameworks</h3>
              {skillsData.data.backend.frameworks.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-icon">{getSkillIcon(skill)}</span>
                    <span className="skill-name">{skill}</span>
                  </div>
                  <div className="skill-level">
                    {renderSkillBar(getSkillLevel(skill))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="skill-category">
              <h3><FiDatabase /> Databases</h3>
              {skillsData.data.backend.databases.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-icon">{getSkillIcon(skill)}</span>
                    <span className="skill-name">{skill}</span>
                  </div>
                  <div className="skill-level">
                    {renderSkillBar(getSkillLevel(skill))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="skill-category">
              <h3><FiCode /> APIs</h3>
              {skillsData.data.backend.apis.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-icon">{getSkillIcon(skill)}</span>
                    <span className="skill-name">{skill}</span>
                  </div>
                  <div className="skill-level">
                    {renderSkillBar(getSkillLevel(skill))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="skills-section">
          <h2><FiCode /> Frontend Development</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3><FiCode /> Frameworks & Libraries</h3>
              {skillsData.data.frontend.frameworks.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-icon">{getSkillIcon(skill)}</span>
                    <span className="skill-name">{skill}</span>
                  </div>
                  <div className="skill-level">
                    {renderSkillBar(getSkillLevel(skill))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="skill-category">
              <h3><FiCode /> Languages & Styling</h3>
              {skillsData.data.frontend.languages.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-icon">{getSkillIcon(skill)}</span>
                    <span className="skill-name">{skill}</span>
                  </div>
                  <div className="skill-level">
                    {renderSkillBar(getSkillLevel(skill))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="skill-category">
              <h3><FiCode /> UI Frameworks</h3>
              {skillsData.data.frontend.ui_frameworks.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-icon">{getSkillIcon(skill)}</span>
                    <span className="skill-name">{skill}</span>
                  </div>
                  <div className="skill-level">
                    {renderSkillBar(getSkillLevel(skill))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="skill-category">
              <h3><FiCode /> Libraries</h3>
              {skillsData.data.frontend.libraries.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-icon">{getSkillIcon(skill)}</span>
                    <span className="skill-name">{skill}</span>
                  </div>
                  <div className="skill-level">
                    {renderSkillBar(getSkillLevel(skill))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="skills-section">
          <h2><FiMonitor /> DevOps & Tools</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3><FiTool /> Containers</h3>
              {skillsData.data.devops.containers.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-icon">{getSkillIcon(skill)}</span>
                    <span className="skill-name">{skill}</span>
                  </div>
                  <div className="skill-level">
                    {renderSkillBar(getSkillLevel(skill))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="skill-category">
              <h3><FiTool /> CI/CD</h3>
              {skillsData.data.devops.ci_cd.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-icon">{getSkillIcon(skill)}</span>
                    <span className="skill-name">{skill}</span>
                  </div>
                  <div className="skill-level">
                    {renderSkillBar(getSkillLevel(skill))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="skill-category">
              <h3><FiMonitor /> Monitoring</h3>
              {skillsData.data.devops.monitoring.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-icon">{getSkillIcon(skill)}</span>
                    <span className="skill-name">{skill}</span>
                  </div>
                  <div className="skill-level">
                    {renderSkillBar(getSkillLevel(skill))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="skill-category">
              <h3><FiTool /> Cloud Platforms</h3>
              {skillsData.data.devops.cloud.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-icon">{getSkillIcon(skill)}</span>
                    <span className="skill-name">{skill}</span>
                  </div>
                  <div className="skill-level">
                    {renderSkillBar(getSkillLevel(skill))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="skills-section">
          <h2><FiTool /> Development Tools</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3><FiTool /> Version Control</h3>
              {skillsData.data.tools.version_control.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-icon">{getSkillIcon(skill)}</span>
                    <span className="skill-name">{skill}</span>
                  </div>
                  <div className="skill-level">
                    {renderSkillBar(getSkillLevel(skill))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="skill-category">
              <h3><FiTool /> Project Management</h3>
              {skillsData.data.tools.project_management.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-icon">{getSkillIcon(skill)}</span>
                    <span className="skill-name">{skill}</span>
                  </div>
                  <div className="skill-level">
                    {renderSkillBar(getSkillLevel(skill))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="skill-category">
              <h3><FiTool /> Development Tools</h3>
              {skillsData.data.tools.development.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-icon">{getSkillIcon(skill)}</span>
                    <span className="skill-name">{skill}</span>
                  </div>
                  <div className="skill-level">
                    {renderSkillBar(getSkillLevel(skill))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="skill-category">
              <h3><FiDatabase /> Database Tools</h3>
              {skillsData.data.tools.database_tools.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-icon">{getSkillIcon(skill)}</span>
                    <span className="skill-name">{skill}</span>
                  </div>
                  <div className="skill-level">
                    {renderSkillBar(getSkillLevel(skill))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="skills-section">
          <h2><FiCheckCircle /> Expertise Areas</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3><FiCode /> Architecture</h3>
              {skillsData.data.expertise.architecture.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-icon"><FiCode /></span>
                    <span className="skill-name">{skill}</span>
                  </div>
                  <div className="skill-level">
                    {renderSkillBar("Expert")}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="skill-category">
              <h3><FiShield /> Security</h3>
              {skillsData.data.expertise.security.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-icon"><FiShield /></span>
                    <span className="skill-name">{skill}</span>
                  </div>
                  <div className="skill-level">
                    {renderSkillBar("Advanced")}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="skill-category">
              <h3><FiZap /> Performance</h3>
              {skillsData.data.expertise.performance.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-icon"><FiZap /></span>
                    <span className="skill-name">{skill}</span>
                  </div>
                  <div className="skill-level">
                    {renderSkillBar("Advanced")}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="skill-category">
              <h3><FiCheckCircle /> Testing</h3>
              {skillsData.data.expertise.testing.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-icon"><FiCheckCircle /></span>
                    <span className="skill-name">{skill}</span>
                  </div>
                  <div className="skill-level">
                    {renderSkillBar("Intermediate")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="tools-section">
          <h3>Proficiency Level Guide</h3>
          <div className="tools-grid">
            <div className="tool-item">
              <div className="color-guide expert">Expert</div>
              <div className="guide-description">100% - Mastery level</div>
            </div>
            <div className="tool-item">
              <div className="color-guide advanced">Advanced</div>
              <div className="guide-description">80% - Highly proficient</div>
            </div>
            <div className="tool-item">
              <div className="color-guide intermediate">Intermediate</div>
              <div className="guide-description">60% - Good working knowledge</div>
            </div>
            <div className="tool-item">
              <div className="color-guide beginner">Beginner</div>
              <div className="guide-description">40% - Basic understanding</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="api-section" id="skills-section">
      <div className="api-header">
        <h2>GET /api/skills</h2>
        <p>Retrieve technical skills and expertise data</p>
      </div>
      <div className="api-content">
        <div className="request-panel">
          <div className="param-group">
            <h4>Headers</h4>
            <div className="param-item">
              <span className="param-key">Authorization</span>
              <span className="param-value" title="Bearer token">Bearer token</span>
              <span className="param-type">string</span>
            </div>
            <div className="param-item">
              <span className="param-key">Content-Type</span>
              <span className="param-value" title="application/json">application/json</span>
              <span className="param-type">string</span>
            </div>
          </div>

          <div className="param-group">
            <h4>Query Parameters</h4>
            <div className="param-item">
              <span className="param-key">include_levels</span>
              <span className="param-value" title="true">true</span>
              <span className="param-type">boolean</span>
            </div>
            <div className="param-item">
              <span className="param-key">category</span>
              <span className="param-value" title="all">all</span>
              <span className="param-type">string</span>
            </div>
          </div>

          <div className="param-group">
            <h4>Response Format</h4>
            <div className="param-item">
              <span className="param-key">format</span>
              <span className="param-value" title="json">json</span>
              <span className="param-type">string</span>
            </div>
          </div>
        </div>
        
        <div className="response-panel">
          <div className="panel-title">
            Response
            <button
              className="api-request-button"
              onClick={simulateApiRequest}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  Fetching Data
                  <span className="loading-indicator"></span>
                </>
              ) : (
                'Fetch Skills Data'
              )}
            </button>
          </div>
          
          {!showResponse ? (
            <div className="json-display" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontStyle: 'italic' }}>
              Click "Fetch Skills Data" to see the response
            </div>
          ) : (
            <>
              <div className="view-toggle">
                <button 
                  className={viewMode === 'raw' ? 'active' : ''} 
                  onClick={() => setViewMode('raw')}
                >
                  Raw Data
                </button>
                <button 
                  className={viewMode === 'preview' ? 'active' : ''} 
                  onClick={() => setViewMode('preview')}
                >
                  Preview
                </button>
              </div>
              
              {viewMode === 'raw' ? (
                <SyntaxHighlighter
                  language="json"
                  style={tomorrow}
                  customStyle={{
                    background: 'var(--bg-card)',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    overflowY: 'auto',
                    maxHeight: '450px',
                    maxWidth: '100%',
                    overflowX: 'auto',
                    wordWrap: 'break-word',
                    wordBreak: 'break-word'
                  }}
                >
                  {formatJSON(skillsData)}
                </SyntaxHighlighter>
              ) : (
                renderPreview()
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const skillsData = {
  success: true,
  data: {
    backend: {
      languages: ["PHP", "JavaScript", "TypeScript"],
      frameworks: ["Laravel", "Lumen", "WordPress", "Yii2"],
      databases: ["MySQL", "TSQL", "PostgreSQL"],
      apis: ["RESTful APIs", "GraphQL", "SOAP"]
    },
    frontend: {
      frameworks: ["Vue.js", "Vuex", "React"],
      languages: ["HTML5", "CSS3", "SCSS", "JavaScript"],
      ui_frameworks: ["Bootstrap", "Tailwind CSS", "Material-UI"],
      libraries: ["jQuery", "Axios"]
    },
    devops: {
      containers: ["Docker", "Rancher"],
      ci_cd: ["GitHub Actions", "Azure DevOps", "Jenkins"],
      monitoring: ["Graphana", "Prometheus"],
      cloud: ["Azure", "AWS", "DigitalOcean"]
    },
    tools: {
      version_control: ["Git", "GitHub", "Azure Git"],
      project_management: ["JIRA", "Trello", "Asana"],
      development: ["VS Code", "PHPStorm", "Postman"],
      database_tools: ["phpMyAdmin", "MySQL Workbench"]
    },
    expertise: {
      architecture: ["System Architecture", "Database Design", "API Design"],
      security: ["Payment Gateway Security", "OAuth 2.0", "JWT", "HTTPS"],
      performance: ["Code Optimization", "Database Optimization", "Caching"],
      testing: ["Unit Testing", "Integration Testing", "API Testing"]
    }
  },
  proficiency_levels: {
    expert: ["PHP", "Laravel", "MySQL", "WordPress"],
    advanced: ["Vue.js", "Docker", "Git", "REST APIs"],
    intermediate: ["React", "TypeScript", "AWS", "GraphQL"],
    beginner: ["Python", "Node.js", "Kubernetes"]
  }
};

export default SkillsSection;
