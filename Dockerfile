FROM node:16
COPY ./ /chain-browser
WORKDIR /chain-browser
run  echo -e "VITE_ENV=production \nVITE_BASE_URL=http://103.23.44.51:4322/uscan/v1 \nVITE_NODE_URL=https://testnet.ankr.com \nVITE_APP_TITLE=Coq" >/chain-browser/.env.production
RUN yarn install && yarn build

FROM nginx
RUN mkdir /chain-browser
COPY --from=0 /chain-browser/dist /chain-browser
COPY nginx.conf /etc/nginx/nginx.conf