FROM node:16
COPY ./ /chain-browser
WORKDIR /chain-browser
RUN yarn install && yarn build

FROM nginx
RUN mkdir /chain-browser
COPY --from=0 /chain-browser/dist /chain-browser
COPY nginx.conf /etc/nginx/nginx.conf