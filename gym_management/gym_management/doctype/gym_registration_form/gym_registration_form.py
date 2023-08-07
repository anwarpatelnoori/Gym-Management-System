# Copyright (c) 2023, Noori and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import sys
sys.path.append('/Users/macbook/anwar-frappe-bench/apps/gym_management/p_function.py')
import p_function
class GymRegistrationForm(Document):
	def before_save(self):
		p_function.total_amount(self)
		p_function.locker(self)
		# p_function.membership_and_member_validation(self)
		p_function.membership_validation(self)
		# if(self.do_you_want_locker=="Yes"):
		# 	p_function.locker_available(self)
	def on_submit(self):
		pass 