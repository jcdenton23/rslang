const audioAnswerListener = (elem: HTMLElement) => {
  const volumeWrapper = elem.querySelector('.results__volume') as HTMLDivElement;

  const toggleIcon = (icon: HTMLElement) => {
    icon.classList.toggle('fa-volume-up');
    icon.classList.toggle('fa-pause');
  };

  let isPlay = false;

  volumeWrapper.addEventListener('click', (e) => {
    const audioIcon = (e.currentTarget as HTMLElement).querySelector('i') as HTMLElement;
    const audioFile = (e.currentTarget as HTMLElement).querySelector('audio') as HTMLAudioElement;
    toggleIcon(audioIcon);
    if (!isPlay) {
      isPlay = true;
      audioFile.play();
      audioFile.onended = () => {
        toggleIcon(audioIcon);
        isPlay = false;
      };
    } else {
      audioFile.pause();
      audioFile.currentTime = 0;
      isPlay = false;
    }
  });
};

export default audioAnswerListener;
