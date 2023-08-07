// Copyright (c) 2023, Noori and contributors
// For license information, please see license.txt

// extra functions 
function validate_weekday_work_out_level(frm, workout){
	if (frm.doc.master_training_level === 'Hard') {
		if(workout<6){
		frappe.throw('Master Level Training should have  at least 6 exercises');
		}
	}
	else if (frm.doc.master_training_level === 'Medium') {
		if(workout<=3)
		frappe.throw('Medium Level Training should have  at least 4 exercises');
		else if(workout>=5){
			frappe.throw("Medium level training can't exceed more than 4 exercise ");
		}
	}
	else {
		if(workout>=4){
			frappe.throw("Easy level training can't exceed moore than 3 exercise ");
		}
	}
}
function validate_frida(frm, workout){
	
}
frappe.ui.form.on('Gym Workout Plan', {
	setup: function (frm) {

		// duplicate exersice
		frm.duplicate_workout = function (frm, row) {
			frm.doc.monday_exercise.forEach(element => {
				console.log(element.exercise_name)
				if (row.exercise == '' || row.idx == element.idx) {
				}
				else {
					if (row.exercise == element.exercise) {
						row.exercise = ''
						// frappe.throw('Already exists')
						frappe.throw(`${element.exercise_name} already exists row ${element.idx}`)
						frappe.refresh_field('monday_exercise')
					}
				}
			});
		}
	},
	before_save: function (frm) {
		let monday_workout = frm.doc.monday_exercise.length;
		validate_work_out_level(frm,monday_workout)
		let tuesday_workout = frm.doc.tuesday_exercise.length;
		validate_work_out_level(frm,tuesday_workout)
		let wednesday_workout = frm.doc.wednesday_exercise.length;
		validate_work_out_level(frm,wednesday_workout)
		let thursday_workout = frm.doc.thursday_exercise.length;
		validate_work_out_level(frm,thursday_workout)
		let saturday_workout = frm.doc.saturday_exercise.length;
		validate_work_out_level(frm,saturday_workout)
		

	},

});
frappe.ui.form.on('Gym Workout Monday Details', {
	exercise: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn]
		// console.log('child table')
		// console.log(row)
		// console.log(row.exercise_name)
		frm.duplicate_workout(frm, row)
	},


});