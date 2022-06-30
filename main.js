async function getResponse() {
  let response = await fetch('./current-loans.json');
  let content = await response.json();
  content = content['loans']

  let list = document.querySelector('.content_items')


  let key;

  let totalAmount = 0;

  for (key in content) {
    content[key].available = content[key].available.replace(",", "");
    totalAmount += parseFloat(content[key].available);
    list.innerHTML += `
      <div class="borrower">
        <div class="borrower_name">${content[key].id}</div>
        <div class="borrower_details">${content[key].title}</div>
        <div class="to_invest">
        <a href="#" id=${content[key].id} class="invest_btn open_popup">invest</a>
      </div>
  `
    content[key]
  }
  list.innerHTML = list.innerHTML + `
  <div class="avaliable">
  <div class="loans_av">Total amount avaliable for investment </div>
  <div class="loans_av_sum">${totalAmount}</div>
  </div>`;

  let popupBg = document.querySelector('.popup_bg');
  let popup = document.querySelector('.popup');
  let openPopupButtons = document.querySelectorAll('.open_popup');

  for (let i = 0; i < openPopupButtons.length; i++) {
    openPopupButtons[i].addEventListener('click', function () {
      popupBg.classList.add('active');
      popup.classList.add('active');
    });
  }

  let closePopupButton = document.querySelector('.close_popup');
  closePopupButton.addEventListener('click', () => {
    popupBg.classList.remove('active');
    popup.classList.remove('active');
  });



  //GET VALUE FROM FORM
  const formElem = document.querySelector('form');
  console.log(formElem);
  if (formElem !== null) {
    formElem.addEventListener('submit', (e) => {
      loan = getLoanById(1)
      e.preventDefault();
      const formData = new FormData(formElem);
      console.log(parseFloat(loan.available))
      console.log(parseFloat(formData.get('loan_sum')))
      let amount = content[key].available.replace(",", "");

      loan.available = amount - parseFloat(formData.get('loan_sum'))
      console.log(loan.available);
      console.log(loan);
      popupBg.classList.remove('active');
      popup.classList.remove('active');
    });
  }


  function getLoanById(id) {
    for (key in content) {
      if (content[key].id === id)
        console.log(content)
      return content[key]
    }
  }


}

getResponse();
