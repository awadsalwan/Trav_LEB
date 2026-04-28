// ===== LOAD JSON =====
let travelData = {};

fetch("travLeb.json")
  .then(response => response.json())
  .then(data => {
    travelData = data;
    console.log("Loaded data:", travelData); // ✅ check in console
  })
  .catch(error => {
    console.error("Error loading JSON:", error);
  });


// ===== SEARCH FUNCTION =====
document.getElementById("btnSearch").addEventListener("click", function () {

  const input = document.getElementById("searchInput").value.toLowerCase().trim();
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "";

  let results = [];

  // ===== SEARCH COUNTRIES -> CITIES =====
  travelData.countries.forEach(country => {
    country.cities.forEach(city => {
      if (
        city.name.toLowerCase().includes(input) ||
        country.name.toLowerCase().includes(input)
      ) {
        results.push(city);
      }
    });
  });

  // ===== SEARCH TEMPLES =====
  travelData.temples.forEach(temple => {
    if (temple.name.toLowerCase().includes(input)) {
      results.push(temple);
    }
  });

  // ===== SEARCH BEACHES =====
  travelData.beaches.forEach(beach => {
    if (beach.name.toLowerCase().includes(input)) {
      results.push(beach);
    }
  });

  // ===== DISPLAY RESULTS =====
  if (results.length === 0) {
    resultDiv.innerHTML = "<p style='color:white;'>No results found</p>";
    return;
  }

  results.forEach(place => {
    resultDiv.innerHTML += `
      <div class="card">
        <img src="${place.imageUrl}" alt="${place.name}">
        <div class="card-content">
          <h3>${place.name}</h3>
          <p>${place.description}</p>
        </div>
      </div>
    `;
  });
});


// ===== CLEAR BUTTON =====
document.getElementById("btnClear").addEventListener("click", function () {
  document.getElementById("searchInput").value = "";
  document.getElementById("result").innerHTML = "";
});