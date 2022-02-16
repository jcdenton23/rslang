import { Button } from 'bootstrap';

const audioListener = (card: HTMLDivElement) => {
  const toggleIcon = (icon: HTMLElement) => {
    icon.classList.toggle('fa-volume-up');
    icon.classList.toggle('fa-pause');
  };

  const stopAllAudio = () => {
    const allAudioFiles = card.querySelectorAll('audio');
    allAudioFiles.forEach((audio) => {
      audio.pause();
      // eslint-disable-next-line no-param-reassign
      audio.currentTime = 0;
    });
  };

  const volumeContainer = card.querySelector('.textbook__card-volume') as HTMLDivElement;
  let isPlay = false;

  volumeContainer.addEventListener('click', (e) => {
    const audioIcon = (e.currentTarget as HTMLElement).querySelector('i') as HTMLElement;
    const audioFiles = (e.currentTarget as HTMLElement).querySelectorAll('audio');

    toggleIcon(audioIcon);
    if (!isPlay) {
      isPlay = true;
      audioFiles[0].play();
      audioFiles[0].onended = () => audioFiles[1].play();
      audioFiles[1].onended = () => audioFiles[2].play();
      audioFiles[2].onended = () => {
        toggleIcon(audioIcon);
        isPlay = false;
      };
    } else {
      stopAllAudio();
      isPlay = false;
    }
  });

  const btnLearnedOnPage = card.querySelector('#btn-learned') as HTMLButtonElement;
  const btnlearned = new Button(btnLearnedOnPage);
  btnLearnedOnPage.addEventListener('click', () => btnlearned.toggle());

  const btnHardOnPage = card.querySelector('#btn-hard') as HTMLButtonElement;
  const btnHard = new Button(btnHardOnPage);
  btnHardOnPage.addEventListener('click', () => btnHard.toggle());
};

export default audioListener;
