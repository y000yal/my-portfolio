import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiAward } from 'react-icons/fi';

const ExperienceSection = () => {
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

  const generateHTML = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yoyal Limbu - Experience</title>
    <style>
        .experience-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            font-family: 'Inter', sans-serif;
        }
        .experience-item {
            background: #ffffff;
            border: 1px solid #e1e5e9;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .experience-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 16px;
        }
        .company-info h3 {
            color: #667eea;
            font-size: 1.4rem;
            margin-bottom: 4px;
        }
        .company-info .position {
            color: #4a4a4a;
            font-size: 1.1rem;
            font-weight: 500;
        }
        .duration {
            color: #6c757d;
            font-size: 0.9rem;
            background: #f8f9fa;
            padding: 4px 12px;
            border-radius: 20px;
        }
        .description {
            color: #4a4a4a;
            line-height: 1.6;
        }
        .tech-stack {
            margin-top: 16px;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        .tech-tag {
            background: #667eea;
            color: white;
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 0.8rem;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <div class="experience-container">
        <h1>Professional Experience</h1>
        
        <div class="experience-item">
            <div class="experience-header">
                <div class="company-info">
                    <h3>TechCorp Solutions</h3>
                    <div class="position">Senior PHP Developer</div>
                </div>
                <div class="duration">2022 - Present</div>
            </div>
            <div class="description">
                Led development of enterprise web applications using Laravel framework. 
                Implemented RESTful APIs and microservices architecture. 
                Mentored junior developers and conducted code reviews.
            </div>
            <div class="tech-stack">
                <span class="tech-tag">PHP</span>
                <span class="tech-tag">Laravel</span>
                <span class="tech-tag">MySQL</span>
                <span class="tech-tag">Redis</span>
                <span class="tech-tag">Docker</span>
            </div>
        </div>

        <div class="experience-item">
            <div class="experience-header">
                <div class="company-info">
                    <h3>Digital Innovations Ltd</h3>
                    <div class="position">Full Stack Developer</div>
                </div>
                <div class="duration">2020 - 2022</div>
            </div>
            <div class="description">
                Developed and maintained multiple client websites and web applications. 
                Worked with various PHP frameworks and frontend technologies. 
                Collaborated with design and UX teams.
            </div>
            <div class="tech-stack">
                <span class="tech-tag">PHP</span>
                <span class="tech-tag">CodeIgniter</span>
                <span class="tech-tag">JavaScript</span>
                <span class="tech-tag">HTML/CSS</span>
                <span class="tech-tag">Git</span>
            </div>
        </div>

        <div class="experience-item">
            <div class="experience-header">
                <div class="company-info">
                    <h3>StartupHub</h3>
                    <div class="position">Junior Developer</div>
                </div>
                <div class="duration">2019 - 2020</div>
            </div>
            <div class="description">
                Assisted in development of startup MVP applications. 
                Learned modern development practices and tools. 
                Participated in agile development processes.
            </div>
            <div class="tech-stack">
                <span class="tech-tag">PHP</span>
                <span class="tech-tag">MySQL</span>
                <span class="tech-tag">Bootstrap</span>
                <span class="tech-tag">jQuery</span>
            </div>
        </div>
    </div>
</body>
</html>`;
  };

  const renderPreview = () => {
    return (
      <div className="preview-container">
        <h1>Professional Experience</h1>
        
        {experienceData.data.map((exp) => (
          <div key={exp.id} className="experience-item">
            <div className="experience-header">
              <div className="company-info">
                <h3>{exp.company}</h3>
                <div className="position">{exp.position}</div>
              </div>
              <div className="duration">{exp.duration}</div>
            </div>
            <div className="description">{exp.description}</div>
            <div className="tech-stack">
              {exp.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
            {exp.achievements && (
              <div className="achievements">
                <h4>Key Achievements</h4>
                {exp.achievements.map((achievement, index) => (
                  <div key={index} className="achievement-item">
                    <FiAward className="achievement-icon" />
                    {achievement}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="api-section">
      <div className="api-header">
        <h2>GET /api/experience</h2>
        <p>Retrieve professional work experience data</p>
      </div>
      <div className="api-content">
        <div className="request-panel">
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
              'Fetch Experience Data'
            )}
          </button>
          
          <div className="param-group">
            <h4>Headers</h4>
            <div className="param-item">
              <span className="param-key">Authorization</span>
              <span className="param-value">Bearer token</span>
              <span className="param-type">string</span>
            </div>
            <div className="param-item">
              <span className="param-key">Content-Type</span>
              <span className="param-value">application/json</span>
              <span className="param-type">string</span>
            </div>
          </div>

          <div className="param-group">
            <h4>Query Parameters</h4>
            <div className="param-item">
              <span className="param-key">limit</span>
              <span className="param-value">10</span>
              <span className="param-type">number</span>
            </div>
            <div className="param-item">
              <span className="param-key">sort</span>
              <span className="param-value">date_desc</span>
              <span className="param-type">string</span>
            </div>
          </div>

          <div className="param-group">
            <h4>Response Format</h4>
            <div className="param-item">
              <span className="param-key">format</span>
              <span className="param-value">json</span>
              <span className="param-type">string</span>
            </div>
          </div>
        </div>
        
        <div className="response-panel">
          <div className="panel-title">Response</div>
          
          {!showResponse ? (
            <div className="json-display" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontStyle: 'italic' }}>
              Click "Fetch Experience Data" to see the response
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
                  {formatJSON(experienceData)}
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

const experienceData = {
  success: true,
  data: [
    {
      id: 1,
      company: "ThemeGrill",
      position: "Senior PHP Developer",
      duration: "March 2024 - Present",
      description: "Led WordPress Plugin Development, specifically focusing on the User Registration Plugin (which has over 70,000 active installations). Developed scalable PHP applications utilizing OOP, jQuery, and WordPress architecture.",
      technologies: ["PHP", "WordPress", "jQuery", "OOP"],
      achievements: [
        "Led WordPress Plugin Development with 70,000+ active installations",
        "Developed scalable PHP applications using OOP principles",
        "Utilized jQuery and WordPress architecture effectively"
      ]
    },
    {
      id: 2,
      company: "Hitachi Energy",
      position: "Software Engineer",
      duration: "March 2023 - March 2024",
      description: "Contributed to 'TrmTracker,' an Energy Trade & Risk Management System, including handling legacy code and security improvements. Worked with Azure ADIHA Framework, PHP, jQuery, JavaScript, TSQL, and Stored Procedures.",
      technologies: ["PHP", "Azure", "jQuery", "JavaScript", "TSQL", "JIRA"],
      achievements: [
        "Contributed to Energy Trade & Risk Management System",
        "Handled legacy code and security improvements",
        "Worked with Azure ADIHA Framework and TSQL"
      ]
    },
    {
      id: 3,
      company: "Genius Systems Pvt. Ltd",
      position: "Software Engineer",
      duration: "February 2021 - March 2023",
      description: "Developed high-performance applications, including: IPCAM - Security Camera Management System, Marketplace - FinTech Proxy Service, WIMO - WiFi/Hotspot Management System.",
      technologies: ["Laravel", "Lumen", "Docker", "MySQL", "Graphana", "REST API", "Rancher"],
      achievements: [
        "Developed IPCAM Security Camera Management System",
        "Built Marketplace FinTech Proxy Service",
        "Created WIMO WiFi/Hotspot Management System"
      ]
    },
    {
      id: 4,
      company: "CodeCater Studio",
      position: "Web Developer / Full-Stack Developer",
      duration: "September 2019 - February 2021",
      description: "Developed applications including 'SmartBus' (Bus Ticket Booking System) using Laravel, Yii2, Vue, HTML, and Bootstrap.",
      technologies: ["Laravel", "Yii2", "Vue", "HTML", "Bootstrap"],
      achievements: [
        "Developed SmartBus Bus Ticket Booking System",
        "Utilized Laravel, Yii2, and Vue.js frameworks",
        "Implemented responsive design with Bootstrap"
      ]
    }
  ],
  meta: {
    total: 4,
    page: 1,
    limit: 10,
    timestamp: "2024-01-15T10:30:00Z"
  }
};

export default ExperienceSection;
