var recordsPerPage = 5;

Template.imageList.created = function() {
  var self = this;

  self.limit = new ReactiveVar;
  self.limit.set(recordsPerPage);
  
  Tracker.autorun(function() {
    Meteor.subscribe('images', self.limit.get(), Router.current().params.username);
  });
}

Template.imageList.rendered = function() {
  var self = this;
  // is triggered every time we scroll
  $(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
      incrementLimit(self);
    }
  });
}

Template.image.helpers({
  'postDate': function() {
    return moment(this.uploadedAt).format('MMMM Do YYYY, h:mm:ss a');
  }
});

Template.imageList.helpers({
  'images': function() {
    return Images.find({}, {sort:{uploadedAt:-1}});
  }
});

var incrementLimit = function(templateInstance) {
  var newLimit = templateInstance.limit.get() + recordsPerPage;
  templateInstance.limit.set(newLimit);
}

// from http://experimentsinmeteor.com/photo-blog-part-1/