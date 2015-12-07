var imageStore = new FS.Store.GridFS("images");

Images = new FS.Collection("images", {
  stores: [imageStore],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
 }
});


// Template.Profile.events({
//    'change .myFileInput': function(event, template) {
//       FS.Utility.eachFile(event, function(file) {
//         Images.insert(file, function (err, fileObj) {
//           if (err){
//              // handle error
//           } else {
//              // handle success depending what you need to do
//             // var userId = Meteor.userId();
//             // var imagesURL = {
//             //   "profile.image": "/cfs/files/images/" + fileObj._id
//             // };
//             // Meteor.users.update(userId, {$set: imagesURL});
//           }
//         });
//      });
//    }
// }
if (Meteor.isClient) {
  Template.myForm.events({
    'change .myFileInput': function(event, template) {
      FS.Utility.eachFile(event, function(file) {
        Images.insert(file, function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
        if (err){
          toastr.error("Error uploading: " + err);
        } else {
          toastr.success("Success uploading");
        }
      });
      });
    }
  });

  Template.imageList.helpers({
    'images': function() {
      return Images.find();
    }
  });
}