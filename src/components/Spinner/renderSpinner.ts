export default (color = '#000000', size = 20) => `<div class="spinner-border" role="status" style="
width: ${size}px;
height: ${size}px;
color: ${color};
">
  <span class="visually-hidden">Loading...</span>
</div>`;
