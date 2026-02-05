var projects=[
{
    image:"./resources/projects/Screenshot 2023-04-21 173843.png",
    title:"Complete Responsive E-Commerce website",
    techStack:"Tech-stacks:- HTML|CSS|JavaScript",
    desc:"An E commerce website where you cn buy cloths, A collaborative project",
    githubLink:"https://github.com/prashant7650/cloudy-thing-7898",
    deployedLink:"https://animated-mooncake-900061.netlify.app/"
},
{
    image:"./resources/projects/voiceAssistance.png",
    title:"Voice assistance",
    techStack:"Tech-stacks:- HTML|CSS|JavaScript",
    desc:"A Voice assistant to assist you with your normal tasks.",
    githubLink:"https://github.com/Uselessme21/Jarvis",
    deployedLink:"https://inquisitive-starship-9b1631.netlify.app/"
},
{
    image:"./resources/projects/e-commerceGroup.png",
    title:"Complete Responsive E-Commerce website",
    techStack:"Tech-stacks:- HTML|CSS|JavaScript",
    desc:"An E commerce website where you can buy cloths, Individual project",
    githubLink:"https://github.com/Uselessme21/composed-roof-3359",
    deployedLink:"https://visionary-seahorse-7be6d0.netlify.app/"
},
{
    image:"./resources/projects/role_based.png",
    title:"Backend node.js | Role Based access",
    techStack:"Tech-stacks:- JavaScript|Node.js|Express.js",
    desc:"Users and Admins can create account with profile and other information and admin can handle all the users",
    githubLink:"https://github.com/Uselessme21/role_based",
    deployedLink:""
},
{
    image:"./resources/projects/trymyRecipe.png",
    title:"Recipe",
    techStack:"Tech-stacks:- Node.js|Express.js|React.js",
    desc:"User can create any recipe and can browse them with multiple options",
    githubLink:"https://github.com/Uselessme21/try_my_recipe",
    deployedLink:"https://try-my-recipe-wbsp.vercel.app"
}
]

function appendProjectsToDiv() {
    // Get the container div where you want to append projects
    var containerDiv = document.getElementById("p-cont"); // Replace with the actual ID of your container div
  
    // Loop through the projects array
    for (var i = 0; i < projects.length; i++) {
      // Create elements for each project
      var projectDiv = document.createElement("div");
      projectDiv.classList.add("project", "project-card");
  
      var thumbnailDiv = document.createElement("div");
      thumbnailDiv.classList.add("thumbnail");
  
      var thumbnailImg = document.createElement("img");
      thumbnailImg.src = projects[i].image;
      thumbnailImg.alt = "img";
  
      var titleElement = document.createElement("h2");
      titleElement.classList.add("project-title");
      titleElement.textContent = projects[i].title;
  
      var techStackElement = document.createElement("p");
      techStackElement.classList.add("project-tech-stack");
      techStackElement.textContent = projects[i].techStack;
  
      var descElement = document.createElement("p");
      descElement.classList.add("project-description");
      descElement.textContent = projects[i].desc;
  
      var actionDiv = document.createElement("div");
      actionDiv.classList.add("action");
  
      var githubLink = document.createElement("a");
      githubLink.classList.add("project-github-link");
      githubLink.href = projects[i].githubLink;
      githubLink.target = "_blank";
      githubLink.innerHTML = '<i class="fa-brands fa-square-github fa-beat-fade" style="color: #f24e1e;"> Codebase</i>';

      var deployedLink = document.createElement("a");
      deployedLink.classList.add("project-deployed-link");
      deployedLink.href = projects[i].deployedLink
      deployedLink.target = "_blank";
      deployedLink.innerHTML = '<i class="fa-solid fa-link fa-beat-fade" style="color: #f24e1e;"> Live</i>';
      if( projects[i].deployedLink ===""){
        deployedLink.innerHTML = '';
      }
     
  
      // Append elements to the project div
      thumbnailDiv.appendChild(thumbnailImg);
      actionDiv.appendChild(githubLink);
      actionDiv.appendChild(deployedLink || "none");
  
      projectDiv.appendChild(thumbnailDiv);
      projectDiv.appendChild(titleElement);
      projectDiv.appendChild(techStackElement);
      projectDiv.appendChild(descElement);
      projectDiv.appendChild(actionDiv);
  
      // Append the project div to the container div
      containerDiv.appendChild(projectDiv);
    }
  }
  
  // Call the function to append projects to the div
  appendProjectsToDiv();
  


  
