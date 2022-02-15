const audioQuestionListener = (elem: HTMLElement) => {
  const audioWrapper = elem.querySelector('.audio-challenge__item-volume') as HTMLDivElement;
  const audioFile = audioWrapper.querySelector('audio') as HTMLAudioElement;
  audioFile.play();

  let isPlay = false;

  audioWrapper.addEventListener('click', () => {
    if (!isPlay) {
      isPlay = true;
      audioFile.play();
      audioFile.onended = () => {
        isPlay = false;
      };
    } else {
      audioFile.pause();
      audioFile.currentTime = 0;
      isPlay = false;
    }
  });
};

export default audioQuestionListener;
