# Deployed on https://masha-girya.github.io/codempire-cafe/#/home/dishes

### Server and data base are hosted on a free trial with low speed, so you have to wait 1 minute for the first data fetching


Everything else is simple:

### `yarn install`

The project is using yarn, so just type this command to install all packages (yarn -v 1.22.19)
If there is some issues with network timeout, than run:
### yarn install --network-timeout 1000000000

### `cd packages/backend/ && yarn start:dev`

To start the server

### `cd packages/frontend/ && yarn start`

To start the frontend
By default frontend uses hosted server as Base link. To change it to local server just go to the:
### packages/frontend/constants-app/api-constants.ts
comment BASE_URL: 'https://codempire-cafe.onrender.com'
uncomment BASE_URL: 'http://localhost:3333'

Cool! It's ready now!🚀

# Privacy Policy:
https://masha-girya.github.io/codempire-cafe/#/privacy-policy

# Technologies:
  React & Material UI
  Nest.js & TypeORM & PostgreSQL
  Passport authentication & JWT
  Web3.js & MetaMask

