function render(){
    data.map((ele,index)=>{
      return (table.innerHTML+=`<tr>
      <td>
          <button class="delete_row" id="delete${index}" onclick="foo(this.id)">X</button>
      </td>
      <td>
          <select id="p_grade${index}">
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
          </select>
      </td>
      <td>
          <select id="grade${index}">
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
          </select>
      </td>
      <td>
          <input type="number" id="hours${index}" min="0" placeholder="ساعات المادة">
      </td>
    </tr>`)
    })
  }