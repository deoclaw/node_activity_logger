# node_activity_logger

logs user actions and batch processes them

## Capabilities

:white_check_mark: Front end buttons each post message to backend

:white_check_mark: Backend logs posts in text file

:white_check_mark: Backend clears log every 2 minutes

:white_check_mark: Logs are posted on the front end

:x: Backend does not post log to front end

- the server cannot necessarily push it out with the technology we've learned so far
- to get around this, I put a SetInterval on the backend to clear the logs and on the front end to make a GET request for the log at the same interval as the backend clearing. This is not ideal but it worked well enough for now.
