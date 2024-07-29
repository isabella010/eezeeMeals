# Creating An Account (done by Matt)


### Actor (User)
Prospective customer


### Pre-Conditions
 1. Prospective customer wants to make an account
 2. Prospective customer's email must not have been used to create an account in the past

### Main Flow
 1. Prospective customer opens up the website
 2. System displays homepage
 3. Prospective customer tries to add something to cart
 4. System prompts user to create account or log in
 5. Prospective customer clicks create account
 6. System loads account registration page
 7. Prospective customer Fills out page with their information
 8. System prompts user to confirm all the information is filled out correctly
 9. Prospective customer agrees
 10. System displays verification message that the account has been made
 11. Account information is stored into the database

### Alternate Flow
 * Prospective customer clicks 'Create Account' before trying to add something to their cart
    i. This is the only other way for a prospective customer to create an account
  
 * Prospective customer denies that they have entered all the information correctly
    i. Prospective customer will change their information then proceed with the main flow

### Post-Conditions
The prospective customer will have an activated, usuable account.
