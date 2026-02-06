const skills = [
    {
      image: "./resources/techSkills/html_original_wordmark_logo_icon_146478.png",
      name: "HTML"
    },
    {
      image: "./resources/techSkills/css_original_wordmark_logo_icon_146576.png",
      name: "CSS"
    },
    {
      image: "./resources/techSkills/javascript_original_logo_icon_146455.png",
      name: "JavaScript"
    },
    {
      image: "./resources/techSkills/nodejs_original_wordmark_logo_icon_146412.png",
      name: "Node.js"
    },
    {
      image: "./resources/techSkills/npm_original_wordmark_logo_icon_146402.png",
      name: "NPM"
    },
    {
      image: "./resources/techSkills/express_original_logo_icon_146527.png",
      name: "Express.js"
    },
    {
      image: "./resources/techSkills/file_type_typescript_official_icon_130107.png",
      name: "TypeScript"
    },
    {
      image: "./resources/techSkills/mongodb_original_wordmark_logo_icon_146425.png",
      name: "MongoDB"
    },
    {
      image: "./resources/techSkills/mysql_original_wordmark_logo_icon_146417.png",
      name: "MySQL"
    },
    {
      image: "./resources/techSkills/redis_original_wordmark_logo_icon_146369.png",
      name: "Redis"
    },
    {
      image: "./resources/techSkills/file_type_swagger_icon_130134.png",
      name: "Swagger"
    },
    {
      image: "./resources/techSkills/react_original_logo_icon_146374.png",
      name: "React.js"
    },
    {
      image: "./resources/techSkills/amazon_aws_logo_icon_145507.png",
      name: "AWS"
    },
    {
      image: "./resources/techSkills/postman_macos_bigsur_icon_189815.png",
      name: "Postman"
    },
    {
      image: "./resources/techSkills/file_type_netlify_icon_130354.png",
      name: "Netlify"
    },
    {
      image: "./resources/techSkills/git_original_wordmark_logo_icon_146510.png",
      name: "Git"
    },
    {
      image: "./resources/techSkills/github-logo_icon-icons.com_73546.png",
      name: "GitHub"
    },
    {
      image: "./resources/techSkills/code_103074.png",
      name: "Visual Studio Code"
    }
  ];
  
  function createSkillElement(skill) {
    const skillBox = document.createElement("div");
    skillBox.classList.add("skill-box", "skills-card");
  
    const skillTitle = document.createElement("div");
    skillTitle.classList.add("skill-title");
  
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("img");
  
    const img = document.createElement("img");
    img.classList.add("skill-icon", "skills-card-img");
    img.src = skill.image;
    img.alt = skill.name;
  
    const skillName = document.createElement("h3");
    skillName.classList.add("skills-card-name");
    skillName.textContent = skill.name;
  
    imgDiv.appendChild(img);
    skillTitle.appendChild(imgDiv);
    skillTitle.appendChild(skillName);
  
    skillBox.appendChild(skillTitle);
  
    return skillBox;
  }
  
  function appendSkillsToContainer(skills, containerId) {
    const containerDiv = document.getElementById(containerId);
  
    if (!containerDiv) {
      console.error("Container div not found!");
      return;
    }
  
    skills.forEach(skill => {
      const skillElement = createSkillElement(skill);
      containerDiv.appendChild(skillElement);
    });
  }
  
  // Replace "yourSkillsContainerId" with the actual ID of your container div
  appendSkillsToContainer(skills, "s-cont");
  
  
