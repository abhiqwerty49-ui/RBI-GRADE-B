const syllabus = {
  "Economic & Social Issues (ESI)": [
    "Growth & Development",
    "Indian Economy",
    "Globalization",
    "Poverty & Employment",
    "Sustainable Development",
    "Social Structure in India"
  ],
  "Finance & Management (FM)": [
    "Financial System",
    "Financial Markets",
    "Risk Management",
    "Derivatives",
    "Leadership",
    "Motivation",
    "Human Resource Management"
  ],
  "English (Writing Skills)": [
    "Essay Practice",
    "Precis Writing",
    "Reading Comprehension"
  ]
};

const tracker = document.getElementById("tracker");

function loadProgress() {
  return JSON.parse(localStorage.getItem("rbiProgress") || "{}");
}

function saveProgress(data) {
  localStorage.setItem("rbiProgress", JSON.stringify(data));
}

function render() {
  const progressData = loadProgress();
  tracker.innerHTML = "";

  Object.keys(syllabus).forEach(paper => {
    const paperDiv = document.createElement("div");
    paperDiv.className = "paper";

    const title = document.createElement("h2");
    title.textContent = paper;
    paperDiv.appendChild(title);

    let completed = 0;

    syllabus[paper].forEach(topic => {
      const topicDiv = document.createElement("div");
      topicDiv.className = "topic";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = progressData[paper]?.includes(topic);

      checkbox.addEventListener("change", () => {
        const data = loadProgress();
        data[paper] = data[paper] || [];

        if (checkbox.checked) {
          data[paper].push(topic);
        } else {
          data[paper] = data[paper].filter(t => t !== topic);
        }

        saveProgress(data);
        render();
      });

      if (checkbox.checked) completed++;

      const label = document.createElement("label");
      label.textContent = topic;

      topicDiv.appendChild(checkbox);
      topicDiv.appendChild(label);
      paperDiv.appendChild(topicDiv);
    });

    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";

    const progress = document.createElement("div");
    progress.className = "progress";
    progress.style.width = `${(completed / syllabus[paper].length) * 100}%`;

    progressBar.appendChild(progress);
    paperDiv.appendChild(progressBar);

    tracker.appendChild(paperDiv);
  });
}

render();
