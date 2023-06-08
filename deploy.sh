#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка приложения
npm run build

# переход в каталог сборки
cd dist

# инициализация репозитория и загрузка кода в GitHub
git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/IShuvaloff/Webpack-template.git main:gh-pages

cd -

# ЧТО-ТО НЕ РАБОТАЕТ ЭТО КРОМЕ КАК НА VUE...
