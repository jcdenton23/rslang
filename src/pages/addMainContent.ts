const addMainContent = (element: HTMLDivElement) => {
  const main = document.getElementById('main') as HTMLDivElement;
  main.innerHTML = '';
  main.appendChild(element);
};

export default addMainContent;
