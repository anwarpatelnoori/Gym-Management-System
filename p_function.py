import frappe

def membership_amount(self): 

    if(self.fee_paid=='Paid'):
        self.amount_paid=self.total_amount
        self.balance=0
    elif(self.fee_paid=='Unpaid'):
        self.balance=self.total_amount
        self.amount_paid=0
    else:
        if(self.amount_paid>self.total_amount):
            frappe.throw("Please Don't Pay Extra amount")
        elif(self.amount_paid<0):
            frappe.throw("Please Enter Valid Amount")
        else:
            self.balance=self.total_amount-self.amount_paid	

def total_amount(self):
    self.membership_fee_balance = self.membership_fee_balance or 0
    self.plane_fee = self.plane_fee or 0
    self.locker_total_fee = self.locker_total_fee or 0
    self.master_fee = self.master_fee or 0

    total_class_fee = 0
    for i in self.extra_classes:
        total_class_fee+=i.fee
    
    self.total_fee = self.membership_fee_balance + self.plane_fee + self.locker_total_fee + self.master_fee + total_class_fee
    if(self.status_of_fees=='Fully Paid'):
        self.fee_paid=self.total_fee
        self.balance=0
    elif(self.status_of_fees=='Not Paid'):
        self.balance=self.total_fee
        self.fee_paid=0
    else:
        if(self.fee_paid>self.total_fee):
            frappe.throw("Please Don't Pay Extra amount")
        elif(self.fee_paid<0):
            frappe.throw("Please Enter Valid Amount")
        else:
            self.balance=self.total_fee-self.fee_paid

def locker(self):
    self.locker_duration = self.locker_duration or 0
    if(self.locker_duration>=2):
        self.locker_total_fee= self.locker_fees_per_month * self.locker_duration
    else:
        self.locker_total_fee = self.locker_fees_per_month

def membership_and_member_validation(self):
    if(self.gym_member_name==self.member_name):
        pass
    else:
        frappe.throw("Membership ID mismatch Please Select Proper ID")

def membership_validation(self):
    validate_membership = frappe.db.exists('Gym Membership', {
        'docstatus':1,
        'membership_starts':('<=',  self.date_of_registration),
        'membership_ends':('>=',  self.date_of_registration),
    })
    if not validate_membership:
        frappe.throw("Gym Member Doesn't have valid membership ")

def locker_available(self):
        locker_id = frappe.get_doc('Gym Locker', self.locker_id)
        if(locker_id.status!='Available'):
            frappe.throw(f'{locker_id.locker} locker is not available:) Please Select another')
        else:
            locker_id.status='Unavailable'
            locker_id.save()
def  new_monthly_report(self):
    self.docstatus==1
    monthly_tracker = frappe.new_doc("Gym Monthly Fitness Tracker")
    monthly_tracker.validity_till=self.plan_end
    monthly_tracker.gym_registration_id=self.name
    monthly_tracker.gym_member_name=self.member_name
    monthly_tracker.plan=self.subscription_plan
    monthly_tracker.validity_starts= self.date_of_registration
    monthly_tracker.validity_till=self.plan_end
    monthly_tracker.insert()
    monthly_tracker.save()