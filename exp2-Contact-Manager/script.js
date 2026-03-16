
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const submitBtn = document.getElementById('submit-btn');
const errorMsg = document.getElementById('error-msg');
const contactList = document.getElementById('contact-list');
const emptyMsg = document.getElementById('empty-msg');


let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
let editingIndex = null;


function saveContacts() {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

function renderContacts() {

  contactList.querySelectorAll('.contact-card').forEach(card => card.remove());

  if (contacts.length === 0) {
    emptyMsg.hidden = false;
    return;
  }

  emptyMsg.hidden = true;

  contacts.forEach((contact, index) => {
    const card = document.createElement('div');
    card.className = 'contact-card';
    card.innerHTML = `
      <div class="contact-info">
        <div class="ci-name">${escapeHTML(contact.name)}</div>
        <div class="ci-email">  ${escapeHTML(contact.email)}</div>
        <div class="ci-phone"> ${escapeHTML(contact.phone)}</div>
      </div>
      <div class="contact-actions">
        <button class="btn-edit" data-index="${index}">Edit</button>
        <button class="btn-delete" data-index="${index}">Delete</button>
      </div>
    `;
    contactList.appendChild(card);
  });
}
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function clearForm() {
  nameInput.value = '';
  emailInput.value = '';
  phoneInput.value = '';
  errorMsg.hidden = true;
  editingIndex = null;
  submitBtn.textContent = 'Add Contact';
  submitBtn.classList.remove('editing');
}


form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  // Validation
  if (!name || !email || !phone) {
    errorMsg.hidden = false;
    return;
  }

  if (editingIndex !== null) {
    // Update existing contact
    contacts[editingIndex] = { name, email, phone };
  } else {
    // Add new contact
    contacts.push({ name, email, phone });
  }

  saveContacts();
  renderContacts();
  clearForm();
});

// ---- Edit & Delete via Event Delegation ----
contactList.addEventListener('click', function (e) {
  const btn = e.target;
  if (!btn.dataset.index) return;

  const index = parseInt(btn.dataset.index, 10);

  if (btn.classList.contains('btn-delete')) {
    contacts.splice(index, 1);
    // If we were editing the deleted entry, reset form
    if (editingIndex === index) clearForm();
    if (editingIndex !== null && editingIndex > index) editingIndex--;
    saveContacts();
    renderContacts();
  }

  if (btn.classList.contains('btn-edit')) {
    const contact = contacts[index];
    nameInput.value = contact.name;
    emailInput.value = contact.email;
    phoneInput.value = contact.phone;
    editingIndex = index;
    submitBtn.textContent = 'Update Contact';
    submitBtn.classList.add('editing');
    errorMsg.hidden = true;
    nameInput.focus();
  }
});

// ---- Initial Render ----
renderContacts();
