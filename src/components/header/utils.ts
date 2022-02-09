const updateHeader = (title: string) => {
  const headerTitle = document.querySelector('.header__title') as HTMLDivElement;
  headerTitle.textContent = title;
};

export default updateHeader;
