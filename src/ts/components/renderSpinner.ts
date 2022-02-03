export default (color: string, size: number) => `<div class="spinner-border" role="status" style="
width: ${size}px;
height: ${size}px;
color: ${color};
">
  <span class="visually-hidden">Loading...</span>
</div>`;
