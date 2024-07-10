document.addEventListener('DOMContentLoaded', () => {
    // all imported elements from html
    const dutyTableBody = document.querySelector('#dutyTable tbody')
    const dutyForm = document.getElementById('dutyForm')
    
    function loadDuties(){
        fetch('http://localhost:3000/duty')
        .then(response => response.json())
        .then(data => {
            data.forEach(duty => {
                console.log(duty)
               const row = document.createElement("tr");
               row.innerHTML = `
               <td>${duty.name}</td>
               <td>${duty.cleaning_time}</td>
               <td>${duty.duty}</td>
               <td>
               <button data-id = "${duty.id}" class = 'edit'>Edit</button>
               <button data-id = "${duty.id}" class = 'delete'>Delete</button>
               </td>
               `

               //Add the tr to the tbody
               dutyTableBody.appendChild(row)
                
            });
        })
    }
    //event listener for form submittion

   dutyForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const formData = new FormData(dutyForm)

    const dutyData = {
        name: formData.get('username'),
        cleaning_time: formData.get("cleaning_time"),
        duty: formData.get('duty')
    }

    ////Add data to server

    fetch('http://localhost:3000/duty', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(dutyData)
    })


   })

   ////add event listener to the table body ('click)
   //popultae the form for editing
   dutyTableBody.addEventListener('click', (e) => {
    const target = e.target
    const id = target.dataset.id
    console.log(id)
    

    fetch(`http://localhost:3000/duty/${duty_id}`)
    .then(response => response.json())
    .then(data => {
        if(target.classList.contains('edit')){
            /// should populate the form
            document.getElementById('username').value = data.name
            document.getElementById('cleaning_time').value = data.cleaning_time
            document.getElementById('duty').value = data.duty
            document.getElementById('duty_id').value = data.id

        }else if(target.classlist.contains('delete')){
            //delete logic

        }
    })
   })







loadDuties();
})