// Copyright (c) 2023, Noori and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Gym Master Report"] = {
	"filters": [
		{
			'fieldname':'master_id',
			'label':('Master Name'),
			'fieldtype':'Link',
			'width':100,
			'reqd':0,
			'options':'Gym Master Trainer'
		},
	]
};
