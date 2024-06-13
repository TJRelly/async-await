// Get a number fact
async function getFact(n) {
  try {
    let res = await axios.get(`http://numbersapi.com/${n}?json`);
    console.log(res.data.text);
  } catch (e) {
    console.error(e);
  }
}

getFact(5);

// Batch Request
async function getBatchFacts(a, b) {
  try {
    let res = await axios.get(`http://numbersapi.com/${a}..${b}?json`);
    console.log(res.data);
  } catch (e) {
    console.error(e);
  }
}

getBatchFacts(5, 10);

//Get 4 facts on favorite number
async function getFourFacts(n) {
  try {
    let res = await axios.get(`http://numbersapi.com/${n}?json`);
    return res.data.text;
  } catch (e) {
    console.error(e);
  }
}

async function fetchFacts() {
  let fav_facts = [];
  let fav_num = 7;

  for (let i = 0; i < 4; i++) {
    fav_facts.push(getFourFacts(fav_num));
  }

  // Wait for all promises to resolve
  fav_facts = await Promise.all(fav_facts);

  console.log(fav_facts);
  for (const fact of fav_facts) {
    $(".fav-facts").append(`<li>${fact}</li>`);
  }
}

fetchFacts();
