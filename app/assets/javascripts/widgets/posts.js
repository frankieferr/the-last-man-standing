$.widget("tlms.posts", $.tlms.base, {

  _create: function() {
    this._super();
    this.postButton = $(this.element).find("[data-button=post]")[0];
    this.postTextArea = $(this.element).find("textarea[data-textarea='post']")[0];
    this.postsArea = $(this.element).find("[data-area=posts]");
    this.addPostArea = $(this.element).find("[data-area=add_post]");
    this._setup();
  },

  _setup: function () {
    $(this.postTextArea).val("");

    $(this.element).mask("Gathering information");
    this._sendAjax({
      url: "posts/all",
      success: "_setupPostData",
      complete: "_unmaskElement"
    });
  },

  _setupPostData: function (response) {
    this._bind(this.postButton, "click", "_submitPost");
    this._bind(this.postTextArea, "keypress", "_keyPressTextArea");

    for (var i = 0, length = response.posts_and_comments.length; i < length; i++) {
      var post = $.parseHTML(JST["templates/posts/post"]({post: response.posts_and_comments[i], current_man: response.current_man}));
      $(this.postsArea).append(post);
      this._bind($(post).find("button[data-button=add_comment]"), "click", "_addComment");
      this._bind($(post).find("textarea"), "keypress", "_keyPressTextArea");
    }
  },

  _submitPost: function () {
    var message = $(this.postTextArea).val()

    if(message == "") {
      return;
    }
    $(this.addPostArea).mask("Posting");
    this._sendAjax({
      type: "post",
      url: "posts/add",
      data: {
        message: message
      },
      success: "_postPosted",
    });
  },

  _postPosted: function () {
    $(this.postTextArea).val("")
    location.reload();
  },

  _addComment: function (evt) {
    var message = $(evt.currentTarget).closest("div.row").find("textarea").val();
    var postId = $(evt.currentTarget).data("post-id")
    if(message == "" || postId == "") {
      return;
    }

    $(evt.currentTarget).closest("div.row").mask("Posting");
    this._sendAjax({
      type: "post",
      url: "posts/addComment",
      data: {
        message: message,
        post_id: postId
      },
      success: "_commentAdded",
    });
  },

  _commentAdded: function () {
    location.reload();
  },

  _keyPressTextArea: function (evt) {
    $(evt.currentTarget).height(0).height($(evt.currentTarget)[0].scrollHeight)
  }
})