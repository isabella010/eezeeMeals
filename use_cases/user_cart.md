# Adding Items to the Cart (done by Sophia)

### Actor (User)
Any customers that have a valid account.

### Pre-Conditions
Customer is logged into the system. Information about customer will already be saved in the database.

### Main Flow
1. Customer clicks on a meal page (ex: Salmon and Rice)
2. Website loads the meal page
3. Customer chooses quantity to purchase (will have + and - to add or decrease quantity)
4. Customer will click "Add to Cart"
5. System will decrease stock amount of that meal by quantity customer has chosen (ex: customer chooses to purchase 2 of the meals, stock will decrease by 2)
6. Meal will get added to the cart page with a picture of the meal, quantity, description, and price 

### Alternate Flow
1. If meal is sold out, customer will not be allowed to add to cart
1A. "Add to Cart" button will turn into "Sold Out" button

2. If customer decides they want to remove a meal from the cart, customer can select the "Remove" button to remove that meal 
2A. Stock count for that meal item will be re-added (ex: if customer added 2 Salmon Bowl's to the cart and then removes it, stock count for Salmon Bowl will increase by 2)

### Post-Conditions
After a customer has successfully added an item to the cart, stock will decrease by quantity customer will purchase and customer can head to payment processing page.
