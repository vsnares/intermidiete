Template.ShoppingList.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('machines');
  });
});

Template.ShoppingList.helpers({
  shoppingList: ()=> {
    return Machines.find({cheked: true});
  }
});
