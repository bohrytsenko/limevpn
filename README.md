# gulp
Моя сборка для gulp

## Команды

```
gulp build 
gulp build:watch
gulp build:bitrix
gulp build:bitrix:watch
gulp server - запускает build + локально разварчивает сервер с livereload
```
## Bower
Установщик bower нужно запускать из корня, устанавливаться пакеты будут в `src/bower_components`, а компелироваться в `buildpath + "/vendor"`

## Структура проекта
```
src/fonts - шрифты
src/img/work - все картинки кроме иконок для спрайтов, будет скомпелировано в `buildpath + "/img"`
src/img/icons - все картинки иконок для спрайтов, будет скомпелировано в `src/work/icons.png` + `src/less/partials/icons.less`
src/less - стили, скомпелируется в `buildpath + "/css"`
src/js - скрипты, скомпелируется в `buildpath + "/js"`
pages - html файлы, скомпелируются файлы из корня `src` в корень `buildpath`
```

## Перенос проекта на bitrix

- В папке local создать папку gulp и скопировать туда весь каталог с проектом
- Поменять переменную buildpath на путь к шаблону, например `../templates/templatename`
- После этого запустить одну из команд `build:bitrix` или `build:bitrix:watch`