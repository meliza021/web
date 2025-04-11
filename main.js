let button = document.querySelector('p-button')
button.addEventListener('c-click', (data)=>{
    alert(data.detail.message)
})