/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

// === Utility to generate a random freelancer ===
function generateFreelancer() {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const occupation =
    OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)];
  const rate =
    Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min + 1)) +
    PRICE_RANGE.min;
  return { name, occupation, rate };
}

// === State initialization ===
const freelancers = Array.from({ length: NUM_FREELANCERS }, generateFreelancer);

// === Calculate average rate ===
function calculateAverageRate(freelancers) {
  const total = freelancers.reduce((sum, f) => sum + f.rate, 0);
  return (total / freelancers.length).toFixed(2);
}

const averageRate = calculateAverageRate(freelancers);

// === Component: Single freelancer row ===
function FreelancerRow({ name, occupation, rate }) {
  const tr = document.createElement("tr");

  const nameTd = document.createElement("td");
  nameTd.textContent = name;

  const occTd = document.createElement("td");
  occTd.textContent = occupation;

  const rateTd = document.createElement("td");
  rateTd.textContent = `$${rate}`;

  tr.append(nameTd, occTd, rateTd);
  return tr;
}

// === Component: Table body with freelancer rows ===
function FreelancerRows() {
  const fragment = document.createDocumentFragment();
  for (const freelancer of freelancers) {
    fragment.appendChild(FreelancerRow(freelancer));
  }
  return fragment;
}

// === Component: Average rate display ===
function AverageRateDisplay() {
  const p = document.createElement("p");
  p.textContent = `The average rate is $${averageRate}`;
  return p;
}

// === Render function to mount app ===
function renderApp() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <h1>Freelancer Forum</h1>
    <div id="averageRate"></div>
    <table border="1">
      <thead>
        <tr>
          <th>NAME</th>
          <th>OCCUPATION</th>
          <th>RATE</th>
        </tr>
      </thead>
      <tbody id="FreelancerRows"></tbody>
    </table>
  `;

  // Replace placeholder with actual components
  app.querySelector("#averageRate").replaceWith(AverageRateDisplay());
  app.querySelector("#FreelancerRows").replaceWith(FreelancerRows());
}

// Call render to mount app
renderApp();
