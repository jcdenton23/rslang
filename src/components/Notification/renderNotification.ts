import { Toast } from 'bootstrap';
import PaletteBootstrap from '../constants';

const notificationContainer = document.createElement('div');
notificationContainer.classList.add('toast-container', 'position-absolute', 'top-0', 'end-0', 'p-3');
document.body.append(notificationContainer);

export default (message = 'Error', palette = PaletteBootstrap.error) => {
  const layout = document.createElement('div');
  layout.classList.add('toast', palette.bg, palette.text, 'border-0');
  layout.setAttribute('role', 'alert');
  layout.setAttribute('aria-live', 'assertive');
  layout.setAttribute('aria-atomic', 'true');

  layout.innerHTML = `
    <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" 
         data-bs-dismiss="toast" aria-label="Close"></button>
    </div>`;

  layout.addEventListener('hidden.bs.toast', () => {
    layout.remove();
  });

  notificationContainer.append(layout);
  const toast = new Toast(layout);
  toast.show();
};
