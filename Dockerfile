FROM node:16
COPY ./ /anke-chain-browser
WORKDIR /anke-chain-browser
RUN yarn install && yarn build

FROM nginx
RUN mkdir /anke-chain-browser
COPY --from=0 /anke-chain-browser/dist /anke-chain-browser
COPY nginx.conf /etc/nginx/nginx.conf