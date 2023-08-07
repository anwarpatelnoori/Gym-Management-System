// Copyright (c) 2023, Noori and contributors
// For license information, please see license.txt



function cal_plan_end(frm) {
	let day_to_add = frm.doc.validity_plan_in_days
	let date_of_reg = new Date(frm.doc.date_of_registration);
	let valid_till_date = new Date(date_of_reg + day_to_add)
	valid_till_date.setDate(date_of_reg.getDate()+day_to_add)
	frm.set_value('plan_end',valid_till_date)

}
function cal_lock_end(frm){
	let day_to_add_for_locker= frm.doc.locker_duration *30
	let date_of_reg = new Date(frm.doc.date_of_registration);
	let loc_avail_upto = new Date(date_of_reg + day_to_add_for_locker)
	loc_avail_upto.setDate(date_of_reg.getDate()+day_to_add_for_locker)
	frm.set_value('locker_available_till', loc_avail_upto)
}
function extra_class_total(frm){
	if(frm.doc.do_you_want_extra_classes==="Yes"){
	let total_fee = 0;
			frm.doc.extra_classes.forEach(row => {
				total_fee += row.fee || 0;
			});
			frm.set_value('extra_classes_total_fee', total_fee);
	}
}

frappe.ui.form.on('Gym Registration Form', {
	setup: function (frm) {

		// duplicate exersice
		frm.duplicate_classes = function (frm, row) {
			frm.doc.extra_classes.forEach(element => {
				console.log(element.class_id)
				if (row.class_id == '' || row.idx == element.idx) {
				}
				else {
					if (row.class_id == element.class_id) {
						row.class_id = ''
						// frappe.throw('Already exists')
						frappe.throw(`You have already taken ${element.class_name} class at  ${element.idx}`)
						frappe.refresh_field('class_id')
					}
				}
			});
		}
	
		frm.calculate_extra_classes_total_fee = function () {
			let total_fee = 0;
			frm.doc.extra_classes.forEach(row => {
				total_fee += row.fee || 0;
			});
			frm.set_value('extra_classes_total_fee', total_fee);
		};
		
		
	},
	before_save:extra_class_total,
	validity_plan_in_days: cal_plan_end, 
	date_of_registration: cal_plan_end,
	locker_id:cal_lock_end,
	locker_duration:cal_lock_end,
	extra_classes_fee:cal_lock_end,
	
});

frappe.ui.form.on('Gym Extra Classes Child Table',{
	class_id:function(frm, cdt, cdn){
		let row = locals[cdt][cdn]
		frm.duplicate_classes(frm, row)
		frm.calculate_extra_classes_total_fee(frm)
	},
	extra_classes_remove:(frm,cdt,cdn)=>{
		frm.calculate_extra_classes_total_fee(frm)
		
	},
	// extra_classes_remove:(frm,cdt,cdn)=>{
	// 	frm.calculate_extra_classes_total_fee(frm)
	// }
})




