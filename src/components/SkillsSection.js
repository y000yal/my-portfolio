import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow, ghcolors } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  FiCode,
  FiDatabase,
  FiServer,
  FiMonitor,
  FiTool,
  FiShield,
  FiZap,
  FiCheckCircle,
  FiBox,
  FiCloud,
  FiGitBranch,
  FiTerminal,
  FiSettings,
  FiLayers,
  FiPackage,
  FiSearch,
  FiFilter,
  FiRefreshCw,
} from "react-icons/fi";

const SkillsSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [viewMode, setViewMode] = useState("raw"); // 'raw' or 'preview'

  // API Parameters State
  const [apiParams, setApiParams] = useState({
    include_levels: true,
    category: "all",
    skill_level: "all",
    search: "",
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

  // Filter data based on API parameters
  useEffect(() => {
    if (responseData) {
      let filtered = { ...responseData };

      // Apply search filter
      if (apiParams.search) {
        const searchTerm = apiParams.search.toLowerCase();
        filtered.data = Object.keys(responseData.data).reduce(
          (acc, category) => {
            acc[category] = {};
            Object.keys(responseData.data[category]).forEach((subcategory) => {
              acc[category][subcategory] = responseData.data[category][
                subcategory
              ].filter((skill) => skill.toLowerCase().includes(searchTerm));
            });
            return acc;
          },
          {}
        );
      }

      // Apply category filter
      if (apiParams.category !== "all") {
        filtered.data = Object.keys(responseData.data).reduce(
          (acc, category) => {
            if (
              category.toLowerCase().includes(apiParams.category.toLowerCase())
            ) {
              acc[category] = responseData.data[category];
            }
            return acc;
          },
          {}
        );
      }

      // Apply skill level filter
      if (apiParams.skill_level !== "all") {
        filtered.proficiency_levels = {
          [apiParams.skill_level]:
            responseData.proficiency_levels[apiParams.skill_level] || [],
        };
      }

      setFilteredData(filtered);
    }
  }, [responseData, apiParams]);

  const simulateApiRequest = async () => {
    setIsLoading(true);
    setShowResponse(false);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Set response data
    setResponseData(skillsData);
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
      include_levels: true,
      category: "all",
      skill_level: "all",
      search: "",
      format: "json",
    });
  };

  const formatJSON = (obj) => {
    return JSON.stringify(obj, null, 2);
  };

  const renderPreview = () => {
    if (!filteredData) return null;

    const getSkillLevel = (skillName) => {
      if (filteredData.proficiency_levels?.expert?.includes(skillName))
        return "Expert";
      if (filteredData.proficiency_levels?.advanced?.includes(skillName))
        return "Advanced";
      if (filteredData.proficiency_levels?.intermediate?.includes(skillName))
        return "Intermediate";
      if (filteredData.proficiency_levels?.beginner?.includes(skillName))
        return "Beginner";
      return "Intermediate";
    };

    const renderSkillBar = (level) => {
      const levels = {
        Expert: 100,
        Advanced: 80,
        Intermediate: 60,
        Beginner: 40,
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
        PHP: <FiCode />,
        JavaScript: <FiCode />,
        TypeScript: <FiCode />,
        Laravel: <FiCode />,
        WordPress: <FiCode />,
        "Vue.js": <FiCode />,
        React: <FiCode />,
        HTML5: <FiCode />,
        CSS3: <FiCode />,
        SCSS: <FiCode />,
        Bootstrap: <FiCode />,
        "Tailwind CSS": <FiCode />,
        "Material-UI": <FiCode />,
        Docker: <FiBox />,
        Git: <FiGitBranch />,
        MySQL: <FiDatabase />,
        PostgreSQL: <FiDatabase />,
        Azure: <FiCloud />,
        AWS: <FiCloud />,
        Lumen: <FiCode />,
        Yii2: <FiCode />,
        Vuex: <FiCode />,
        jQuery: <FiCode />,
        Axios: <FiCode />,
        Rancher: <FiBox />,
        "GitHub Actions": <FiGitBranch />,
        Jenkins: <FiSettings />,
        Graphana: <FiMonitor />,
        Prometheus: <FiMonitor />,
        DigitalOcean: <FiCloud />,
        GitHub: <FiGitBranch />,
        "Azure Git": <FiGitBranch />,
        JIRA: <FiSettings />,
        Trello: <FiSettings />,
        Asana: <FiSettings />,
        "VS Code": <FiTerminal />,
        PHPStorm: <FiTerminal />,
        Postman: <FiTerminal />,
        phpMyAdmin: <FiDatabase />,
        "MySQL Workbench": <FiDatabase />,
      };
      return iconMap[skillName] || <FiCode />;
    };

    return (
      <div className="preview-container">
        <div className="preview-header">
          <h1>Technical Skills & Expertise</h1>
          {apiParams.search && (
            <div className="search-results-info">
              Showing skills matching "{apiParams.search}"
            </div>
          )}
          {apiParams.category !== "all" && (
            <div className="search-results-info">
              Filtered by category: {apiParams.category}
            </div>
          )}
        </div>

        {Object.keys(filteredData.data).map((category) => (
          <div key={category} className="skills-section">
            <h2>
              {category === "backend" && <FiServer />}
              {category === "frontend" && <FiCode />}
              {category === "devops" && <FiMonitor />}
              {category === "tools" && <FiTool />}
              {category === "expertise" && <FiCheckCircle />}{" "}
              {category.charAt(0).toUpperCase() + category.slice(1)} Development
            </h2>
            <div className="skills-grid">
              {Object.keys(filteredData.data[category]).map((subcategory) => (
                <div key={subcategory} className="skill-category">
                  <h3>
                    {subcategory === "languages" && <FiCode />}
                    {subcategory === "frameworks" && <FiCode />}
                    {subcategory === "databases" && <FiDatabase />}
                    {subcategory === "apis" && <FiCode />}
                    {subcategory === "ui_frameworks" && <FiCode />}
                    {subcategory === "libraries" && <FiCode />}
                    {subcategory === "containers" && <FiBox />}
                    {subcategory === "ci_cd" && <FiGitBranch />}
                    {subcategory === "monitoring" && <FiMonitor />}
                    {subcategory === "cloud" && <FiCloud />}
                    {subcategory === "version_control" && <FiGitBranch />}
                    {subcategory === "project_management" && <FiSettings />}
                    {subcategory === "development" && <FiTerminal />}
                    {subcategory === "database_tools" && <FiDatabase />}
                    {subcategory === "architecture" && <FiCode />}
                    {subcategory === "security" && <FiShield />}
                    {subcategory === "performance" && <FiZap />}
                    {subcategory === "testing" && <FiCheckCircle />}{" "}
                    {subcategory
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </h3>
                  {filteredData.data[category][subcategory].map(
                    (skill, index) => (
                      <div key={index} className="skill-item">
                        <div className="skill-info">
                          <span className="skill-icon">
                            {getSkillIcon(skill)}
                          </span>
                          <span className="skill-name">{skill}</span>
                        </div>
                        {apiParams.include_levels && (
                          <div className="skill-level">
                            {renderSkillBar(getSkillLevel(skill))}
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="api-section" id="skills-section">
      <div className="api-header">
        <div className="url-builder-container">
          <div className="url-builder">
            <div className="url-display">
              <span className="url-method">GET</span>
              <span className="url-base">/api/skills</span>
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
                  if (apiParams.skill_level !== "all")
                    params.push(
                      `skill_level=${encodeURIComponent(apiParams.skill_level)}`
                    );
                  if (!apiParams.include_levels)
                    params.push("include_levels=false");
                  return params.length > 0 ? `?${params.join("&")}` : "";
                })()}
              </span>
            </div>
          </div>
        </div>
        <p>
          Retrieve technical skills and expertise data with customizable
          parameters
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
              <label>Search Skills:</label>
              <input
                type="text"
                placeholder="Search for specific skills..."
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
                <option value="backend">Backend</option>
                <option value="frontend">Frontend</option>
                <option value="devops">DevOps</option>
                <option value="tools">Tools</option>
                <option value="expertise">Expertise</option>
              </select>
            </div>
            <div className="param-input-group">
              <label>Skill Level Filter:</label>
              <select
                value={apiParams.skill_level}
                onChange={(e) =>
                  handleParamChange("skill_level", e.target.value)
                }
                className="param-select"
              >
                <option value="all">All Levels</option>
                <option value="expert">Expert Only</option>
                <option value="advanced">Advanced Only</option>
                <option value="intermediate">Intermediate Only</option>
                <option value="beginner">Beginner Only</option>
              </select>
            </div>
          </div>

          <div className="param-group">
            <h4>Response Options</h4>
            <div className="param-input-group">
              <label>
                <input
                  type="checkbox"
                  checked={apiParams.include_levels}
                  onChange={(e) =>
                    handleParamChange("include_levels", e.target.checked)
                  }
                  className="param-checkbox"
                />
                Include Proficiency Levels
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

const skillsData = {
  success: true,
  data: {
    backend: {
      languages: ["PHP", "JavaScript", "TypeScript"],
      frameworks: ["Laravel", "Lumen", "WordPress", "Yii2"],
      databases: ["MySQL", "TSQL", "PostgreSQL"],
      apis: ["RESTful APIs", "GraphQL", "SOAP"],
    },
    frontend: {
      frameworks: ["Vue.js", "Vuex", "React"],
      languages: ["HTML5", "CSS3", "SCSS", "JavaScript"],
      ui_frameworks: ["Bootstrap", "Tailwind CSS", "Material-UI"],
      libraries: ["jQuery", "Axios"],
    },
    devops: {
      containers: ["Docker", "Rancher"],
      ci_cd: ["GitHub Actions", "Azure DevOps", "Jenkins"],
      monitoring: ["Graphana", "Prometheus"],
      cloud: ["Azure", "AWS", "DigitalOcean"],
    },
    tools: {
      version_control: ["Git", "GitHub", "Azure Git"],
      project_management: ["JIRA", "Trello", "Asana"],
      development: ["VS Code", "PHPStorm", "Postman"],
      database_tools: ["phpMyAdmin", "MySQL Workbench"],
    },
    expertise: {
      architecture: ["System Architecture", "Database Design", "API Design"],
      security: ["Payment Gateway Security", "OAuth 2.0", "JWT", "HTTPS"],
      performance: ["Code Optimization", "Database Optimization", "Caching"],
      testing: ["Unit Testing", "Integration Testing", "API Testing"],
    },
  },
  proficiency_levels: {
    expert: ["PHP", "Laravel", "MySQL", "WordPress"],
    advanced: ["Git", "REST APIs"],
    intermediate: [
      "React",
      "Docker",
      "TypeScript",
      "AWS",
      "GraphQL",
      "Node.js",
      "Vue.js",
    ],
    beginner: ["Python", "", "Kubernetes"],
  },
};

export default SkillsSection;
