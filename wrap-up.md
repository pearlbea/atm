## Questions

### What issues, if any, did you find with the existing code?

I couldn't get `docker run build` to work, but `docker-compose build` was successful. 

A number of the dependencies were outdated. I updated those relating to UI testing (@testing-library packages and their types) so that I could use the latest version of the user-event library. I didn't update the Material UI library because I didn't need to make many changes related to it. 

In addition, the Dockerfiles didn't enable hot-reloading and I spent some time figuring out how to do that for development. I never found a great solution so I didn't commit the changes I made. 

### What issues, if any, did you find with the request to add functionality?

I had some trouble with the requirement to limit the total amount of money withdrawn from an account per day. My plan was to add a new "transactions" table, linked by account_id to the account table, that would track the type, amount, and date of every transaction. That way, I could run a query before each withdrawl to check if the user had exceeded the daily limit. 

Unfortunatly, in the time that I had available, I wasn't able to debug a problem that I ran into: I received a response from my Express request that "relation \"transactions\" does not exist". I think this means that I didn't successfully create the new table, but I am unfamiliar with inspecting a Postgres db within a Docker container. 

### Would you modify the structure of this project if you were to start it over? If so, how?

On the frontend, I would modify the structure to keep the account information in props, rather than state so that there is a single source of truth for the account balance. I would probably use [SWR](https://swr.vercel.app/) for the initial account fetching and then for updating the account data at the top level of the application on receipt of responses from transaction requests. 

On the backend, my proposed solution to create a "transactions" table would mean that the transaction records would live in a different database than the total account balance. To prevent the total from getting out of sync with the record in the account table, I would probably want to store a running total of the account balance along with the transaction data.

### Were there any pieces of this project that you were not able to complete that you'd like to mention?

Yes, see the paragraph above about what issues I found with the request to add functionality. 

### If you were to continue building this out, what would you like to add next?

Short-term account persistence, using a cookie or local storage, so that the user doesn't need to sign in again after a page reload. 

### If you have any other comments or info you'd like the reviewers to know, please add them below.