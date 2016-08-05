Template.NewMachineName.onCreated(function() {
  console.log("CREATED!!!")
  var self = this;
  self.autorun(function() {
    self.subscribe('machines');
    self.subscribe('routes');
    self.subscribe("autocompleteMachines");
  });
});

Template.NewMachineName.helpers({
  machines: ()=> {
    return Machines.find({});
  },
  routes: ()=> {
    return Routes.find({});
  }
});

Template.NewMachineName.events({
  'submit form': function(event, template) {
      event.preventDefault();
      selected = template.findAll( "input[type=checkbox]:checked");
      array = _.map(selected, function(item) {
        return item.defaultValue;
      });

      machineNameVar = $(".suggest").tagsinput('items')
      console.log(machineNameVar)
      machineDescrVar = event.target.machineDescr.value;
      machineAddressVar = event.target.machineAddress.value;
      nameWithNoCommas = machineNameVar.join().replace(/,/g,"");
      insertedMachineId = Machines.insert({
          name:    nameWithNoCommas,
          address: machineAddressVar,
          desc:    machineDescrVar,
          tags:    machineNameVar
        }, function(error, result) {
          sAlert.warning(error.message, {timeout: 3000});
        });

      array.forEach(function(itemId, i, arr) {
        Routes.update(itemId, {
          $push: { machines: insertedMachineId },
        });
      });
      template.find("form").reset();
      $(".tag.label.label-info").remove();
      $("#tagsInput").tagsinput('removeAll');
  },

  'click .done' : function (event) {
      FlowRouter.go('/set_schedule');
  },

  'click .asign_to_route' : function (event) {
    Session.set('AsignToRouteMode', !Session.get('AsignToRouteMode'));
  }
});

Template.NewMachineName.rendered= function(){
    console.log("RENDERED!!!")

    function arrayUnique(array) {
      var a = array.concat();
      for(var i=0; i<a.length; ++i) {
          for(var j=i+1; j<a.length; ++j) {
              if(a[i] === a[j])
                  a.splice(j--, 1);
          }
      }
      return a;
    }

    var arrayOfAllTags = _.reduce(_.map(Machines.find({}).fetch(),
      function(doc) {
        return doc.tags
      }),
      function(array1, array2){
        final_array = arrayUnique(array1.concat(array2));
        return final_array;
      });

    console.log(arrayOfAllTags)
    var machineNames = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: arrayOfAllTags
    });
    machineNames.initialize();

    $('.suggest').tagsinput({
      typeaheadjs: {
        name: 'machinenames',
        source: machineNames.ttAdapter()
      }
    });
  }
