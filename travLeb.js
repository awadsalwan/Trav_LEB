// ===== LOAD JSON =====
let travelData = {};

fetch("travLeb.json")
  .then(response => response.json())
  .then(data => {
    travelData = data;
    console.log("Loaded data:", travelData);
  })
  .catch(error => {
    console.error("Error loading JSON:", error);
  });


// ===== RANDOM PICK HELPER =====
function getRandomItems(arr, count) {
  let shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}


// ===== CLEAR FUNCTION =====
function clearResults() {
  const resultDiv = document.getElementById("result");
  const searchInput = document.getElementById("searchInput");

  resultDiv.innerHTML = "";
  searchInput.value = "";
}


// ===== START EXPLORING BUTTON =====
document.getElementById("exploreBtn").addEventListener("click", function () {

  // safety check
  if (!travelData.countries) {
    alert("Data still loading, try again...");
    return;
  }

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  let allPlaces = [];

  // collect cities
  travelData.countries.forEach(country => {
    allPlaces.push(...country.cities);
  });

  // collect temples
  allPlaces.push(...travelData.temples);

  // collect beaches
  allPlaces.push(...travelData.beaches);

  // pick random places
  let randomPlaces = getRandomItems(allPlaces, 3);

  // display
  randomPlaces.forEach(place => {
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


// ===== SEARCH BUTTON =====
document.getElementById("btnSearch").addEventListener("click", function () {

  // safety check
  if (!travelData.countries) {
    alert("Data still loading, try again...");
    return;
  }

  const input = document.getElementById("searchInput").value
    .toLowerCase()
    .trim();

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  let results = [];

  // ===== KEYWORD: BEACH =====
  if (input.includes("beach")) {
    results = travelData.beaches;
  }

  // ===== KEYWORD: TEMPLE =====
  else if (input.includes("temple")) {
    results = travelData.temples;
  }

  // ===== KEYWORD: COUNTRY =====
  else if (input.includes("country")) {
    travelData.countries.forEach(country => {
      results.push(...country.cities);
    });
  }

  // ===== SEARCH BY NAME =====
  else {
    travelData.countries.forEach(country => {

      if (country.name.toLowerCase().includes(input)) {
        results.push(...country.cities);
      }

      country.cities.forEach(city => {
        if (city.name.toLowerCase().includes(input)) {
          results.push(city);
        }
      });
    });

    travelData.temples.forEach(temple => {
      if (temple.name.toLowerCase().includes(input)) {
        results.push(temple);
      }
    });

    travelData.beaches.forEach(beach => {
      if (beach.name.toLowerCase().includes(input)) {
        results.push(beach);
      }
    });
  }

  // ===== DISPLAY =====
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


// ===== CLEAR BUTTON EVENT =====
document.getElementById("btnClear").addEventListener("click", clearResults);