Handlebars.registerHelper('isLoggedIn', function () {
	return Meteor.user() != null;
});

Handlebars.registerHelper('isNotLoggedIn', function () {
	return Meteor.user() == null;
});

Handlebars.registerHelper('userEmail', function () {
	return Meteor.user().emails[0].address;
});

Handlebars.registerHelper('gravatarUrl', function (size) {
	var options = {
		secure: true,
		rating: 'r',
		default: 'identicon',
		size: size
	};
	var email = Meteor.user().emails[0].address;
	var url = Gravatar.imageUrl(email, options);
	return url;
});