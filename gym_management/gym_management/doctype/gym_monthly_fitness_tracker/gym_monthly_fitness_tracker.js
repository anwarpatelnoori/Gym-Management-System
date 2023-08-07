// Copyright (c) 2023, Noori and contributors
// For license information, please see license.txt
function day_30(frm) {
    if(frm.doc.__islocal) {
      
      let start_date = new Date(2023, 0, 1);  // Month is 0-indexed
      for(let i = 0; i < 31; i++) {
        let date = frappe.datetime.add_days(start_date, i);
        console.log(date)
        let child = frm.add_child('gym_fitness_tracker');
        frappe.model.set_value(child.doctype, child.name, 'date', date);
      }
      frm.refresh_field('gym_fitness_tracker');
    }
  }
function date_loop(frm){
  if(cur_frm.doc.gym_registration_id){
  if(frm.doc.__islocal){
    frm.clear_table("gym_fitness_tracker")
    let validity_till = new Date(frm.doc.validity_till); 
    let validity_starts = new Date(frm.doc.validity_starts); 
    for (let first_day = new Date(validity_starts);first_day<=validity_till;first_day.setDate(first_day.getDate()+1)){
      let date = frappe.datetime.obj_to_str(first_day);
      let child = frm.add_child('gym_fitness_tracker');
      child.date=date;
    }
    frm.refresh_field('gym_fitness_tracker')
  }
}
}


frappe.ui.form.on('Gym Monthly Fitness Tracker', {
    // setup:day_30,
    // refresh: day_30,
    gym_registration_id: date_loop
  });
  