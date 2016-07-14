Template.Routes.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('routes')
  });
});

Template.Routes.helpers({
  routes: ()=> {
    return Routes.find({});
  }
});
