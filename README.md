# Books Directory REST API

This is a basic library REST API that gets, adds, update and deletes books in and from a database.

## Install

- Copy all files into a folder on desktop.

## Run the app

- Run `node server.js` file in `%FOLDER%/src/server.js`on the command-line to start the server.
- or Navigate to `%FOLDER%` on command-line and run `npm start`

# REST API

(Preferable) Use Postman to fetch from the API.

## Get all books

### Request

`GET /book/`

    http://localhost:3000/book

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

    http://localhost:3000/book/isbn9781593275846/title
    http://localhost:3000/book/isbn/titleEloquent%20JavaScript,%20Second%20Edition
    http://localhost:3000/book/isbn9781593275846/titleEloquent%20JavaScript,%20Second%20Edition

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

    http://localhost:3000/book/add/9781575846111/The%20End/Abdulsalam%20Odetayo/Heyeso/421

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

    http://localhost:3000//book/isbn/title

### Response

    	<body> Book does not exist <body>

## Change a book

### Request

`PUT /book/update/isbn:isbn`

    http://localhost:3000/book/update/isbn9781575846111

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

    http://localhost:3000/book/update/isbn9781575846111

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

    http://localhost:3000/book/delete/isbn9781575846111

### Response

    ```
    [
    	{
    		"n": 1,
    		"opTime": {
    			"ts": "6971964890554564611",
    			"t": 4
    		},
    		"electionId": "7fffffff0000000000000004",
    		"ok": 1,
    		"$clusterTime": {
    			"clusterTime": "6971964890554564611",
    			"signature": {
    				"hash": "ra1/mDbzoYSacZxAg8j5KZL81B4=",
    				"keyId": "6965879153824366595"
    			}
    		},
    		"operationTime": "6971964890554564611",
    		"deletedCount": 1
    	}
    ]
    ```

## Get deleted Thing

### Request

### Request

`GET /book/isbn:isbn?/title:title?`

    http://localhost:3000//book/isbn9781575846111/title

### Response

    	<body> Book does not exist <body>