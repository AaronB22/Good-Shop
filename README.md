# Welcome To Good Shop! #

    This app is a ecommerce webesite demo project. In this app the user will be able to create an account that is saved to a MongoDB database.The user will be able to browse different catagories of products, as well as browse through products. The user can also search for items. The user can also use a price filter to change the view list in real time, no reload needed. The user can than add a product to a cart. The user can than go to the cart and see all items added to cart and the total cost of said items. The app is fully responsive. App will work from as small as 280px wide screens up to 4k screens. This app saves products to a MongoDB database, where all info of the product is store. Including the product img file. The app also always admins of the site to add more products.

    Technology Used:
    1. MERN Stack
        MongoDB,
        Express.js,
        React,
        Node.js
    2. React Browser Router,
    3. SCSS/SASS;
    4. Bootstrap;
    5. Bycrpt;
    6. Concurrently (for dev server);
    7. Multer;
    8. Mongoose.js;


    How To Use App:
        Live Version:
See [liveVersion](https://aaronb22goodshop.herokuapp.com/);    
    1.Open live version in your browser.
    2.Create An account:
        2.1 On screens 1400px<. To do so, go to the upper right corner, you will see "Log In". Click, than at the bottom Click "Create Account". Than fill out the forum.
        2.2: For Smaller Screens. On the upper left corner. Click on the Hamburger Menu (the three white lines). Than a bigger menu will open up. At the bottom it will say "Sign In". Click, than at the bottom Click "Create Account". Than fill out the forum.
    3. Now Logged in. You are now free to use the full app. To Navgite:
        3.1: For bigger screens, the subNavBar will have all catagories listed. As well as the home page.
        3.2: For smaller screens, the homepage as all categories. As well as the hamburger pop out menu.
    4. Click add to cart on any product to add it to cart.
    5. To go to Cart:
        5.1: Bigger screens: click the cart icon on the upper right corner.
        5.2: Smaller screens: click the hamburger menu again. Than there click of the cart link.
    
    HOW TO USE LOCAL:
        To use locally you must have a MongoDB local server setup. Also must have Node.js.

        1. Clone Repo.
        2.Open repo in Terminal.
        3.Connect app to your local MongoDB Server. The defualt name this app looks for is 'mongodb://localhost/ecom' . To change the name the server looks for, you can ethier:
            5.1 Add a .env file and use varible 'MONGODB_URI '. 
            5.2 OR go in server.js on line 23 change name there.
        6. In Terminal, use command 'npm run build'. Wait for Build.
        7. run 'npm run'.
        
        This app runs on localhost:5000. To Change it, add/edit .env file and add PORT varible with the port number of your choice
        
        