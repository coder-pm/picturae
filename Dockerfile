FROM node:12.10-alpine

# Create app directory
WORKDIR /var/app

# Install app dependencies
COPY package.json yarn.lock  ./

# Install app dependencies
RUN yarn install --pure-lockfile && yarn cache clean

# Bundle app source
COPY . .

# Start TypeScript compiler
RUN yarn build

# Define main endpoint
ENTRYPOINT ["yarn"]

# Start production
CMD ["start:prod"]
