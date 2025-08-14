import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiAward } from 'react-icons/fi';

const EducationSection = () => {
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
    <title>Yoyal Limbu - Education</title>
    <style>
        .education-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            font-family: 'Inter', sans-serif;
        }
        .education-item {
            background: #ffffff;
            border: 1px solid #e1e5e9;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .education-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 16px;
        }
        .institution-info h3 {
            color: #667eea;
            font-size: 1.4rem;
            margin-bottom: 4px;
        }
        .institution-info .degree {
            color: #4a4a4a;
            font-size: 1.1rem;
            font-weight: 500;
        }
        .graduation-year {
            color: #6c757d;
            font-size: 0.9rem;
            background: #f8f9fa;
            padding: 4px 12px;
            border-radius: 20px;
        }
        .description {
            color: #4a4a4a;
            line-height: 1.6;
            margin-bottom: 16px;
        }
        .achievements {
            margin-top: 16px;
        }
        .achievement-item {
            background: #f8f9fa;
            padding: 8px 12px;
            border-radius: 6px;
            margin-bottom: 8px;
            border-left: 3px solid #667eea;
        }
        .achievement-item:before {
            content: "🏆";
            margin-right: 8px;
        }
        .gpa-badge {
            display: inline-block;
            background: #28a745;
            color: white;
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 0.8rem;
            font-weight: 600;
            margin-top: 8px;
        }
    </style>
</head>
<body>
    <div class="education-container">
        <h1>Educational Background</h1>
        
        <div class="education-item">
            <div class="education-header">
                <div class="institution-info">
                    <h3>University of Technology</h3>
                    <div class="degree">Bachelor of Computer Science</div>
                </div>
                <div class="graduation-year">2019</div>
            </div>
            <div class="description">
                Specialized in Software Engineering with focus on web development technologies. 
                Completed final year project on "Modern Web Application Architecture" using PHP and Laravel.
            </div>
            <div class="achievements">
                <div class="achievement-item">Graduated with First Class Honours</div>
                <div class="achievement-item">Best Final Year Project Award</div>
                <div class="achievement-item">Member of Computer Science Society</div>
            </div>
            <div class="gpa-badge">GPA: 3.8/4.0</div>
        </div>

        <div class="education-item">
            <div class="education-header">
                <div class="institution-info">
                    <h3>Tech Institute</h3>
                    <div class="degree">Diploma in Web Development</div>
                </div>
                <div class="graduation-year">2017</div>
            </div>
            <div class="description">
                Intensive 6-month program covering modern web development technologies. 
                Hands-on experience with PHP, MySQL, JavaScript, and responsive design.
            </div>
            <div class="achievements">
                <div class="achievement-item">Top 10% of graduating class</div>
                <div class="achievement-item">Completed 5 real-world projects</div>
                <div class="achievement-item">Received Excellence in Coding Award</div>
            </div>
        </div>

        <div class="education-item">
            <div class="education-header">
                <div class="institution-info">
                    <h3>Online Learning Platforms</h3>
                    <div class="degree">Various Certifications</div>
                </div>
                <div class="graduation-year">2018 - Present</div>
            </div>
            <div class="description">
                Continuous learning through online platforms including Udemy, Coursera, and Laracasts. 
                Focused on advanced PHP, Laravel, and modern development practices.
            </div>
            <div class="achievements">
                <div class="achievement-item">Laravel Certification (Laracasts)</div>
                <div class="achievement-item">Advanced PHP Development (Udemy)</div>
                <div class="achievement-item">API Development Masterclass</div>
            </div>
        </div>
    </div>
</body>
</html>`;
  };

  const renderPreview = () => {
    return (
      <div className="preview-container">
        <h1>Educational Background</h1>
        
        {educationData.data.map((edu) => (
          <div key={edu.id} className="education-item">
            <div className="education-header">
              <div className="institution-info">
                <h3>{edu.institution}</h3>
                <div className="degree">{edu.degree}</div>
              </div>
              <div className="graduation-year">
                {edu.graduation_year || `${edu.start_year} - ${edu.end_year}`}
              </div>
            </div>
            <div className="description">{edu.description}</div>
            {edu.achievements && (
              <div className="achievements">
                <h4>Achievements</h4>
                {edu.achievements.map((achievement, index) => (
                  <div key={index} className="achievement-item">
                    <FiAward className="achievement-icon" />
                    {achievement}
                  </div>
                ))}
              </div>
            )}
            {edu.gpa && (
              <div className="gpa-badge">GPA: {edu.gpa}</div>
            )}
            {edu.certifications && (
              <div className="achievements">
                {edu.certifications.map((cert, index) => (
                  <div key={index} className="achievement-item">
                    {cert.name} ({cert.platform}, {cert.year})
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
    <div className="api-section" id="education-section">
      <div className="api-header">
        <h2>GET /api/education</h2>
        <p>Retrieve educational background and qualifications</p>
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
              <span className="param-key">include_certificates</span>
              <span className="param-value" title="true">true</span>
              <span className="param-type">boolean</span>
            </div>
            <div className="param-item">
              <span className="param-key">sort_by</span>
              <span className="param-value" title="graduation_year">graduation_year</span>
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
                'Fetch Education Data'
              )}
            </button>
          </div>
          
          {!showResponse ? (
            <div className="json-display" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontStyle: 'italic' }}>
              Click "Fetch Education Data" to see the response
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
                  {formatJSON(educationData)}
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

const educationData = {
  success: true,
  data: [
    {
      id: 1,
      institution: "ACME Engineering",
      degree: "Bachelor of Engineering - Computer Science",
      field: "Computer Science",
      graduation_year: 2019,
      gpa: "2.68",
      honors: "Graduated with distinction",
      description: "Completed comprehensive computer science program with focus on software engineering and web development. Final year project: E-commerce Platform using Laravel.",
      achievements: [
        "Graduated with First Devision",
        "Final year project: E-commerce Platform using Laravel",
      ],
      relevant_courses: [
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Web Development",
        "Software Engineering",
        "Computer Networks"
      ]
    }
  ],
  meta: {
    total: 1,
    page: 1,
    limit: 10,
    timestamp: "2024-01-15T10:30:00Z"
  }
};

export default EducationSection;
