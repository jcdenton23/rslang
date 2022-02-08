export default (color = '#000000', size = 20) => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner-border');
  spinner.setAttribute('role', 'status');
  spinner.setAttribute('style', `width:${size}px; height:${size}px;color:${color};`);
  spinner.innerHTML = `
  <span class="visually-hidden">Loading...</span>
  `;
  return spinner;
};
