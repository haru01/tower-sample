tableFor "posts", (t) ->
  t.head ->
    t.row ->
      t.header "title", sort: true
      t.header "body", sort: true
  t.body ->
    for post in @posts
      t.row ->
        t.cell -> post.get("title")
        t.cell -> post.get("body")
        t.cell -> 
          linkTo 'Show', urlFor(post)
          span "|"
          linkTo 'Edit', urlFor(post, action: "edit")
          span "|"
          linkTo 'Destroy', urlFor(post), "data-method": "delete"
  t.foot ->
    t.row ->
      t.cell colspan: 5, ->
        linkTo 'New Post', urlFor(App.Post, action: "new")

