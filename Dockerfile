# Always good to specific so that it doesn't later break
FROM node:latest
# This folder will all commands be run in, like the HOME folder
WORKDIR /app
# Add our sourcecode
ADD . /app
# The command to start our container
CMD npm install
CMD node app.js
