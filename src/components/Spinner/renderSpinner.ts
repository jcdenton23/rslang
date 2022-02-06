export default (color = '#000000', size = 20) => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="spinner-border" role="status" style="
width: ${size}px;
height: ${size}px;
color: ${color};
">
  <span class="visually-hidden">Loading...</span>
</div>
  `;
  return spinner;
};
