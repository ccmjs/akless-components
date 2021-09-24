/**
 * @overview data-based resources for building a commentary builder
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

/**
 * basic configuration
 * @type {Object}
 */
const basic = {
  "ignore": {
    "defaults": {
      "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "guest" ] ]
    },
    "mapping": {
      "user": {
        "none": {
          "key": "none",
          "title": "None",
          "value": ""
        },
        "guest": {
          "key": "guest",
          "title": "Guest Mode",
          "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "guest" ] ]
        },
        "cloud": {
          "key": "cloud",
          "title": "Digital Makerspace Account",
          "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "cloud" ] ]
        },
        "hbrsinfkaul": {
          "key": "hbrsinfkaul",
          "title": "H-BRS FB02 Account",
          "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "hbrsinfkaul" ] ]
        },
        "hbrsinfpseudo": {
          "key": "hbrsinfpseudo",
          "title": "H-BRS FB02 Account with Pseudonym",
          "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "hbrsinfpseudo" ] ]
        },
        "pseudo": {
          "key": "pseudo",
          "title": "One-time Pseudonym",
          "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "pseudo" ] ]
        }
      }
    }
  },
  "text": {
    "controls": "Controls",
    "controls_answer": "Answerable Comments",
    "controls_answer_info": "Every comment has an \"Answer\" button that can be used to answer to the comment.",
    "controls_delete": "Deletable Comments",
    "controls_delete_info": "Every comment has a \"Delete\" button. Use it to mark a comment as deleted. Comments of other users can't be deleted.",
    "controls_dislike": "Dislikable Comments",
    "controls_dislike_info": "Every comment has a \"Dislike\" button. Use it to show that you don't like a comment. Click again to undo it. You can't mark an own comment as disliked.",
    "controls_edit": "Editable Comments",
    "controls_edit_info": "Every comment has an \"Edit\" button. Use it to edit the text of an own comment. Comments of other users can't be edited.",
    "controls_heart": "Lovable Comments",
    "controls_heart_info": "Every comment has a \"Heart\" button. Use it to show that you really love a comment. Click again to undo it. You can't mark an own comment as loved.",
    "controls_like": "Likable Comments",
    "controls_like_info": "Every comment has a \"Like\" button. Use it to show that you like a comment. Click again to undo it. You can't mark an own comment as liked.",
    "controls_recycle": "Restorable Comments",
    "controls_recycle_info": "Every deleted comment has a \"Restore\" button. Use it to restore a deleted comment. You can't restore deleted comments of other users.",
    "controls_report": "Reportable Comments",
    "controls_report_info": "Every comment has a \"Report\" button. Use it to mark a comment as inappropriate. Click again to undo it. Please be aware that there is no administrator who reviews reported comments. However, reported comments are shown with a red background.",
    "controls_sort": "Changeable Sorting of Comments",
    "controls_sort_info": "At the top there is a button that can be used to change the sorting of the comments at any time.",
    "general": "General Settings",
    "labels": "Texts and Labels",
    "picture": "Default User Picture",
    "picture_info": "The picture behind this URL is used as the picture for the author of a comment if he does not have his own picture in his user data. If no input is made here, no user picture will be displayed for comments.",
    "preview": "Preview",
    "preview_title": "App Preview",
    "sort": "Sorting of Comments",
    "sort_by_date": "Sort by Date",
    "sort_by_rating": "Sort by Rating",
    "sort_info": "Determines whether the comments are initial sorted by date or rating.",
    "submit": "Submit",
    "text_answer": "Button: Answer to Comment",
    "text_answer_info": "Label for the \"Answer\" button of a comment.",
    "text_answers": "Button: Show Answers",
    "text_answers_info": "Label for the button that shows all answers of a comment. The placeholder \"%d\" is replaced by the number of answers to the comment.",
    "text_comments": "Display: Number of Comments",
    "text_comments_info": "The text that displays the number of comments. The placeholder \"%d\" is replaced by the number of comments.",
    "text_delete": "Tooltip: Delete Comment",
    "text_delete_info": "Tooltip for the \"Delete\" button of an own comment that marks a comment as deleted.",
    "text_deleted": "Display: Deleted Comment",
    "text_deleted_info": "The text that indicates that a comment is deleted.",
    "text_dislike": "Tooltip: Dislike Comment",
    "text_dislike_info": "Tooltip for the \"Dislike\" button of a comment.",
    "text_edit": "Tooltip: Edit Comment",
    "text_edit_info": "Tooltip for the \"Edit\" button of an own comment.",
    "text_heart": "Tooltip: Give Comment a Heart",
    "text_heart_info": "Tooltip for the \"Heart\" button of a comment.",
    "text_like": "Button: Like Comment",
    "text_like_info": "Label for the \"Like\" button of a comment.",
    "text_picture": "Tooltip: User Picture",
    "text_picture_info": "Tooltip for the user picture of a comment.",
    "text_recycle": "Button: Restore Comment",
    "text_recycle_info": "Label for the \"Restore\" button of an own deleted comment.",
    "text_report": "Tooltip: Report Comment",
    "text_report_info": "Tooltip for the \"Report\" button that marks a comment as inappropriate.",
    "text_sort_by_date": "Button: Sort by Date",
    "text_sort_by_date_info": "Label for the \"Sort by Date\" button that indicates that all comments are sort by date.",
    "text_sort_by_rating": "Button: Sort by Rating",
    "text_sort_by_rating_info": "Label for the \"Sort by Rating\" button that indicates that all comments are sort by rating.",
    "text_submit": "Button: Submit Comment",
    "text_submit_info": "Label for the \"Submit\" button that creates a new comment.",
    "text_updated": "Display: Updated Comment",
    "text_updated_info": "The text that indicates that a comment was updated.",
    "text_write_answer": "Placeholder: Write an Answer",
    "text_write_answer_info": "The text that appears in an empty input field for a new answer.",
    "text_write_comment": "Placeholder: Write an Comment",
    "text_write_comment_info": "The text that appears in an empty input field for a new comment.",
    "user": "User Authentication",
    "user_info": "The user must log in to send or rate a comment.<ul class=\"m-0 pl-4\"><li><u>Guest Mode:</u> The user can authenticate with any username and without a password.</li><li><u>Digital Makerspace Account:</u> The user must log in with a Digital Makerspace account.</li><li><u>H-BRS FB02 Account:</u> The user has to authenticate with an account from the Department of Computer Sciences at Hochschule Bonn-Rhein-Sieg University of Applied Sciences.</li><li><u>H-BRS FB02 Account with Pseudonym:</u> The same as the previous option, but the username is replaced with a pseudonym.</li><li><u>One-time Pseudonym:</u> The user is automatically logged in with a one-time pseudonym. Each login after the end of a session returns a different pseudonym.</li></ul>"
  },
  "tool": [ "ccm.component", "https://ccmjs.github.io/tkless-components/comment/versions/ccm.comment-7.0.0.js" ]
}

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const local = {
  "css": [ "ccm.load",
    [  // serial
      "./../../../libs/bootstrap-5/css/bootstrap.css",
      "./../styles.css"
    ],
    "./../../../libs/bootstrap-5/css/bootstrap-icons.css",
    { "url": "./../../../libs/bootstrap-5/css/bootstrap-fonts.css", "context": "head" }
  ],
  "html": [ "ccm.load", "./templates.mjs" ],
  "src": basic
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "html": [ "ccm.load", "https://ccmjs.github.io/akless-components/config_builder/resources/comment/templates.mjs" ],
  "src": basic
};