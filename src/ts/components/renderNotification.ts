import { Toast } from 'bootstrap';

export default (message: string, palette: { bg: string; text: string }) => {
  const boxNotification = document.querySelector('.notification') as HTMLDivElement;
  const layout = document.createElement('div');
  layout.classList.add('toast', 'align-items-center', palette.bg, palette.text, 'border-0');
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

  boxNotification.append(layout);
  const toast = new Toast(layout);
  toast.show();
};
