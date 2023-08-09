// Copyright (c) 2023, Noori and contributors
// For license information, please see license.txt

function cal_plan_end(frm) {
	let day_to_add = frm.doc.membership_valid_for*365
	let date_of_reg = new Date(frm.doc.membership_starts);
	let valid_till_date = new Date(date_of_reg + day_to_add)
	valid_till_date.setDate(date_of_reg.getDate()+day_to_add)
	frm.set_value('membership_ends',valid_till_date)

}
// function cal_total(frm){
// 	let 
// }

frappe.ui.form.on('Gym Membership', {
	membership_starts:cal_plan_end,
	// status_of_fee:
});
