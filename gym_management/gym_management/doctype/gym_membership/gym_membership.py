# Copyright (c) 2023, Noori and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import sys
sys.path.append('/Users/macbook/anwar-frappe-bench/apps/gym_management/p_function.py')
import p_function

class GymMembership(Document):
	def before_save(self):
		p_function.membership_amount(self)
			
	

