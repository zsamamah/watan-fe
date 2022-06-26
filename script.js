var ai_id=1;
let table = document.getElementById("gpa_table");

p_grade_template = `<select id="p_grade${ai_id}" class="p_grade">
<option value="none">الرمز السابق</option>
<option value="4">A+</option>
<option value="3.75">A</option>
<option value="3.5">A-</option>
<option value="3.25">B+</option>
<option value="3">B</option>
<option value="2.75">B-</option>
<option value="2.5">C+</option>
<option value="2.25">C</option>
<option value="2">C-</option>
<option value="1.75">D+</option>
<option value="1.5">D</option>
<option value="0">F</option>
</select>`

delete_template = `<button class="delete_row" id="delete${ai_id}" onclick="delete_row(this)">X</button>`

grade_template = `<select id="grade${ai_id}" class="grade">
<option value="4">A+</option>
<option value="3.75">A</option>
<option value="3.5">A-</option>
<option value="3.25">B+</option>
<option value="3">B</option>
<option value="2.75">B-</option>
<option value="2.5">C+</option>
<option value="2.25">C</option>
<option value="2">C-</option>
<option value="1.75">D+</option>
<option value="1.5">D</option>
<option value="0">F</option>
</select>`

hours_template = `<input type="number" id="hours${ai_id}" class="hrs" min="1" placeholder="ساعات المادة" required>`


function load_table() {
  for (let i = 5; i > 0; i--)
    add_row()
}

function delete_row(o){
  let p=o.parentNode.parentNode;
  p.parentNode.removeChild(p);
}

function add_row(){
  let row = table.insertRow(-1)
  let delete_btn = row.insertCell(0)
  let p_grade = row.insertCell(1)
  let grade = row.insertCell(2)
  let hours = row.insertCell(3)
  delete_btn.innerHTML=delete_template
  p_grade.innerHTML=p_grade_template
  grade.innerHTML=grade_template
  hours.innerHTML=hours_template
  ai_id++
}

function calc_gpa(e){
  e.preventDefault()

  p_gpa = !e.target.p_gpa.value?'0':e.target.p_gpa.value
  p_hours = !e.target.p_hours.value?'0':e.target.p_hours.value
  hrss = e.target.getElementsByClassName('hrs');
  grades = e.target.getElementsByClassName('grade');
  p_grades = e.target.getElementsByClassName('p_grade');
  let hrs_sum='0';

  //calc all hours
  for(let i=0;i<hrss.length;i++){
    if(p_grades[i].value=='none')
    hrs_sum = parseInt(hrs_sum) + parseInt(hrss[i].value)
  }

  //calc sem_gpa
  p_sum='0'
  for(let i=0;i<hrss.length;i++){
    p_sum = parseFloat(p_sum) + (parseInt(hrss[i].value)*parseFloat(grades[i].value))
  }
  sem_gpa = (parseFloat(p_sum)/parseInt(hrs_sum)).toFixed(2)

  //calc all_gpa
  all_gpa = (((parseFloat(p_gpa)*parseInt(p_hours))+(parseFloat(sem_gpa)*parseInt(hrs_sum)))/(parseInt(hrs_sum) + parseInt(p_hours))).toFixed(2)

  //show data in page
  document.getElementById("all_gpa").innerText=all_gpa
  document.getElementById("all_hrs").innerText=parseInt(hrs_sum) + parseInt(p_hours)
  document.getElementById("sem_gpa").innerText= sem_gpa
  document.getElementById("sem_hrs").innerText=hrs_sum
  
}


load_table();
