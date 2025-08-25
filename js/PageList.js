const PageList = (argument = '') => {
   const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles">Hey, this page is a PageList template, about : ${argument}</div>
      </section>
    `;
  };
};