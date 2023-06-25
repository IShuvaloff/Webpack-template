import Navigo from 'navigo';
import createPage from './pages/createPage';

const router = new Navigo('/');

// ! демонстрация плагина redom
router
  .on('/Webpack-template/', () => createPage('main'))
  // .on('/page/:id', (data) => {
  //   // ? страница с параметрами
  //   mainApp.innerHTML = '';
  //   const text = el('p.dynamic-text', `Параметр id=${data.data?.id}`);
  //   mount(mainApp, text);
  // })
  .on('*', () => createPage('unknown'))
  .resolve();

export { router };
