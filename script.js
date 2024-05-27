let table = document.getElementById("gpa_table");
const gaugeElement = document.getElementById("indicator");
const gaugeElement2 = document.getElementById("indicator2");
var ai_id=0;
let gauge = 0;
let gauge2 = 0;

p_grade_template = `<select id="p_grade${ai_id}" class="p_grade">
<option value="none">الرمز السابق</option>
<option value="2.5">C+</option>
<option value="2.25">C</option>
<option value="2">C-</option>
<option value="1.75">D+</option>
<option value="1.5">D</option>
<option value="0">F</option>
</select>`

delete_template = `<img src="https://elcom-team.com/delete1.svg" class="delete_row" id="delete${ai_id}" onclick="delete_row(this)">`

temp_td = '<img src="https://elcom-team.com/delete1.svg" style="visibility:hidden" class="delete_row">'

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
<option value="0.75">F</option>
</select>`
console.log("Zaid Samamah, V3")

hours_template = `<input type="number" id="hours${ai_id}" class="hrs" min="1" placeholder="ساعات المادة" required>`


function load_table() {
  // for (let i = 5; i > 0; i--)
    // add_row()
    let row = table.insertRow(-1)
    let delete_btn = row.insertCell(0)
    let p_grade = row.insertCell(1)
    let grade = row.insertCell(2)
    let hours = row.insertCell(3)
    delete_btn.innerHTML=temp_td
    p_grade.innerHTML=p_grade_template
    grade.innerHTML=grade_template
    hours.innerHTML=hours_template
    ai_id++
}

function delete_row(o){
  let p=o.parentNode.parentNode;
  if(ai_id==1){
    return;
  }
  else{
    p.parentNode.removeChild(p);
    ai_id--
  }
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
  let diff='0';
  let diff_hrs = '0';

  //calc all hours
  for(let i=0;i<hrss.length;i++){
    hrs_sum = parseInt(hrs_sum) + parseInt(hrss[i].value)
    if(p_grades[i].value!='none' && p_hours!=0){
      diff = parseFloat(diff) + parseInt(hrss[i].value)*parseFloat(p_grades[i].value)
      diff_hrs = parseInt(diff_hrs) + parseInt(hrss[i].value)
    }
  }

  //calc sem gpa
  p_sum='0'
  for(let i=0;i<hrss.length;i++){
    temp = grades[i].value
    if(p_grades[i].value!='none' && p_hours!=0){
      if(parseFloat(p_grades[i].value)>parseFloat(grades[i].value)){
        temp = p_grades[i].value
      }
    }
    p_sum = parseFloat(p_sum) + (parseInt(hrss[i].value)*parseFloat(temp))
  }
  sem_gpa = (parseFloat(p_sum)/parseInt(hrs_sum)).toFixed(2)

  p_g = parseFloat(p_gpa)*parseInt(p_hours) - parseFloat(diff)
  c_g = parseFloat(sem_gpa)*parseInt(hrs_sum)
  ttl_hrs = parseInt(hrs_sum) + parseInt(p_hours) - parseInt(diff_hrs)
  all_gpa = parseFloat((parseFloat(p_g) + parseFloat(c_g))/parseInt(ttl_hrs)).toFixed(2)



  document.getElementById("all_hrs").innerText=": " + (parseInt(ttl_hrs))
  document.getElementById("sem_hrs").innerText=": " + hrs_sum
  gauge = sem_gpa
  gauge2 = all_gpa
  setGaugeValue(gaugeElement, gauge);
  setGaugeValue2(gaugeElement2,gauge2)
}

//counter1 functionality 

  function setGaugeValue(gauge, value) {
    document.getElementsByClassName("gauge__fill")[0].style.transform = `rotate(${
      (value)/8
    }turn)`;
    document.getElementsByClassName("gauge__cover")[0].textContent = `${parseFloat(value).toFixed(2)}/4`;
    if(parseFloat(value).toFixed(2)<2){
      document.getElementById('indicator_fill').style.backgroundColor='red'
      if(parseFloat(value).toFixed(2)<=0)
        document.getElementById('pass_failed').innerText=""
      else
        document.getElementById('pass_failed').innerText="ضعيف"
    }
    else if(parseFloat(value).toFixed(2)<2.5){
      document.getElementById('indicator_fill').style.backgroundColor='yellow'
      document.getElementById('pass_failed').innerText="مقبول"
    }
    else if(parseFloat(value).toFixed(2)<3){
      document.getElementById('indicator_fill').style.backgroundColor='orange'
      document.getElementById('pass_failed').innerText="جيد"
    }
    else if(parseFloat(value).toFixed(2)<3.5){
      document.getElementById('indicator_fill').style.backgroundColor='#00b9f9'
      document.getElementById('pass_failed').innerText="جيد جدا"
    }
    else if(parseFloat(value).toFixed(2)<=4 && parseFloat(value).toFixed(2)>=3.5){
      document.getElementById('indicator_fill').style.backgroundColor='green'
      document.getElementById('pass_failed').innerText="ممتاز"
    }
    else{
      document.getElementById('indicator_fill').style.backgroundColor='grey'
      document.getElementById('pass_failed').innerText="معدلك التراكمي"
    }

  }


// counter2 functionality
  function setGaugeValue2(gauge2, value) {
    document.getElementById("indicator_fill2").style.transform = `rotate(${
      (value)/8
    }turn)`;
    document.getElementById("gauge_cover2").textContent = `${parseFloat(value).toFixed(2)}/4`;

    if(parseFloat(value).toFixed(2)<2){
      document.getElementById('indicator_fill2').style.backgroundColor='red'
      if(parseFloat(value).toFixed(2)<=0)
        document.getElementById('pass_failed2').innerText=""
      else
        document.getElementById('pass_failed2').innerText="ضعيف"
    }
    else if(parseFloat(value).toFixed(2)<2.5){
      document.getElementById('indicator_fill2').style.backgroundColor='yellow'
      document.getElementById('pass_failed2').innerText="مقبول"
    }
    else if(parseFloat(value).toFixed(2)<3){
      document.getElementById('indicator_fill2').style.backgroundColor='orange'
      document.getElementById('pass_failed2').innerText="جيد"
    }
    else if(parseFloat(value).toFixed(2)<3.5){
      document.getElementById('indicator_fill2').style.backgroundColor='#00b9f9'
      document.getElementById('pass_failed2').innerText="جيد جدا"
    }
    else if(parseFloat(value).toFixed(2)<=4 && parseFloat(value).toFixed(2)>=3.5){
      document.getElementById('indicator_fill2').style.backgroundColor='green'
      document.getElementById('pass_failed2').innerText="ممتاز"
    }
    else{
      document.getElementById('indicator_fill2').style.backgroundColor='grey'
      document.getElementById('pass_failed2').innerText="معدلك الفصلي"
    }

  }


load_table();
setGaugeValue(gaugeElement[0], gauge);
setGaugeValue2(gaugeElement[1],gauge2)
