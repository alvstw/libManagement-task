# lib Management
This repository is intended as a submission for a task only.

## Instructions
- Install required packages `npm install`
- Start the server `node ./bin/www`

## API Endpoints

### GET /books/search
#### Supported parameters

- title
- author
- published_date
- is_available
- genre
- rating
### GET /book/:id
### POST /book/:id/borrow
> URL query parameter `userId` is required

### POST /book/:id/return
> URL query parameter `userId` is required
> 
### GET /borrows/:userId
