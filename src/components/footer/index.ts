const renderFooter = () => {
  const footer = document.createElement('footer');
  footer.classList.add('footer');
  footer.innerHTML = `
  <div class="container">
    <div class="footer__info">
        <a href="https://rs.school/js/" class="footer__rs" target="_blank">
            <img src="./public/assets/icons/rs_school.svg" alt="rs-school logo">
        </a>
        <div class="footer__githubs">
            <a href="https://github.com/jcdenton23" class="footer__git" target="_blank">
                <div>jcdenton23</div>
            </a>
            <a href="https://github.com/sharovskiye" class="footer__git" target="_blank">
                <div>sharovskiye</div>
            </a>
        </div>
        <div class="footer__year">© 2022</div>
    </div>
</div>
  `;
  document.body.insertAdjacentElement('beforeend', footer);
};

export default renderFooter;
