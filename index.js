// task complete delete task

let rowCounter = 1; // Initialize row counter

function addNewTask(event) {
    event.preventDefault();

    const taskName = document.getElementById('newTask').value;
    const date = document.getElementById('date').value;
    const priority = document.getElementById('priority').value;
    const table = document.getElementById('tableBody');

    const newRow = document.createElement('tr');
    newRow.id = `row${rowCounter}`; // Assign unique ID to the new row

    newRow.innerHTML = `
    <th scope="row">
      <input type="checkbox" class="form-check-input mx-auto" name="" style="cursor: pointer;" onclick="handleCheckboxClick(this)">
    </th>
    <td class="fixed-content" style="width: 250px; table-layout: fixed;" >${taskName}</td>
    <td>${getPriority(priority)}</td>
    <td>${date}</td>
    <th>
        <a href="#!" data-mdb-toggle="tooltip" onclick="editClick(this)">
            <i class="fa-regular fa-pen-to-square" style="color: #005eff;"></i>
        </a>
    </th>
`;

    table.appendChild(newRow);

    document.getElementById('newTask').value = '';
    document.getElementById('date').value = '';
    document.getElementById('priority').value = '1';

    rowCounter++; // Increment row counter for the next row
}


function getPriority(priority) {
    switch (priority) {
        case '1': return 'Normal';
        case '2': return 'Medium';
        case '3': return 'High';
        default: return 'Normal';
    }
}



function handleCheckboxClick(checkbox) {
    const row = checkbox.closest('tr');
    const taskCell = row.querySelector('.fixed-content');

    if (checkbox.checked) {
        taskCell.innerHTML = `<del>${taskCell.textContent}</del>`;
    } else {
        taskCell.innerHTML = taskCell.textContent;
    }
}

var rowNum;

function editClick(clickedElement) {
    $('#modalOpen').modal('show');
    // Get the parent row of the clicked element
    var parentRow = clickedElement.closest('tr');

    var rowId=parentRow.id;
    rowNum=rowId.replace('row', '');
    

    // Get the data from the row using getElementsByTagName
    var taskName = parentRow.getElementsByTagName('td')[0].innerText || '';
    var priority = parentRow.getElementsByTagName('td')[1].innerText || '';
    var date = parentRow.getElementsByTagName('td')[2].innerText || '';

    var editTaskForm = document.getElementById('editModal');
    
    var priorityOpt = {
        'Normal': '1',
        'Medium': '2',
        'High': '3'
    };
    var addPriority = priorityOpt[priority] || '';
    // Populate modal fields with data from the table row
    document.getElementById('editTask').value = taskName;
    document.getElementById('editDate').value = date;
    document.getElementById('editPriority').value = addPriority;

    // Trigger the Bootstrap modal to show


    
    
}



function saveChange(clickedElement) {
    // Get the values from the modal
    var editedTask = document.getElementById('editTask').value;
    var editedDate = document.getElementById('editDate').value;
    var editedPriority = document.getElementById('editPriority').value;

    // Update the table cell with the new values
    var tableRow = document.getElementById('row'+ rowNum); // Replace 'yourTableRowId' with the actual ID of your table row
    tableRow.getElementsByTagName('td')[0].innerText = editedTask;
    tableRow.getElementsByTagName('td')[1].innerText = getPriority(editedPriority);
    tableRow.getElementsByTagName('td')[2].innerText = editedDate;

    $('#modalOpen').modal('hide');
}
