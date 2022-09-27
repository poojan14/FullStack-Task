const IDDOM = document.querySelector('.edit-id')
const NameDOM = document.querySelector('.edit-name')
const ColorDOM = document.querySelector('.edit-color')
const editFormDOM = document.querySelector('.single-poly-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showForm = async () => {
  try {
    const {
      data: { form },
    } = await axios.get(`/api/v1/forms/${id}`)
    const { _id: formID, color, name } = form

    IDDOM.textContent = formID
    NameDOM.value = name
    ColorDOM.value=color
    tempName = name
}
}
showForm()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const Name = NameDOM.value
    const Color =ColorDOM.value


    const {
      data: { task },
    } = await axios.patch(`/api/v1/forms/${id}`, {
      name: Name,
      color: Color,
    })

    const { _id: formID, color, name } = form

    IDDOM.textContent = formID
    NameDOM.value = name
    tempName = name
    ColorDOM.value=color
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited task`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
