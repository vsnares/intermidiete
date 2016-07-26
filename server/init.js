Meteor.startup(() => {
});


WebApp.rawConnectHandlers.use('/set_daily_ticket', function(req, res, next) {
  res.setHeader('cache-control', 'no-cache');
  next();
});
