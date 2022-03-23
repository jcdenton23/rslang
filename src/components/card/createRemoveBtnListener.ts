import { IloadHardwordCards } from '../interfaces';
import renderSpinner from '../Spinner/renderSpinner';
import { toggleDifficulty } from '../words/utils';

const removeBtnListener = (elem: HTMLElement, cardClassName: string, loadHardwordCards?: IloadHardwordCards) => {
  const removeBtn = elem.querySelector('#btn-remove') as HTMLButtonElement;
  removeBtn.addEventListener('click', async () => {
    const { id } = elem.dataset;
    removeBtn.disabled = true;
    const spinner = renderSpinner('black', 16);
    removeBtn.append(spinner);
    const finallyCallback = () => {
      removeBtn.disabled = false;
      spinner.remove();
    };
    if (loadHardwordCards) {
      await toggleDifficulty(id as string);
      loadHardwordCards(() => finallyCallback, cardClassName);
    }
  });
};

export default removeBtnListener;
