let contacts = [
  { name: '蔡杰叡', phone: '0909996882' },
  { name: '荀文若', phone: '0922215589' }
];

function searchContact() 
{
  const searchName = document.getElementById('searchName').value;
  const foundContact = contacts.find(contact => contact.name === searchName);

  const contactDetails = document.getElementById('contactDetails');
  if (foundContact) {
    contactDetails.textContent = `姓名：${foundContact.name}，電話：${foundContact.phone}`;
  } else {
    contactDetails.textContent = '查不到此聯絡人';
  }
}