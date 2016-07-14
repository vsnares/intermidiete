Template.SetSchedule.helpers({
  machines: ()=> {
    return Machines.find({});
  },
  routes: ()=> {
    return Routes.find({});
  }
});
