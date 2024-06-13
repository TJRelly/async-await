const deck = {
  async shuffle() {
    try {
      let res = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      this.deckId = res.data.deck_id;
    } catch (err) {
      console.log(err);
    }
  },
  async drawCard() {
    try {
      let res = await axios.get(
        `https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`
      );
      let { suit, value } = res.data.cards[0];
      console.log(value.toLowerCase() + " of " + suit.toLowerCase());
      return res.data.cards[0];
    } catch (err) {
      console.log(err);
    }
  },
};

function fetchCard() {
  deck.shuffle();
  $("button").click(async function () {
    try {
      let card = await deck.drawCard();
      $("img").attr("src", card.image);
    } catch (err) {
      $(".error-msg").text("There are no more cards in the deck");
    }
  });
}

fetchCard();
