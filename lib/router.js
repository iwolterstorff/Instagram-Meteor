Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/', {
	name: 'home',
	template: 'home'
});

Router.route('/upload', {
	template: 'upload'
});

Router.route('/:username/photos', {
	name: 'userPhotos',
	template: 'home'
});

Router.route('/:username', {
	name: 'userProfile',
	template: 'user'
})