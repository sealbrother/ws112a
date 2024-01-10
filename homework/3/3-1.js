let contacts =
[
  { name: '蔡杰叡', phone: '0909996882' },
  { name: '荀文若', phone: '0922215589' }
];
function showContacts()
 {
  const contactList = document.getElementById('contactList');
  contactList.innerHTML = '';
  contacts.forEach(contact => {
    const listItem = document.createElement('li');
    listItem.textContent = contact.name;
    listItem.onclick = () => showContactDetails(contact);
    contactList.appendChild(listItem);
  });
}

function showContactDetails(contact) 
{
  const contactDetails = document.getElementById('contactDetails');
  contactDetails.innerHTML = `
    <h2>${contact.name}</h2>
    <p>電話：${contact.phone}</p>
  `;
}

function addContact() 
{
  const nameInput = document.getElementById('nameInput').value;
  const phoneInput = document.getElementById('phoneInput').value;


  const newContact = { name: nameInput, phone: phoneInput };
  contacts.push(newContact);

  showContacts();
}

showContacts();