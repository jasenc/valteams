module UsersHelper
  def job_title_icon
    if @user.profile.job_title == "Contractor"
      "<i class='fa fa-user'></i>".html_safe
    elsif @user.profile.job_title == "Consultant"
      "<i class='fa fa-lightbulb-o'></i>".html_safe
    elsif @user.profile.job_title == "Recruiter"
      "<i class='fa fa-user-plus'></i>".html_safe
    end
  end
end
