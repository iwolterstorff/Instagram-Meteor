Template.myForm.events({
  'change .myFileInput': function(event, template) {

    var user = Meteor.user();

    FS.Utility.eachFile(event, function(file) {
      var newFile = new FS.File(file);
      if (user != null) {
        newFile.username = user.username;
        newFile.userId = user._id;
      }
      Images.insert(newFile, function (err, fileObj) {
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