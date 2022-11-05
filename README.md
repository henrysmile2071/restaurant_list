# My Restaurant List

![Index page about Restaurant List](./public/image/snapshot3.png)

## About

Add your account and start collecting your personal list of restaurants with a simple search bar.

### Functions

- Display all restaurants
- Display restaurant details when clicked
- Connect to Google maps when icon is clicked
- Search restaurants via name or category and sort alphabetically/by category
- Add new restaurant to list
- Edit restaurant details
- Delete selected restaurant
- Register as a user
- Login to access to your personal list
- Facebook login
- Password hash via bcrypt
- User Authentication (redirect users if not logged in)

## Installation

1. Check if node.js and npm is installed
2. Clone project to local 
3. Navigate to the project folder via the terminal, then install：

   ```bash
   npm install
   ```

4. Set MongoDB URI at local evironmental constant:

   ```bash
   export MONGODB_URI2="mongodb+srv://<your_account>:<your_password>@cluster0.j9qlz5q.mongodb.net/restaurant-list?retryWrites=true&w=majority"
   ```
5. Run seeder: 

   ```bash
   npm run seed
   ```

6. Then：

   ```bash
   npm run start
   ```

7. If the code is running successfully(see message below), open your browser and go to http://localhost:3000

   ```bash
   Listening on http://localhost:3000
   mongodb connected!
   ```

8. To stop the program:

   ```bash
   ctrl + c
   ```

## Tools

- Node.js 14.16.0
- Express 4.16.4
- Express-Handlebars 3.0.0
- Bootstrap 5.2.0
- Font-awesome 6.1.2
- mongoDB 4.9.1
- mongoose 5.13.15
- method-override 3.0.0
- passport 0.4.1
- passport-facebook 3.0.0
- passport-local 1.0.0
- express-session 1.17.1
- bcryptjs 2.4.3
- connect-flash 0.1.1
- dotenv 16.0.3