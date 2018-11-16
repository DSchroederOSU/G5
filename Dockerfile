FROM node:9

WORKDIR /usr/src/app

# Copy out package and package-lock files into /user/src/app
COPY package*.json ./

# npm install will look at package.json and install deps
RUN npm install

# copy everything into current dir of image
COPY . .

# set up run time environment
ENV PORT=3000

EXPOSE ${PORT}

# command instruction lets us specify the default command to be executed
CMD [ "npm", "start" ]
