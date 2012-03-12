window.designer ||= new DesignIO("app", port: 4181)

class App extends Tower.Application
  @configure ->
    @use Tower.Middleware.Agent
    @use Tower.Middleware.Location
    @use Tower.Middleware.Router

window.App = new App
