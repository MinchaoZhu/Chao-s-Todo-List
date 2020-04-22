(function ($) {
    'use strict';
    $(function () {
        var todoListItem = $('.todo-list');
        var todoListInput = $('.todo-list-input');
        $('.todo-list-add-btn').on("click", function (event) {
            event.preventDefault();

            var item = $(this).prevAll('.todo-list-input').val();

            if (item) {
                var newItem = $("<li/>").addClass("todoItem").attr("content", item).attr("status", "1");
                newItem.append("<div class='form-check'><label class='form-check-label'><input class='checkbox sync' type='checkbox' />" + item + "<i class='input-helper'></i></label></div><i class='remove mdi mdi-close-circle-outline sync'></i>");
                todoListItem.append(newItem);
                todoListInput.val("");
            }

        });

        todoListItem.on('change', '.checkbox', function () {
            if ($(this).attr('checked')) {
                $(this).removeAttr('checked');
            } else {
                $(this).attr('checked', 'checked');
            }

            $(this).closest("li").toggleClass('completed');
            var preStatus = $(this).closest("li").attr("status");
            $(this).closest("li").attr("status", (preStatus==1)?2:1);
            sync();
        });

        todoListItem.on('click', '.remove', function () {
            $(this).parent().remove();
            sync();
        });

    });
})(jQuery);