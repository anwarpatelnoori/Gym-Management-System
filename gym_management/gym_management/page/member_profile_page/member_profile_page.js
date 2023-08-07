frappe.pages['member-profile-page'].on_page_load = function(wrapper) {
	new MemberProfile(wrapper)
}
// member_profile_content

MemberProfile = Class.extend({
	init: function(wrapper){
		this.page = frappe.ui.make_app_page({
			parent: wrapper,
			title: 'Member Profile',
			single_column: true
		});

		//page buil function call
		this.member_profile()
	},
	member_profile:function(){
		let me = $(this)

		let subscription_plan = function(){
			frappe.call({
				method:"gym_management.gym_management.page.member_profile_page.member_profile_page.get_member_data",
				callback: function(r){
					console.log(r)
					console.log(r.message.master_name)
					console.log(r.message.master_phone_number)
					console.log(r.message.subscription_plan)
					console.log('subscription success')
					$("#gym-member-name")[0].innerText= r.message.member_name
					$("#active-plan")[0].innerText= r.message.subscription_plan
					$("#master-name")[0].innerText= r.message.master_name
					$("#master-phone-number")[0].innerText= r.message.master_phone_number
					
				}
			})

		}
		$(frappe.render_template(frappe.member_profile_page.body, this)).appendTo(this.page.main)
		subscription_plan()
	}
})
let body = `
<section style="display: flex; justify-content: space-between;">
<div class="widget number-widget-box" style="width: 20%; style data-widget-name="Annual Sales">
    <div class="widget-head">
        <div class="widget-label">
            <div class="number-label text-danger"><span class="ellipsis" title="Annual Sales" style="color: black;">Gym Member Name
                </span></div>
            <div class="widget-subtitle"></div>
        </div>
    </div>
    <div class="widget-body">
        <div class="widget-content">
            <div class="number" id="gym-member-name" style="color:undefined"></div>
        </div>
    </div>
    <div class="widget-footer"></div>
</div>
<br>
<hr>


<div class="widget number-widget-box" style="width: 20%; style data-widget-name="Annual Sales">
    <div class="widget-head">
        <div class="widget-label">
            <div class="number-label text-danger"><span class="ellipsis" title="Annual Sales" style="color: black;">Active Plan
                </span></div>
            <div class="widget-subtitle"></div>
        </div>
    </div>
    <div class="widget-body">
        <div class="widget-content">
            <div class="number" id="active-plan" style="color:undefined"></div>
        </div>
    </div>
    <div class="widget-footer"></div>
</div>
<br>
<hr>


<div class="widget number-widget-box" style="width: 20%; style data-widget-name="Annual Sales">
    <div class="widget-head">
        <div class="widget-label">
            <div class="number-label text-danger"><span class="ellipsis" title="Annual Sales" style="color: black;">Gym Master Name
                </span></div>
            <div class="widget-subtitle"></div>
        </div>
    </div>
    <div class="widget-body">
        <div class="widget-content">
            <div class="number" id="master-name" style="color:undefined"></div>
        </div>
    </div>
    <div class="widget-footer"></div>
</div>
<br>
<hr>

<div class="widget number-widget-box" style="width: 25%; style data-widget-name="Annual Sales">
    <div class="widget-head">
        <div class="widget-label">
            <div class="number-label text-danger"><span class="ellipsis" title="Annual Sales" style="color: black;">Master Phone Number
                </span></div>
            <div class="widget-subtitle"></div>
        </div>
    </div>
    <div class="widget-body">
        <div class="widget-content">
            <div class="number" id="master-phone-number" style="color:undefined"></div>
        </div>
    </div>
    <div class="widget-footer"></div>
</div>

</section>


`;

frappe.member_profile_page={
	body:body
}