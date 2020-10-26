FROM node:alpine AS build
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm install -g @angular/cli
COPY . .
RUN ng build --output-path=dist

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]