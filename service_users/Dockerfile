FROM node:14

# Use latest version of npm
RUN npm i npm@latest -g

COPY package.json package-lock.json* ./

RUN npm install 

# copy in our source code last, as it changes the most
WORKDIR /usr/src/app

COPY . .

EXPOSE 5001

CMD [ "npm" , "run" , "server:micro" ]