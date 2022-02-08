const audioListener = (card: HTMLDivElement) => {
  const setVolumeIcon = (icon: HTMLElement) => {
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-volume-up');
  };

  const setPauseIcon = (icon: HTMLElement) => {
    icon.classList.remove('fa-volume-up');
    icon.classList.add('fa-pause');
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
    const audiIcon = (e.currentTarget as HTMLElement).querySelector('i') as HTMLElement;
    const audioFiles = (e.currentTarget as HTMLElement).querySelectorAll('audio');

    if (!isPlay) {
      setPauseIcon(audiIcon);
      isPlay = true;
      audioFiles[0].play();
      audioFiles[0].onended = () => audioFiles[1].play();
      audioFiles[1].onended = () => audioFiles[2].play();
      audioFiles[2].onended = () => {
        setVolumeIcon(audiIcon);
        isPlay = false;
      };
    } else {
      stopAllAudio();
      setVolumeIcon(audiIcon);
      isPlay = false;
    }
  });
};

export default audioListener;
