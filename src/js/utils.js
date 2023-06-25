import { PAGES, DOCTITLE, REPONAME } from './constants';

// поиск данных страницы по имени
export function getPageByName(name) {
  return PAGES.find((page) => page.name === name);
}

// обновить заголовок сайта
export function updateDocumentTitle(pageName) {
  const pageTitle = getPageByName(pageName)?.title;
  document.title = `${DOCTITLE} - ${pageTitle ?? 'Страница не найдена'}`;
}

// ! добавление к имени страницы исходного репозитория проекта! ОБЯЗАТЕЛЬНО ИСПОЛЬЗОВАТЬ в router.navigate!!!
export function getPagePath(page) {
  return `/${REPONAME}/${page.trim()}`;
}
