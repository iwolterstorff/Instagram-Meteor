Meteor.publish('images', function(limit, username) {
  check(limit, Number);

  var findQuery = {};
  if (username) {
    check(username, String);
    findQuery = { username : username };
  }

  return Images.find(findQuery, {
    limit: limit,
    sort: { uploadedAt: -1 }
  });
});