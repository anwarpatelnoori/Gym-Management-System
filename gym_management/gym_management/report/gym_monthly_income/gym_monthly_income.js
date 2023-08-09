// Copyright (c) 2023, Noori and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Gym Monthly Income"] = {
	"filters": [
		{
			'fieldname':'member_name',
			'label':('Gym Member Name'),
			'fieldtype':'Link',
			'width':100,
			'reqd':0,
			'options':'Gym Membership'
		},
		{
			'fieldname':'subscription_plan',
			'label':('Subscription Plan'),
			'fieldtype':'Link',
			'width':100,
			'reqd':0,
			'options':'Gym Subscription Plans'
		},
		// {
		// 	'fieldname':'extra_classes',
		// 	'label':('Extra Classes'),
		// 	'fieldtype':'Link',
		// 	'width':100,
		// 	'options':'Gym Extra Classes Details'
			
		// }

		

	]
};
