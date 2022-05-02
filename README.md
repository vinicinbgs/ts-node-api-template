# ✨ API Boilerplate

## ![favicon-16x16](https://github.com/heroku/favicon/raw/master/favicon.iconset/icon_16x16.png) Heroku

- **Endpoint:** https://endpoint/api/v1/ <br />
- **Dashboard API:** https://dashboard.heroku.com/apps/ <br />
- **Postgres:** https://data.heroku.com/ <br />
- **Swagger:** https://endpoint/api/v1/docs

---

## 🐳 Using Docker

To better understand about the ports that the services are running, check in: [docker-compose](https://github.com/vinicinbgs/ts-node-api-boilerplate/blob/main/docker-compose.yml)

```bash
docker-compose up -d --build
docker-compose exec api npm run config:env
docker-compose exec api npm run typeorm:migration:run
```

To access db-admin, enter in browser: http://localhost:8080 <br/>
**user:** postgres <br/>
**password:** postgres <br/>
**database:** api

---

## :package: Run in Development mode

Some [Documentations](https://github.com/vinicinbgs/ts-node-api-boilerplate/tree/main/docs) about internal **scripts/heroku**

```bash
npm run config:env
npm run typeorm:migration:run
npm run dev
```

---

## 🧪 Run unit tests

```bash
npm run test <---- Only run the test
npm run test:coverage  <----- Run test generating coverage text and html
npm run test:coverage:text <---- Run test generating only coverage text
```
