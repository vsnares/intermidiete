Template.Header.events({
  'click .main-menu' : function(event) {
    Session.set('menuMode', !Session.get('menuMode'));
  }
});
