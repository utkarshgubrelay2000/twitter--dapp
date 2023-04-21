FROM node
WORKDIR /usr
COPY .env ./
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
RUN ls -a
RUN npm install
RUN npm run build
## this is stage two , where the app actually runs
FROM node
WORKDIR /usr
COPY package.json ./
COPY .env ./
RUN npm install --only=production
COPY --from=0 /usr/dist .
EXPOSE 4000
CMD ["node","index.js"]