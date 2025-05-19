describe("Article Processing", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("should process a BBC article and return badge + summary", () => {
    const bbcUrl = "https://www.bbc.com/news/world-us-canada-12345678"

    // Type URL and submit
    cy.get('input[type="url"]').type(bbcUrl)
    cy.get('button[type="submit"]').click()

    // Check loading state
    cy.get('button[type="submit"]').should("be.disabled")
    cy.get('button[type="submit"]').should("contain", "Generating")

    // Wait for result (max 10 seconds)
    cy.get('[role="doc-abstract"]', { timeout: 10000 }).should("exist")

    // Verify badge
    cy.get('[aria-label*="minute read"]').should("exist")

    // Verify summary
    cy.get('[role="doc-abstract"]')
      .invoke("text")
      .should("have.length.gt", 50)

    // Test copy buttons
    cy.get('button[aria-label="Copy badge HTML"]').click()
    cy.get('button[aria-label="Copy summary"]').click()
  })
}) 