# Copyright (c) 2023, Noori and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class GymSubscriptionPlans(Document):
	def before_save(self):
		if(self.validity_in_days % 30 !=0 or self.validity_in_days<0):
			frappe.throw("The day should be a multiple of 30's like 30,60,90 etc and should not be a -ve number")
		else:
			self.validity_in_months = (self.validity_in_days)/30

