FROM node:carbon AS build
WORKDIR /app/
RUN npm install && npm install -g gulp-cli
COPY . .
RUN gulp clean && gulp

FROM node:carbon
WORKDIR /app
COPY --from=build /app .
EXPOSE 3000
CMD ["npm", "start"]
