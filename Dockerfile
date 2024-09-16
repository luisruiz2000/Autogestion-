FROM node:20.10.0 as build-step
RUN mkdir -p /home/app
WORKDIR /home/app
COPY ./ /home/app
RUN npm install
RUN npm run build 
FROM nginx:latest
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY --from=build-step /home/app/dist/auto-gestion-front-refactor/browser /usr/share/nginx/html
EXPOSE 80