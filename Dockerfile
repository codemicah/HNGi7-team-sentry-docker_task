FROM node:10

# Create app directory
WORKDIR /usr/src/app

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY . .

EXPOSE 8080

CMD [ "node", "app.js" ]