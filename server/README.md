# WERSUT-BLOG


## FEATURE
- User system:
    - Create user
        - url: /user/<id>
        - method: POST
        - content-type: json
    - Update user
        - url: /user/<id>
        - method: PATCH
        - content-type: json

- Blog:
    - Get list Post
        - url: /post
        - method: GET
        - content-type: json
    - Get Post item
        - url: /post/<id>
        - method: GET
        - content-type: json
    - Create Post
        - url: /post
        - method: POST
        - content-type: json
    - Edit Post
        - url: /post/<id>
        - method: PATCH
        - content-type: json
    - Delete Post
        - url: /post/<id>
        - method: DELETE

- Comment:
    - Get list comment of a post
        - url: /post/<post_id>/comment
        - method: GET
        - content-type: json
    - Add comment to a post
<<<<<<< HEAD
    - Remove comment to a post

=======
        - url: /post/<post_id>/comment
        - method: POST
        - content-type: json
    - Remove a comment of a post
        - url: /post/<post_id>/comment/<comment_id>
        - method: DELETE
>>>>>>> develop
