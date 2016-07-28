Template.Header.events({
  'click .main-menu' : function(event) {
    $(".side-nav").slideUp('slow');
    Session.set('menuMode', !Session.get('menuMode'));
  }
});
