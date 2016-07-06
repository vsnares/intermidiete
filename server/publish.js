Meteor.publish('recipes', function(){
  return Recipes.find({author: this.userId});
});

Meteor.publish('writers', function(){
  return Writers.find({author: this.userId});
});

Meteor.publish('singleRecipe', function(id){
  check(id, String);
  Meteor
  return Recipes.find({_id: id});
});
