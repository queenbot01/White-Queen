FROM node:lts-buster
RUN git clone https://github.com/AYANMDOZ/MALIKA-MD/root/DAWENS-BOY96
WORKDIR /root/DAWENS-BOY96
RUN npm install && npm install -g pm2 || yarn install --network-concurrency 1
COPY . .
EXPOSE 9090
CMD ["npm", "start"]
