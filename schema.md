-Product (Seltzer)
  -Flavor (string)
  -Inventory (int)
  -Price (float)
  -Description (text)
  -imageurl (string)
-User
  -e-mail (string, email)
  -first name (string)
  -last name (string)
  -address (string)
  -password (hashed)
  -phone number
  -order history (array of order id)
  -googleid
-Cart 
 -userid
 -products (array of product ids)
 -quantity
 -total price
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.hasMany(Product)
Product.belongsToMany(Cart)