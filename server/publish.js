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

Meteor.publish('writerRecipes', function(writerId) {
  return Recipes.find({
    writers: {
      $in: [ writerId ]
    }
  });
});

Meteor.publish('recipeWriters', function(recipeId) {
  var recipe = Recipes.findOne({ _id: recipeId });
  return Writers.find({
    _id: {
      $in: recipe.writers
    }
  });
});
