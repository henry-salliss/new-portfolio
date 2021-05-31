// Selecting the elements
const inputField = document.querySelector('.input');
const list = document.querySelector('.list');
const completedList = document.querySelector('.completed-list');
const submitBtn = document.getElementById('submitBtn');
const clearBtn = document.getElementById('clearBtn');
const xBtn = document.getElementById('xBtn');
const doneBtn = document.getElementById('doneBtn');
const listItem = document.querySelector('.list-item');

// Submit button
const submit = function () {
  if (inputField.value != '') {
    // Make new HTML
    const html = `<li class='list-item'>
    <p>${inputField.value}</p>
  <div class='listBtns'>
  <button class="btn delete" id="xBtn">X</button>
  <button class="btn done" id="doneBtn">Done</button>
  </div>
  </li>`;
    list.insertAdjacentHTML('beforeend', html);

    inputField.value = '';
  } else {
    alert('Please enter a task');
  }
};

submitBtn.addEventListener('click', submit);

// Enter key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') submit();
});

// Clear list button
clearBtn.addEventListener('click', function () {
  $(list).empty();
  $(completedList).empty();
});

// X button

list.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete')) {
    console.log(e.target.parentElement);
    e.target.parentElement.parentElement.remove();
  }
});

completedList.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.parentElement.remove();
  }
});

// Done button

list.addEventListener('click', function (e) {
  if (e.target.classList.contains('done')) {
    e.target.parentElement.parentElement.classList.add('complete');

    // moving task into completed list
    e.target.parentElement.parentElement.remove();
    completedList.append(e.target.parentElement.parentElement);
    console.log(e.target);
    e.target.remove();
  }
});
