if (Meteor.isClient) {
  Accounts.onLogin(function() {
    FlowRouter.go('new_machine_name')
  });
}

  Accounts.onLogout(function() {
    FlowRouter.go('home')
  });

FlowRouter.triggers.enter([function(context, redirect){
  if(!Meteor.userId()){
    FlowRouter.go('home')
  }
}]);

FlowRouter.route('/', {
  name: 'home',
  action() {
    if(Meteor.userId()) {
      FlowRouter.go('new_machine_name')
    }

    BlazeLayout.render('HomeLayout')
  }
});

FlowRouter.route('/machine-list', {
  name: 'machine-list',
  action() {

    BlazeLayout.render('MainLayout', {main: 'Machines'});
  }
});

FlowRouter.route('/machine/:id', {
  name: 'machine',
  action() {
    BlazeLayout.render('MainLayout', {main: 'MachineSingle'});
  }
});

FlowRouter.route('/menu', {
  name: 'menu',
  action() {
    BlazeLayout.render('MainLayout', {main: 'Menu'});
  }
});

FlowRouter.route('/shopping-list', {
  name: 'shopping-list',
  action() {
    BlazeLayout.render('MainLayout', {main: 'ShoppingList'});
  }
});

FlowRouter.route('/routes', {
  name: 'routes',
  action() {
    BlazeLayout.render('MainLayout', {main: 'Routes'});
  }
});

FlowRouter.route('/route/:id', {
  name: 'route',
  action() {
    BlazeLayout.render('MainLayout', {main: 'Route'});
  }
});

FlowRouter.route('/new_machine_name', {
  name: 'new_machine_name',
  action() {
    BlazeLayout.render('MainLayout', {main: 'NewMachineName'});
  }
});

FlowRouter.route('/set_schedule', {
  name: 'set_schedule',
  action() {
    BlazeLayout.render('MainLayout', {main: 'SetSchedule'});
  }
});

FlowRouter.route('/set_daily_ticket', {
  name: 'set_daily_ticket',
  action() {
    BlazeLayout.render('MainLayout', {main: 'SetDailyTicket'});
  }
});
