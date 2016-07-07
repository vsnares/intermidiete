if (Meteor.isClient) {
  Accounts.onLogin(function() {
    FlowRouter.go('machine-book')
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
      FlowRouter.go('machine-book')
    }

    GAnalytics.pageview();
    BlazeLayout.render('HomeLayout')
  }
});

FlowRouter.route('/machine-book', {
  name: 'machine-book',
  action() {
    GAnalytics.pageview();
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

FlowRouter.route('/writers', {
  name: 'writers',
  action() {
    BlazeLayout.render('MainLayout', {main: 'Writers'});
  }
});
