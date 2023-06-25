# Шаблон проекта Webpack

## Подготовка к работе

1. Установка требуемых пакетов: `npm i`;
2. Сборка версии разработки, запуск сервера и открытие сайта в браузере: `npm run serve`;
3. Сборка версии разработки: `npm run dev`;
4. Сборка итоговой версии: `npm run build`;
5. Подготовительные действия перед деплоем: `npm run predeploy` (вызывается автоматически во время деплоя, см. п.6);
6. Деплой проекта на gh-pages: `npm run deploy`.

## Настройка исходных данных проекта

С целью выкладывания на ***gh-pages*** следует изменить и синхронизировать параметры исходной страницы при запуске приложения в нескольких местах:

1. установить *плагин gh-pages*:

    ```text
    npm i -D gh-pages
    ```

2. файл *package.json*: добавить настройку адреса выкладывания build-версии приложения с именем репозитория Github:

    ```json
    "repository": {
      "url": "git+<https://github.com/IShuvaloff/Webpack-template.git>"
    }
    ```

3. файл *package.json*: добавить скрипт подготовки деплоя:

    ```json
    "scripts": {
      "predeploy": "npm run build", // действия перед деплоем
      "deploy": "gh-pages -d dist" // использование папки dist для выкладки на gh-pages
    },
    ```

4. файл *webpack.config.js*: изменить `output.publicPath` на имя репозитория Github:

    ```js
    const output = {
      publicPath: '/Webpack-template/', // исходная папка для запуска index.html
    };
    ```

5. файл *src/js/routing.js*: изменить исходную директорию запуска главной страницы на имя репозитория Github:

    ```js
    router.on('/Webpack-template/', () => createPage('main'))
    ```

6. файл *src/js/contants.js*: изменить константу REPONAME на имя репозитория Github:

    ```js
    export const REPONAME = 'Webpack-template';
    ```

7. при использовании навигатора `router.navigate()` ОБЯЗАТЕЛЬНО использовать функцию `getPagePath` из `src/js/utils` с целью подстановки имени репозитория Github к каждому маршруту:

    ```js
    router.navigate(getPagePath('pageName'));
    ```

