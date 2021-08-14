# Books Directory REST API

This is a basic library REST API that gets, adds, update and deletes books in and from a database.

## Install the npm and dependencies

- run `npm i`

## Run the API

- run `npm start`
- or run `node server.js` file in `%FOLDER%/src/server.js`on the command-line to start the server.

# REST API

(Preferable) Use Postman to fetch from the API.

## Get all books

### Request

`GET /book/`

    `http://localhost:{PORT}/book`

### Response

    ```
    [
        {
    		"_id": "60ac0001d677c41cdf3fb6a8",
    		"isbn": "9781593275846",
    		"title": "Eloquent JavaScript, Second Edition",
    		"author": "Marijn Haverbeke",
    		"publisher": "No Starch Press",
    		"pages": 472,
    		"published": "2014-12-14T00:00:00.000Z",
    		"publish": "2021-06-10T17:45:04.729Z"
    	}
    ]
    ```

## Get a specific book

### Request

`GET /book/isbn:isbn?/title:title?`

    `http://localhost:{PORT}/book/isbn9781593275846/title`
    `http://localhost:{PORT}/book/isbn/titleEloquent%20JavaScript,%20Second%20Edition`
    `http://localhost:{PORT}/book/isbn9781593275846/titleEloquent%20JavaScript,%20Second%20Edition`

### Response

    ```
    [
        {
    		"_id": "60ac0001d677c41cdf3fb6a8",
    		"isbn": "9781593275846",
    		"title": "Eloquent JavaScript, Second Edition",
    		"author": "Marijn Haverbeke",
    		"publisher": "No Starch Press",
    		"pages": 472,
    		"published": "2014-12-14T00:00:00.000Z",
    		"publish": "2021-06-10T17:45:04.729Z"
    	}
    ]
    ```

## Create and Add a book

### Request

`POST /book/add/:isbn/:title/:author/:publisher/:pages`

    `http://localhost:{PORT}/book/add/9781575846111/The%20End/Abdulsalam%20Odetayo/Heyeso/421`

### Response

    ```
    [
        {
    		"_id": "60c165676c30210ff0dffd81",
    		"isbn": "9781575846111",
    		"title": "The End",
    		"author": "Abdulsalam Odetayo",
    		"publisher": "Heyeso",
    		"pages": 421,
    		"publish": "2021-06-10T01:05:43.270Z"
    	}
    ]
    ```

## Get a non-existent Book

### Request

`GET /book/isbn:isbn?/title:title?`

    `http://localhost:{PORT}//book/isbn/title`

### Response

    	<body> Book does not exist <body>

## Change a book

### Request

`PUT /book/update/isbn:isbn`

    `http://localhost:{PORT}/book/update/isbn9781575846111`

    ```
    Body: {
    		"title": "The Beginning",
    		"pages": 41,
    	}
    ```

### Response

    ```
    [
        {
    		"_id": "60c165676c30210ff0dffd81",
    		"isbn": "9781575846111",
    		"title": "The Beginning",
    		"author": "Abdulsalam Odetayo",
    		"publisher": "Heyeso",
    		"pages": 41,
    		"publish": "2021-06-10T01:05:43.270Z"
    	}
    ]
    ```

## Attempt to change a Book using invalid params

### Request

`PUT /book/update/isbn:isbn`

    `http://localhost:{PORT}/book/update/isbn9781575846111`

    ```
    Body: {
    		"second": "The Beginning",
    		"page": 41,
    	}
    ```

### Response

    ```
    [
        {
    		"_id": "60c165676c30210ff0dffd81",
    		"isbn": "9781575846111",
    		"title": "The End",
    		"author": "Abdulsalam Odetayo",
    		"publisher": "Heyeso",
    		"pages": 421,
    		"publish": "2021-06-10T01:05:43.270Z"
    	}
    ]
    ```

## Delete a Thing

### Request

`DELETE /book/delete/isbn:isbn`

    `http://localhost:{PORT}/book/delete/isbn9781575846111`

### Response

    ``` 
    DELETED
    ```

## Get deleted Thing

### Request

`GET /book/isbn:isbn?/title:title?`

`http://localhost:{PORT}//book/isbn9781575846111/title`

### Response

```
<body> Book does not exist <body>
```
