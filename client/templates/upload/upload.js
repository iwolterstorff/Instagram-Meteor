Template.upload.events({
  'submit form': function(event, template) {
    event.preventDefault();

    var user = Meteor.user();

    var fileInput = event.target.fileInput;
    var files = fileInput.files;

    var caption = event.target.caption.value;

    for (var i = 0, ln = files.length; i < ln; i++) {
      var newFile = new FS.File(files[i]);
      if (user != null) {
        newFile.username = user.username;
        newFile.userId = user._id;
        newFile.caption = caption;
      } else {
        toastr.error("Something bad happened go away");
      }
      Images.insert(newFile, function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
        if (err){
          toastr.error("Error uploading: " + err);
        } else {
          toastr.success("Success uploading");
        }
      });
    }
  }
});