8. после этих изменений открытие приложения в режиме разработки (`npm run serve`) будет открывать сайт сразу на нужной исходной позиции (без необходимости изменять адрес в браузере вручную), при финальной сборке все исходные адреса скриптов и вложений будут предваряться нужной директорией, а *при деплое в созданную ветку gh-pages будет выкладываться build-версия приложения*;
9. для создания веб-страницы проекта на gh-pages требуется зайти в настройки репозитория на github, выбрать пункт [Pages](https://github.com/IShuvaloff/Webpack-template/settings/pages), в разделе Builds and deployment выбрать в качестве источника "Deploy from a branch" и в поле с веткой указать gh-pages.

## Структура и содержимое шаблона

1. **Конвертер Babel** - конвертация js-кода ECMAScript 2015+ в совместимый со старыми браузерами формат. [Конфигурационные файлы](https://babeljs.io/docs/config-files) Babel:
    1. `.babelrc.js` в корне проекта, служит для конвертации кода непосредственно проекта, без учета файлов в установленных модулях node_modules, используются:
        * пресет @babel/preset-env - для компиляции синтаксиса ECMAScript 2015+, настройки плагина включают опцию `modules: false` - [официальная настройка](https://babeljs.io/docs/babel-preset-env#modules) для указанного пресета;
    2. `babel.config.js` в корне проекта, служит для конвертации кода в установленных пакетах node_modules, используются:
        * пресет @babel/preset-env, включает опцию `targets: { node: 'current' }` - [компиляция текущей версии node](https://babeljs.io/docs/options#targetsnode);

2. **Форматировщик кода ESLint** - анализ написанного кода с целью исправления в нем синтаксических ошибок (т.е. без запуска компилятора), [файл настроек](https://eslint.org/docs/latest/use/configure/) - `.eslintrc.js`. Настройки конфигурации:
    1. подключаемый [плагин](https://eslint.org/docs/latest/use/configure/plugins) `prettier`;
    2. глобальные конфигурации в блоке `extends`: `eslint:recommended` и `plugin:prettier/recommended`;
    3. [парсер](https://eslint.org/docs/latest/use/configure/parser) (анализатор кода) `@babel/eslint-parser` - [оболочка парсера Babel](https://www.npmjs.com/package/@babel/eslint-parser), делающая его совместимым с ESLint, с настройкой `sourceType: 'module'`, т.к. в проекте активно импортируются модули;
    4. различные [правила](https://eslint.org/docs/latest/use/configure/rules) в блоке `rules`;

3. **Форматировщик кода Prettier** - анализ и подведение написанного кода под единый стиль ([делает код красивым](https://tproger.ru/translations/setting-up-eslint-and-prettier/#:~:text=ESLint%20%E2%80%94%20%D1%8D%D1%82%D0%BE%20%D1%83%D1%82%D0%B8%D0%BB%D0%B8%D1%82%D0%B0%2C%20%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D0%B0%D1%8F,%D1%8F%D0%B2%D0%BB%D1%8F%D0%B5%D1%82%D1%81%D1%8F%20%D0%BD%D0%B5%D0%BE%D1%82%D1%8A%D0%B5%D0%BC%D0%BB%D0%B5%D0%BC%D0%BE%D0%B9%20%D1%87%D0%B0%D1%81%D1%82%D1%8C%D1%8E%20%D1%8F%D0%B7%D1%8B%D0%BA%D0%B0%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), дополняет ESLint, конфигурационный файл `.prettierrc.js` в корне проекта. [Подключаемые настройки](https://prettier.io/docs/en/options.html):
    1. замена двойных кавычек одинарными `"singleQuote": true`;
    2. обязательная точка с запятой в конце строки `"semi: true"`;
    3. и т.д;

4. **Форматировщик кода файл .editorconfig** - анализ и подведение написанного кода под единый стиль, однако, [в отличие от Prettier](https://habr.com/ru/companies/ruvds/articles/428173/), предназначен для использования в разных редакторах кода (необязательно в VSCode), поскольку выполнен в виде файла, поддерживаемого многими редакторами, тогда как Prettier доступен только как устанавливаемый плагин и доступен не везде. Настройки аналогичные Prettier;

5. **Сборщик проекта Webpack** - конфигурационный файл `webpack.config.js`, содержит:
    1. плагины:
        * [HTMLWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/) - для извлечения html-файла из папки src;
        * [MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/) - для подключения и минимизации CSS-файлов;
        * [FaviconsWebpackPlugin](https://www.npmjs.com/package/favicons-webpack-plugin) - для динамического формирования favicon из выбранного графического файла в папке assets;
    2. обработка модулей:
        * растровых изображений jpeg/jpg/png/gif из папки assets (с конфигурацией asset/resource);
        * векторных изображений svg из папки assets (с конфигурацией asset/resource);
        * файлов стилей sass из папки assets (с преобразованием в CSS, постобработкой для разных браузеров, конвертацией в CommonJS и итоговой минификацией с помощью плагина MiniCssExtractPlugin);
        * файлов шрифтов woff/woff2 из папки assets (с конфигурацией asset/resource);
        * js-файлов с помощью конвертера Babel (за исключением файлов в папке node_modules);
    3. оптимизация изображений:
        * [ImageMinimizerPlugin](https://webpack.js.org/plugins/image-minimizer-webpack-plugin/) - с плагинами для минификации svg, png, jpeg и gif;
    4. запуск сервера devServer на порту 9000;

6. **Нормализация стилей Normalize.css** - использование [плагина](https://www.npmjs.com/package/normalize.css) (вместо загруженного файла) с последующим импортом CSS-файла `@import 'normalize.css'` в файле main.sass. Следует заметить, что *операция `@import` внутри файлов sass позволяет импортировать как файлы стилей sass/scss, так и файлы стилей на чистом css*. Дополнительно:
    * использование следом дополнительного файла сброса стилей `src/sass/init/_reset.sass`;

7. **Структура исходных файлов** - директория `src`:
    1. ресурсы `src/assets`:
        * шрифты `src/assets/fonts` в формате woff/woff2;
        * векторные изображения `src/assets/icons` в формате svg, включая иконку **`favicon.svg`**;
        * растровые изображения `src/assets/img`;
    2. js-файлы в папке `src/js`, подключаемые к главному файлу **`src/index.js`**;
    3. sass-стили в папке `src/sass`, подключаемые к главному файлу **`src/main.sass`**;
    4. страницы html в папке `src/js/pages`, вызываемые из главной страницы **`src/index.html`**;

8. **Маршрутизатор** - организация переходов между различными страницами:
    1. плагин [Navigo](https://www.npmjs.com/package/navigo);
    2. файл `src/js/routing.js` - маршруты;

9. **Загрузчик SVG-спрайта** - сбор используемых в проекте векторных изображений в единый файл и одноразовая загрузка при формировании html-страницы:
    1. плагин [svg-sprite-loader](https://www.npmjs.com/package/svg-sprite-loader);
    2. принцип работы - загрузка svg-изображения и моментальное клепание из него "лоскутного одеяла" векторых изображений;
    3. формирование спрайта и загрузка его в папку icons;
    4. *TODO*: я не нашел способа подгружать используемые svg-картинки в качестве фонового изображения в стилях, т.к. одновременное использование плагина и встроенного загрузчика `asset/resource` делает недоступным переборошенную в `assets/` векторную картинку. Потому следует, возможно, использовать другой [плагин](https://www.npmjs.com/package/webpack-svg-spritely) с конфигурированием прямо в опциях плагина `plugins` в файле `webpack.config.js`, а в правилах `rules` продолжать обрабатывать каждый svg-файл через встроенный asset-загрузчик.

10. **Система уведомлений** -  отображение окон уведомлений в правом нижнем углу экрана:
    1. файл `src/js/notifications.js` - отображение уведомления;
    2. файл `src/sass/_notifications.sass` - стили уведомлений;
    3. файлы `src/assets/icons/message-XXX.svg` - иконки уведомлений разных типов;
    4. запуск уведомления:
        * импорт файла уведомлений `import { showNotification } from './js/notifications'`;
        * вызов окна уведомления - `showNotification('Текст сообщения', 'success/error/warning/info')`;
    5. *TODO*: добавить анимацию появления и сокрытия уведомлений;

11. *TODO*: Система авторизации.
