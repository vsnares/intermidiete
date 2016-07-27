Template.Header.events({
  'click .main-menu' : function () {
    Session.set('menuMode', !Session.get('menuMode'));
  }
});
