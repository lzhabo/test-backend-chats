# [Описание задания](DESCRIPTION.md)

## Getting started

```sh
  git@github.com:lzhabo/test-backend-chats.git
```

Приложение будет доступно на [frontend](http://localhost:3000).Для запуска 

```sh
cd client && npm i && npm start
```

Бэк будет доступен на [backend](http://localhost:5000). Для запуска нужно создать бд с названием postgres  на порту 5433 

```sh
cd backend && npm i && npm start
```

Сделала функционала, показавшийся мне логичным:
  - пересортировка шаров, если настроки корзины меняются
  - пересортировка шаров, на каждый пук, это не оптимально, но для тестового задания пойдет
