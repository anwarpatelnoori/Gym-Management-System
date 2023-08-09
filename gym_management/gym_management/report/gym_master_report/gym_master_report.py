import frappe
def execute(filters=None):
	return get_coulmns(),get_data(filters)
def get_data(filters):
	conditions = "AND 1=1"
	if (filters.get('master_id')):
		conditions+=f" AND master_id = '{(filters.get('master_id'))}' "
	print(f'\n\n\n conditons {conditions}\n\n\n')
	print(f'\n\n\n filters  {filters}\n\n\n')
	data = frappe.db.sql(f"""select name,member_name,subscription_plan,master_name, master_fee,total_fee,fee_paid,balance from `tabGym Registration Form` where docstatus=1 {conditions} and do_you_want_personal_trainer="Yes";""")
	return data
    
def get_coulmns():
	return[
		"ID:Link/Gym Registration Form :150",
		"Member Name:Data:150",
		"Subscription Plan:Data:150",
		"Master Name:Data:150",
		"Master Fee Balance:Currency :150",
		"Total Fee:Currency:150",
		"Fee Paid:Currency:150",
		"Balance:Currency:150",
	]

