Feature:
  As user of the FSD search
  I expect that searches based on a location will show nearby results first
  So that I can find the most accessible services

Background:
  Given I visit the main page

Scenario: I search near a location
  The scenario provided by the stakeholders expects New Plymouth Budget Advisory
  Service to be the first result, but actually another service in the same
  building is presented first. We check for both here.

  Given I enter "36 Leach Street New Plymouth" into the "address-autosuggest" input
  And The first suggestion is "36 Leach Street, New Plymouth 4310"
  And I click on the first address suggestion
  Then I see at least "5" service providers
  And The first result is "Epilepsy Association of New Zealand Taranaki Branch"
  And a result is "New Plymouth Budget Advisory Service"

Scenario: I search with a category and a location
  Given I click on "Budgeting / Financial Capability"
  And I enter "36 Leach Street New Plymouth" into the "address-autosuggest" input
  And The first suggestion is "36 Leach Street, New Plymouth 4310"
  And I click on the first address suggestion
  Then I see at least "5" service providers
  And The first result is "New Plymouth Budget Advisory Service"

Scenario: 
  Given I click on "Child Care"
  Given I enter "56 the Terrace Wellington Central" into the "address-autosuggest" input
  And I click on the first address suggestion
  And I click on the "input" with "value" "100"
  And I click on "Search"
  Then I see at least "10" service providers
  And I see a "address" which says "Lower Hutt"