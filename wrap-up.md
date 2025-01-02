## Questions

### What issues, if any, did you find with the existing code?

I couldn't get `docker run build` to work, but `docker-compose build` was successful. 

A number of the dependencies were outdated. I updated those relating to UI testing (@testing-library packages and their types) so that I could use the latest version of the user-event library. I didn't update the Material UI library because I didn't need to make many changes related to it. 

In addition, the Dockerfiles didn't enable hot-reloading and I spent some time figuring out how to do that for development. I never found a great solution so I didn't commit the changes I made. 

### What issues, if any, did you find with the request to add functionality?

The request to limit the total amount of money withdrawn from an account per day was confusing. The application is not currently tracking individual transactions, only the total balance of the account. Tracking transactions would require at least a new database table, as well as a new endpoint to retrieve the current day's withdrawals. A more short-lived log of daily transactions (maybe that lives on the user's device?) is another possibility but not a very robust one. 

### Would you modify the structure of this project if you were to start it over? If so, how?

I would modify the structure to keep the account information in props, rather than state so that there is a single source of truth for the account balance. I would likely use [SWR](https://swr.vercel.app/) for the initial account fetching and then for updating the account data at the top level of the application on receipt of responses from transaction requests. Then the account data would be passed down the component tree. Alternatively, the data could live in Context, but because the application has a shallow tree I don't think that would be particularly helpful. 

### Were there any pieces of this project that you were not able to complete that you'd like to mention?

Yes! I didn't complete the requirement about limiting the total money withdrawn per day. I wasn't sure if I was supposed to do it, since it was so different from the other requirements. 

### If you were to continue building this out, what would you like to add next?

Short-term account persistence, using a cookie or local storage, so that the user doesn't need to sign in again after a page reload. 

### If you have any other comments or info you'd like the reviewers to know, please add them below.