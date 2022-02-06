const audioListener = (cards: HTMLDivElement) => {
  const setVolumeIcon = (icon: HTMLElement) => {
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-volume-up');
  };

  const setPauseIcon = (icon: HTMLElement) => {
    icon.classList.remove('fa-volume-up');
    icon.classList.add('fa-pause');
  };

  const setToVolumeAllIcons = () => {
    const audioIcons = cards.querySelectorAll('.fas');
    audioIcons.forEach((icon) => {
      setVolumeIcon(icon as HTMLElement);
    });
  };

  const stopAllAudio = () => {
    const allAudioFiles = document.querySelectorAll('audio');
    allAudioFiles.forEach((audio) => {
      audio.pause();
      // eslint-disable-next-line no-param-reassign
      audio.currentTime = 0;
    });
  };

  const volumeContainers = cards.querySelectorAll('.textbook__card-volume');
  let isPlay = false;

  volumeContainers.forEach((container) => {
    container.addEventListener('click', (e) => {
      const currentAudioIcon = (e.currentTarget as HTMLElement).querySelector('i') as HTMLElement;
      const currentAudioFiles = (e.currentTarget as HTMLElement).querySelectorAll('audio');

      if (!isPlay) {
        setToVolumeAllIcons();
        setPauseIcon(currentAudioIcon);
        isPlay = true;
        currentAudioFiles[0].play();
        currentAudioFiles[0].onended = () => currentAudioFiles[1].play();
        currentAudioFiles[1].onended = () => currentAudioFiles[2].play();
        currentAudioFiles[2].onended = () => {
          setVolumeIcon(currentAudioIcon);
          isPlay = false;
        };
      } else {
        stopAllAudio();
        setVolumeIcon(currentAudioIcon);
        isPlay = false;
      }
    });
  });
};

export default audioListener;
