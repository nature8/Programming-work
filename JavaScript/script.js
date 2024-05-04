let btn = document.querySelector('button');
btn.addEventListener('click', inputMsg);
function inputMsg(){
  let name = prompt('Enter Name of Student');
  btn.textContent = "Roll No. 1: "+name;
}