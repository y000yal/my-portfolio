import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow, ghcolors } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  FiAward,
  FiSearch,
  FiFilter,
  FiArrowUp,
  FiArrowDown,
  FiRefreshCw,
} from "react-icons/fi";

const ExperienceSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [viewMode, setViewMode] = useState("raw"); // 'raw' or 'preview'

  // API Parameters State
  const [apiParams, setApiParams] = useState({
    limit: 10,
    sort: "date_desc",
    search: "",
    category: "all",
    include_achievements: true,
  });

  // Response Data State
  const [responseData, setResponseData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const handleGlobalSimulate = () => {
      simulateApiRequest();
    };
    window.addEventListener("simulateAllApiRequests", handleGlobalSimulate);
    return () => {
      window.removeEventListener(
        "simulateAllApiRequests",
        handleGlobalSimulate
      );
    };
  }, []);

  // Filter and sort data based on API parameters
  useEffect(() => {
    if (responseData) {
      let filtered = [...responseData.data];

      // Apply search filter
      if (apiParams.search) {
        filtered = filtered.filter(
          (exp) =>
            exp.company
              .toLowerCase()
              .includes(apiParams.search.toLowerCase()) ||
            exp.position
              .toLowerCase()
              .includes(apiParams.search.toLowerCase()) ||
            exp.description
              .toLowerCase()
              .includes(apiParams.search.toLowerCase())
        );
      }

      // Apply category filter
      if (apiParams.category !== "all") {
        filtered = filtered.filter((exp) =>
          exp.technologies.some((tech) =>
            tech.toLowerCase().includes(apiParams.category.toLowerCase())
          )
        );
      }

      // Apply sorting
      if (apiParams.sort === "date_desc") {
        filtered.sort(
          (a, b) =>
            new Date(b.duration.split(" - ")[0]) -
            new Date(a.duration.split(" - ")[0])
        );
      } else if (apiParams.sort === "date_asc") {
        filtered.sort(
          (a, b) =>
            new Date(a.duration.split(" - ")[0]) -
            new Date(b.duration.split(" - ")[0])
        );
      } else if (apiParams.sort === "company_asc") {
        filtered.sort((a, b) => a.company.localeCompare(b.company));
      } else if (apiParams.sort === "company_desc") {
        filtered.sort((a, b) => b.company.localeCompare(a.company));
      }

      // Apply limit
      filtered = filtered.slice(0, apiParams.limit);

      setFilteredData({
        ...responseData,
        data: filtered,
        meta: {
          ...responseData.meta,
          total: filtered.length,
          limit: apiParams.limit,
          applied_filters: {
            search: apiParams.search,
            category: apiParams.category,
            sort: apiParams.sort,
          },
        },
      });
    }
  }, [responseData, apiParams]);

  const simulateApiRequest = async () => {
    setIsLoading(true);
    setShowResponse(false);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Set response data
    setResponseData(experienceData);
    setShowResponse(true);
    setIsLoading(false);
  };

  const handleParamChange = (param, value) => {
    setApiParams((prev) => ({
      ...prev,
      [param]: value,
    }));
  };

  const resetParams = () => {
    setApiParams({
      limit: 10,
      sort: "date_desc",
      search: "",
      category: "all",
      include_achievements: true,
    });
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
</body>
</html>`;
  };

  const renderPreview = () => {
    if (!filteredData) return null;

    return (
      <div className="preview-container">
        <div className="preview-header">
          <h1>Professional Experience</h1>
          {apiParams.search && (
            <div className="search-results-info">
              Showing {filteredData.data.length} results for "{apiParams.search}
              "
            </div>
          )}
        </div>

        {filteredData.data.map((exp) => (
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
                <span key={index} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
            {apiParams.include_achievements && exp.achievements && (
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

        {filteredData.data.length === 0 && (
          <div className="no-results">
            <p>No experience records found matching your criteria.</p>
            <button onClick={resetParams} className="reset-btn">
              Reset Filters
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="api-section" id="experience-section">
      <div className="api-header">
        <div className="url-builder-container">
          <div className="url-builder">
            <div className="url-display">
              <span className="url-method">GET</span>
              <span className="url-base">
                /api/experience
                <span className="url-params">
                  {(() => {
                    const params = [];
                    if (apiParams.search)
                      params.push(
                        `search=${encodeURIComponent(apiParams.search)}`
                      );
                    if (apiParams.category !== "all")
                      params.push(
                        `category=${encodeURIComponent(apiParams.category)}`
                      );
                    if (apiParams.sort !== "date_desc")
                      params.push(`sort=${encodeURIComponent(apiParams.sort)}`);
                    if (apiParams.limit !== 10)
                      params.push(`limit=${apiParams.limit}`);
                    if (!apiParams.include_achievements)
                      params.push("include_achievements=false");
                    return params.length > 0 ? `?${params.join("&")}` : "";
                  })()}
                </span>
              </span>
            </div>
          </div>
        </div>
        <p>
          Retrieve professional experience data with customizable parameters
        </p>
        
      </div>

      <div className="api-content">
        <div className="request-panel">
          <div className="panel-header">
            <h3>
              <FiFilter /> Request Parameters
            </h3>
            <button
              onClick={resetParams}
              className="reset-params-btn"
              title="Reset to defaults"
            >
              <FiRefreshCw />
            </button>
          </div>

          <div className="param-group">
            <h4>
              <FiSearch /> Search & Filter
            </h4>
            <div className="param-input-group">
              <label>Search Term:</label>
              <input
                type="text"
                placeholder="Search companies, positions, or descriptions..."
                value={apiParams.search}
                onChange={(e) => handleParamChange("search", e.target.value)}
                className="param-input"
              />
            </div>
            <div className="param-input-group">
              <label>Category Filter:</label>
              <select
                value={apiParams.category}
                onChange={(e) => handleParamChange("category", e.target.value)}
                className="param-select"
              >
                <option value="all">All Categories</option>
                <option value="php">PHP</option>
                <option value="laravel">Laravel</option>
                <option value="wordpress">WordPress</option>
                <option value="docker">Docker</option>
                <option value="azure">Azure</option>
              </select>
            </div>
          </div>

          <div className="param-group">
            <h4>
              <FiArrowUp /> Sorting & Limits
            </h4>
            <div className="param-input-group">
              <label>Sort By:</label>
              <select
                value={apiParams.sort}
                onChange={(e) => handleParamChange("sort", e.target.value)}
                className="param-select"
              >
                <option value="date_desc">Date (Newest First)</option>
                <option value="date_asc">Date (Oldest First)</option>
                <option value="company_asc">Company (A-Z)</option>
                <option value="company_desc">Company (Z-A)</option>
              </select>
            </div>
            <div className="param-input-group">
              <label>Limit Results:</label>
              <select
                value={apiParams.limit}
                onChange={(e) =>
                  handleParamChange("limit", parseInt(e.target.value))
                }
                className="param-select"
              >
                <option value={1}>1 result</option>
                <option value={2}>2 results</option>
                <option value={3}>3 results</option>
                <option value={4}>4 results</option>
                <option value={5}>5 results</option>
                <option value={10}>10 results</option>
              </select>
            </div>
          </div>

          <div className="param-group">
            <h4>Response Options</h4>
            <div className="param-input-group">
              <label>
                <input
                  type="checkbox"
                  checked={apiParams.include_achievements}
                  onChange={(e) =>
                    handleParamChange("include_achievements", e.target.checked)
                  }
                  className="param-checkbox"
                />
                Include Achievements
              </label>
            </div>
          </div>

          <div className="param-group">
            <h4>Headers</h4>
            <div className="param-item">
              <span className="param-key">Authorization</span>
              <span className="param-value" title="Bearer token">
                Bearer token
              </span>
              <span className="param-type">string</span>
            </div>
            <div className="param-item">
              <span className="param-key">Content-Type</span>
              <span className="param-value" title="application/json">
                application/json
              </span>
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
                  Fetching
                  <span className="loading-indicator"></span>
                </>
              ) : (
                "GET"
              )}
            </button>
          </div>

          {!showResponse ? (
            <div
              className="json-display"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#888",
                fontStyle: "italic",
              }}
            >
              Click "GET" to see the response
            </div>
          ) : (
            <>
              <div className="view-toggle">
                <button
                  className={viewMode === "raw" ? "active" : ""}
                  onClick={() => setViewMode("raw")}
                >
                  Raw Data
                </button>
                <button
                  className={viewMode === "preview" ? "active" : ""}
                  onClick={() => setViewMode("preview")}
                >
                  Preview
                </button>
              </div>

              {viewMode === "raw" ? (
                <SyntaxHighlighter
                  language="json"
                  style={document.documentElement.getAttribute('data-theme') === 'light' ? ghcolors : tomorrow}
                  customStyle={{
                    background: "var(--bg-card)",
                    borderRadius: "12px",
                    padding: "20px",
                    border: "1px solid var(--border-light)",
                    fontSize: "0.9rem",
                    lineHeight: "1.6",
                    overflowY: "auto",
                    maxHeight: "450px",
                    maxWidth: "100%",
                    overflowX: "auto",
                    wordWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  {formatJSON(filteredData || responseData)}
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
      description:
        "Led WordPress Plugin Development, specifically focusing on the User Registration Plugin (which has over 70,000 active installations). Developed scalable PHP applications utilizing OOP, jQuery, and WordPress architecture.",
      technologies: ["PHP", "WordPress", "jQuery", "OOP"],
      achievements: [
        "Led WordPress Plugin Development with 70,000+ active installations",
        "Developed scalable PHP applications using OOP principles",
        "Utilized jQuery and WordPress architecture effectively",
      ],
    },
    {
      id: 2,
      company: "Hitachi Energy",
      position: "Software Engineer",
      duration: "March 2023 - March 2024",
      description:
        "Contributed to 'TrmTracker,' an Energy Trade & Risk Management System, including handling legacy code and security improvements. Worked with Azure ADIHA Framework, PHP, jQuery, JavaScript, TSQL, and Stored Procedures.",
      technologies: ["PHP", "Azure", "jQuery", "JavaScript", "TSQL", "JIRA"],
      achievements: [
        "Contributed to Energy Trade & Risk Management System",
        "Handled legacy code and security improvements",
        "Worked with Azure ADIHA Framework and TSQL",
      ],
    },
    {
      id: 3,
      company: "Genius Systems Pvt. Ltd",
      position: "Software Engineer",
      duration: "February 2021 - March 2023",
      description:
        "Developed high-performance applications, including: IPCAM - Security Camera Management System, Marketplace - FinTech Proxy Service, WIMO - WiFi/Hotspot Management System.",
      technologies: [
        "Laravel",
        "Lumen",
        "Docker",
        "MySQL",
        "Graphana",
        "REST API",
        "Rancher",
      ],
      achievements: [
        "Developed IPCAM Security Camera Management System",
        "Built Marketplace FinTech Proxy Service",
        "Created WIMO WiFi/Hotspot Management System",
      ],
    },
    {
      id: 4,
      company: "CodeCater Studio",
      position: "Web Developer / Full-Stack Developer",
      duration: "September 2019 - February 2021",
      description:
        "Developed applications including 'SmartBus' (Bus Ticket Booking System) using Laravel, Yii2, Vue, HTML, and Bootstrap.",
      technologies: ["Laravel", "Yii2", "Vue", "HTML", "Bootstrap"],
      achievements: [
        "Developed SmartBus Bus Ticket Booking System",
        "Utilized Laravel, Yii2, and Vue.js frameworks",
        "Implemented responsive design with Bootstrap",
      ],
    },
  ],
  meta: {
    total: 4,
    page: 1,
    limit: 10,
    timestamp: "2024-01-15T10:30:00Z",
  },
};

export default ExperienceSection;
