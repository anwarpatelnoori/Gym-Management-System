# Copyright (c) 2023, Noori and contributors
# For license information, please see license.txt

import frappe


def execute(filters=None):
	return get_coulmns(),get_data(filters)

def get_data(filters):
	conditions = "AND 1=1"
	if (filters.get('member_name')):
		conditions+=f" AND member_name = '{(filters.get('member_name'))}' "
	if (filters.get('subscription_plan')):
		conditions+=f" AND subscription_plan = '{(filters.get('subscription_plan'))}'"
	conditions+=f" AND extra_classes = '{(filters.get('extra_classes'))}'"
	# print(f'\n\n\n{filters}\n\n\n')
	# print(f'\n\n\n{conditions}\n\n\n')
	# print(f'\n\n\n{filters}\n\n\n')

	data = frappe.db.sql(f"""select name,member_name,subscription_plan,membership_fee_balance,plane_fee,master_fee,extra_classes_total_fee,locker_total_fee,total_fee,fee_paid,balance from `tabGym Registration Form` where docstatus=1 {conditions};""")

	
	return data

def get_coulmns():
	return[
		"ID:Link/Gym Registration Form :150",
		"Member Name:Data:150",
		"Subscription Plan:Data:100"
		"Membership Fee :Currency :100",
		"Plan Fee :Currency :100",
		"Master Fee Balance:Currency :100",
		"Extra Class Fee:Currency:150",
		"Locker Fee:Currency:100",
		"Total Fee:Currency:100",
		"Fee Paid:Currency:100",
		"Balance:Currency:100",
	]

