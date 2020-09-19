/* Preloader */
const {
  $,
  once,
  remove,
  transition,
} = UIkit.util;

window.onload = () => {
  console.log('Window onload');
  const loader = $('#page-preloader');

  transition(loader, { opacity: 0 });
  once(loader, 'transitionend', () => remove(loader));
};
