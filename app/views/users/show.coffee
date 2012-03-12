@title = "User #{@user.toLabel()}"

dl class: "content", ->
  dt "Email:"
  dd @user.get("email")
  dt "First name:"
  dd @user.get("firstName")
  dt "Last name:"
  dd @user.get("lastName")
