This template is based on [Create React App](https://github.com/facebook/create-react-app).

## Includes
- React-router
- Mobx
- Emotion css-in-js library
- Dockerfile
- .env support via building js file with data. You can use container env variables
- Kubernetes config template

## Гайдлайн
- Используем только функциональные компоненты
- Для глобального стейта используем сторы. Для простого локального стейта - хуки. Для сложного - viewModel
- Стили пишем в самих компонентах с помощью emotion в Root элементе
- Один файл - один компонент. Используем default export
- Если компонент большой и ему нужна папка, то внутри созаем файл с тем же названием что и
папка плюс index.ts который экспортирует его. Например: Папка Header внутри файл Header.tsx и index.ts. в index.ts. Делается чтобы файл находлся поиском 
```typescript
import Header from './Header'
export default Header;
```
- Папки
    - assets: для статичных ассетов(шрифты/иконки)
    - components: для переиспользуемых компонентов(кнопки/табы/футер)
    - screens: для экранов(main/login/profile)
    - stores: mobX сторы. Здесь стейт приложения
    - services: внешние сервисы. Здесь вызовы API. Сервисами пользуются сторы, а не компоненты  
- Не используем тип `any` при ошибках компилятора. Разобраться почему компилятор ругается - починить
- Не оставляем варнинги и ошибки в консоли. Разобраться откуда ошибка или варнинг - пофиксить.
 Если пофиксить невозможно - оставить коммент в коде с ссылкой на issue 
