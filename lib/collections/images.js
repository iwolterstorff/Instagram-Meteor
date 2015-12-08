if (Meteor.isServer) {
	var imageStore = new FS.Store.GridFS("images");

	Images = new FS.Collection("images", {
		stores: [imageStore],
		filter: {
			allow: {
				contentTypes: ['image/*']
			}
		}
	});

	Images.allow({
		insert: function(userId) { return userId != null; },
		update: function(userId, image) { return userId === image.userId; },
		remove: function(userId, image) { return userId === image.userId; },
		download: function() { return true; } 
	});
}

if (Meteor.isClient) {
	var imageStore = new FS.Store.GridFS("images");

	Images = new FS.Collection("images", {
		stores: [imageStore],
		filter: {
			allow: {
				contentTypes: ['image/*']
			}
		}
	});
}