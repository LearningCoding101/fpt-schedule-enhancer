document.body.classList.add("enhanced-ui");

// Function to calculate contribution
function calculateContribution(grade, weight) {
  return ((grade * weight) / 100).toFixed(2);
}

// Enhance all grade tables
const gradeTables = document.querySelectorAll(
  "#ctl00_mainContent_divGrade table"
);
gradeTables.forEach((gradeTable) => {
  gradeTable.classList.add("enhanced-table");

  // Add new header for contribution if not already present
  const headerRow = gradeTable.querySelector("thead tr");
  if (
    headerRow &&
    !headerRow
      .querySelector("th:last-child")
      .textContent.includes("Contribution")
  ) {
    const newHeader = document.createElement("th");
    newHeader.textContent = "Contribution";
    headerRow.appendChild(newHeader);
  }

  const rows = gradeTable.querySelectorAll("tbody tr");
  rows.forEach((row) => {
    const weightCell = row.querySelector("td:nth-child(3)");
    const valueCell = row.querySelector("td:nth-child(4)");

    if (weightCell && valueCell) {
      let weight = parseFloat(weightCell.textContent);
      const value = parseFloat(valueCell.textContent);

      if (row.querySelector("td:first-child").textContent.includes("Total")) {
        // If the row contains "Total", calculate weight from totals
        const totalRow = row.querySelectorAll("td");
        const totalWeight = parseFloat(totalRow[2].textContent);
        const totalValue = parseFloat(totalRow[3].textContent);
        weight = (totalWeight / totalValue) * 100;
      }

      if (!isNaN(weight) && !isNaN(value)) {
        const contribution = calculateContribution(value, weight);

        // Create new cell for contribution if not already present
        if (
          !row.querySelector("td:last-child").classList.contains("contribution")
        ) {
          const contributionCell = document.createElement("td");
          contributionCell.textContent = contribution;
          contributionCell.classList.add("contribution");
          row.appendChild(contributionCell);
        }

        if (value >= 8) {
          valueCell.classList.add("high-grade");
        }
      }
    }
  });
});

// Enhance the term selection
const termDiv = document.querySelector("#ctl00_mainContent_divTerm");
if (termDiv) {
  const terms = termDiv.querySelectorAll("table tbody tr td");
  terms.forEach((term) => {
    term.classList.add("term-item");
    if (term.querySelector("b")) {
      term.classList.add("active");
    }
  });
}

// Enhance the course selection
const courseDiv = document.querySelector("#ctl00_mainContent_divCourse");
if (courseDiv) {
  const courses = courseDiv.querySelectorAll("table tbody tr td");
  courses.forEach((course) => {
    course.classList.add("course-item");
    if (course.querySelector("b")) {
      course.classList.add("active");
    }
  });
}

// Increase overall font size
document.body.style.fontSize = "16px";
