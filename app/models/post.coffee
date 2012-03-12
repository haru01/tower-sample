class App.Post extends Tower.Model
  @field "id", type: "Id"
  @field "title", type: "String"
  @field "body", type: "String"
  
  @belongsTo "user"
  
  @timestamps()
