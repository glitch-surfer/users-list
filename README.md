# UsersList

## Requirements

Тестовое задание

Создать страницу со списком пользователей. Дизайн не важен, нужно сделать так, чтобы было человекопонятно.
Требования:
- Заголовок страницы.
- Список пользователей в двух видах: карточки и строчки.
- Сделать мок сервиса получения данных в соответствии с приложенным файлом (считаем, что это http-ответы от сервера). Имитировать задержку ответа от сервера (например, с помощью delay). Запросы на мок сервер должны быть не чаще 1 раза в 500 мс.
- Показать индикатор загрузки (можно просто слово Загрузка...).
- Должна быть строка поиска, которая ищет по имени пользователя user_name.
- Должна быть пагинация и возможность выбора количества элементов на странице (5, 10 или 20).
- У каждого элемента должна быть кнопка Удалить
Разделить код на уместные с Вашей точки зрения файлы. Не использовать сторонние библиотеки. 

## Development server

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.4.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
