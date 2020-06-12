# Usage
* Open a terminal window (on linux and mac) or command prompt on Windows
    1. Type __npm install__ to install all dependencies
    2. Type __*npm start*__ to start the server
        __Default port is 3000
    3. Open your browser and enter any of the endpoints
        * http://localhost:3000/api/add_page
                > Form data:
                    * title
                    * content
        * http://localhost:3000/api/retrieve_page_html?url=https://wikipedia.com&type=external

        * http://localhost:3000/api/set_page_markdown?type=external&url=https://wikipedia.com > GET Request

        * http://localhost:3000/api/set_page_markdown > POST Request
                > Form data:
                        * title
                        * markdown

        * http://localhost:3000/api/list_pages

# Dependencies

    * ExpressJS
    * Request
    * Showdown
    * Turndown
    * Mongoose
    
# Documentation

   1. When POST a request is made to _/add_page_ (with title and content contained in the request), it saves it to the database
   2. When a GET request is made to _/retrieve_page_html_, it retrieves the webpage and displays it as raw HTML.
   3. When a  request is made to _/set_page_markdown_, we first do a GET request to /set_page_markdown which behind the scene           retrieves the requested url (internal or external url?, converts it to markdown and then send to the client for update.
      Now the client updates it and then sends a POST request to /set_page_markdown which converts back to html and stores.
   4. A GET request is made to /list_pages which retrieves all pages stored in the database.
   
  ### /add_page
      You need to make a POST request here
      This endpoint takes exactly to parameters
      * title - Title of the page to be added.
      * content - HTML markup of the page to be added.
         > 'http://somepage.com/add_page?title=title&content=content'
         
   ### /retrieve_page_html
      The endpoint handles two methods
      * Request type: __GET__
         This can be an __internal__ or an __external__ request.
            __Internal Request__ checks the local database and retrieves all available pages then sends them back to the                   client.
            The user selects the page and sends a POST request containing the _id of the page. The page is located in the database and sent back to the user as RAW HTML.            
            
### /set_page_markdown
    Similar to the /retrieve_page_html, this also has two routes, a GET and POST.
    * Send a GET request to /set_page_markdown
    * Page is retrieved
    * Converted to markdown
    * Sent back
    * User edits/updates page markdown
    * User sends POST request with updated markdown
    * Markdown is converted back to HTML and saved in the database
    
### /list_pages
    * GET request is sent to /list_pages
    * All data contained in the database is retrieved and sent back.
     
