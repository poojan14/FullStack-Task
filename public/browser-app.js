const formsDOM = document.querySelector('.forms')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.poly-form')
const InputDOM = document.querySelector('.poly-input')
const formAlertDOM = document.querySelector('.form-alert')
const ColorDOM = document.querySelector('.edit-color')

const showForms = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { forms },
    } = await axios.get('/api/v1/forms')
    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const allForms = forms
      .map((form) => {
        const { completed, _id: formID, name } = form
        return `<div class="single-task">
<h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
<div class="task-links">


<a href="task.html?id=${formID}"  class="edit-link">
<i class="fas fa-edit"></i>
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${formID}">
<i class="fas fa-trash"></i>
</button>
</div>
</div>`
      })
      .join('')
    tasksDOM.innerHTML = allForms
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}

showForms()



tasksDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id
    try {
      await axios.delete(`/api/v1/forms/${id}`)
      showForms()
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})



formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = InputDOM.value
  const color = ColorDOM.value
  try {
    await axios.post('/api/v1/forms', { name,color })
    showTasks()
    taskInputDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, task added`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
