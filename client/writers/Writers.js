Template.NewWriter.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('recipes');
    self.subscribe('writers')
  });
});

Template.NewWriter.helpers({
  recipes: ()=> {
    return Recipes.find({});
  }
});

Template.NewWriter.events({
  'submit form': function(event, template) {
      event.preventDefault();
      var selected = template.findAll( "input[type=checkbox]:checked");
      var array = _.map(selected, function(item) {
        return item.defaultValue;
      });
      var writerNameVar = event.target.writerName.value;
      Writers.insert({
        name: writerNameVar,
        recipes: array
      });
      template.find("form").reset();
    }
});

Template.Writers.helpers({
  writerRecipes: function(writerId) {
    return Recipes.find({
      recipes: {
        $in: [ writerId ]
      }
    });
  }
});
