describe("Matched Dog Page spec", () => {
  beforeEach(() => {
    cy.fixture("dogData").then((json) => {
      cy.intercept("GET", "https://api.thedogapi.com/v1/breeds", json);
      cy.visit("http://localhost:3000");
      cy.get(".mood-container").contains("h2", "The Defender").click();
      cy.get(".submit-button").click();
    });
  });

  it("should be able to visit the Matches page and see the App header, section header, and nav bar links", () => {
    cy.contains(".app-title", "Canine Cupid");
    cy.contains("h4", "· A Wag Worthy Match ·");
    cy.url().should("include", "/matches");
    cy.contains(".matches-header", "Your Dog Matches");
  });

  it("should be able to see nav link to Favorites and view page when clicked", () => {
    cy.contains(".links", "Favorites").click();
    cy.url().should("include", "/favorites");
  });

  it("should see a swiper carousel of dog card matches with the dogs picture, breed name, info icon, and favorite icon", () => {
    cy.get(".matches-swiper").should("be.visible");
    cy.get(".featured-dog-image").should(
      "have.attr",
      "src",
      "https://cdn2.thedogapi.com/images/rkiByec47.jpg"
    );
    cy.get(".dog-breed").contains("African Hunting Dog");
    cy.get(".info-icon").should("be.visible");
    cy.get(".favorite-image").should("be.visible");
  });

  it("should be able to click through the swiper buttons to go through matched dog cards", () => {
    cy.get(".swiper-button-next").click();
    cy.get(".featured-dog-image")
      .eq(1)
      .should(
        "have.attr",
        "src",
        "https://cdn2.thedogapi.com/images/26pHT3Qk7.jpg"
      );
    cy.get(".dog-breed").contains("Akbash Dog");
  });

  it("should be able to visit the dog info page when info icon is clicked on a dog card", () => {
    cy.get(".info-icon").first().click();
    cy.url().should("include", "/African%20Hunting%20Dog");
  });

  it("should be able to favorite and unfavorite dog cards when heart icon is clicked", () => {
    cy.get(".favorite-image").first().click();
    cy.get(".favorite-image").first().click();
  });

  it("should display a message to the user when matches are lost upon page refresh", () => {
    cy.reload();
    cy.contains(
      "h2",
      "Sorry! We lost your matches. Please click the logo at the top to go home."
    );
  });
});
