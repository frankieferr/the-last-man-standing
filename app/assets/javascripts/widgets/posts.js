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
    var getUrl = $(this.element).data("get-url");
    $(this.element).mask("Gathering information");

    this._sendAjax({
      url: getUrl,
      success: "_setupPostData",
      complete: "_unmaskElement"
    });
  },

  _setupPostData: function (response) {
    this._bind(this.postButton, "click", "_submitPost");
    this._bind(this.postTextArea, "keypress", "_adjustTextareaHeight");
    this._bind(this.postTextArea, "keypress", "_submitPostOnEnter");
    this.current_man = response.current_man;
    for (var i = 0, length = response.posts_and_comments.length; i < length; i++) {
      this._addPostToPage(response.posts_and_comments[i]);
    }
  },

  _addPostToPage: function (postInfo) {
    var post = $.parseHTML(JST["templates/posts/post"]({post: postInfo, current_man: this.current_man}));
    $(this.postsArea).prepend(post);
    for (var i = 0, length = postInfo.comments.length; i < length; i++) {
      this._addCommentToPage(post, postInfo.comments[i])
    }
    this._bind($(post).find("button[data-button=add_comment]"), "click", "_addComment");
    this._bind($(post).find("textarea"), "keypress", "_adjustTextareaHeight");
    this._bind($(post).find("textarea"), "keypress", "_addCommentOnEnter");
    this._bind($(post).find("[data-area=comments_link]>a"), "click", "_toggleComments");
  },

  _addCommentToPage: function (postHtml, commentInfo) {
    var comment = $.parseHTML(JST["templates/posts/comment"](commentInfo));
    $(postHtml).find("[data-area=persistedComments]").append(comment);
  },

  _submitPostOnEnter: function (evt) {
    if (evt.keyCode == 13 && !evt.shiftKey) {
      this._submitPost();
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
      url: "/posts/add",
      data: {
        message: message
      },
      success: "_postPosted",
      complete: "_unmaskElement"
    });
  },

  _postPosted: function (response) {
    $(this.postTextArea).val("")
    this._addPostToPage(response);
  },

  _addCommentOnEnter: function (evt) {
    if (evt.keyCode == 13 && !evt.shiftKey) {
      this._addComment(evt);
    }
  },

  _addComment: function (evt) {
    var message = $(evt.currentTarget).closest("div.row").find("textarea").val();
    var postId = $(evt.currentTarget).closest("div.row").find("button").data("post-id")
    if(message == "" || postId == "") {
      return;
    }

    $(evt.currentTarget).closest("div.row").mask("Posting");
    this._sendAjax({
      type: "post",
      url: "/posts/addComment",
      data: {
        message: message,
        post_id: postId
      },
      success: "_commentAdded",
      complete: "_unmaskElement"
    });
  },

  _commentAdded: function (response) {
    var postHtml = $(this.element).find("div[data-post-id=" + response.post_id + "]")[0];
    this._addCommentToPage(postHtml, response);
    $(postHtml).find("[data-area=newComment] textarea").val("");
    var count = parseInt($(postHtml).find(".comment_count").html());
    $(postHtml).find(".comment_count").html(count + 1)
  },

  _adjustTextareaHeight: function (evt) {
    $(evt.currentTarget).height(0).height($(evt.currentTarget)[0].scrollHeight)
  },

  _toggleComments: function (evt) {
    if($(evt.currentTarget).data("shown") == "true") {
      $(evt.currentTarget).closest("div.panel-body").find("div.comments").hide();
      $(evt.currentTarget).data("shown", "false");
      $(evt.currentTarget).find("i:nth-child(1)").html("Show Comments");
    } else {
      $(evt.currentTarget).closest("div.panel-body").find("div.comments").show();
      $(evt.currentTarget).data("shown", "true");
      $(evt.currentTarget).find("i:nth-child(1)").html("Hide Comments");
    }

  }
})