var Notifications = function () {

    var notifications = []
    var pending_notifications = [];

    var push = function (n) {
        pending_notifications.push(n);

        $("#m_topbar_notification_icon .m-nav__link-icon").addClass("m-animate-shake"), $("#m_topbar_notification_icon .m-nav__link-badge").addClass("m-badge")  /*m-animate-blink*/

        setTimeout(function () {
            $("#m_topbar_notification_icon .m-nav__link-icon").removeClass("m-animate-shake"), $("#m_topbar_notification_icon .m-nav__link-badge").removeClass("m-badge")
        }, 3e3)
    };

    var events = {
        init: function () {

            $("#m_topbar_notification_icon").click(function () {
                if (pending_notifications.length == 0 && open) {
                    setTimeout(function () {
                        $(".m-list-timeline__item.new").removeClass("new");
                    }, 3e3)
                }
            })
        }
    }

    var load = {
        init: function () {
            $.ajax({
                type: "GET",
                url: "/notification/get",
                success: function (data) {
                    notifications = data.result;

                    $("#number-notification").text(data.pending);

                    var div = $("#topbar_notifications_notifications .m-scrollable #mCSB_1_container");

                    if (notifications.length <= 0) {
                        $(".m-list-timeline.m-list-timeline--skin-light").remove();

                        div.prepend(
                            "<div class='m-stack m-stack--ver m-stack--general' style='min-height: 180px;'>" +
                            "<div class='m-stack__item m-stack__item--center m-stack__item--middle'>" +
                            "<span>All caught up!<br>No new logs.</span>" +
                            "</div>" +
                            "</div>"
                        );
                    }
                    else {
                        $.each(notifications, function (key, value) {
                            $(".m-list-timeline__items")
                                .append(
                                    "<div class='m-list-timeline__item" + (value.readed == true ? ' m-list-timeline__item--read' : '') + "'>" +
                                    "<span class='m-list-timeline__badge'></span>" +
                                    "<span class='m-list-timeline__text'>" + (value.url != '' ? "<a href='/redirect/" + value.id + "' class='m-link'>" : '') + value.text + "</a>" + (value.state_text != '' ? " <span class='m-badge " + value.background_state_class + " m-badge--wide'>" + value.state_text + "</span>" : '') + "</span>" +
                                    "<span class='m-list-timeline__time'>" + value.date + "</span>" +
                                    "</div>");
                        })
                    }
                },
                complete: function () {
                }
            });
        }
    };

    var load_slopes = function () {

        if (notifications.length == 0) {

            var div = $("#topbar_notifications_notifications .m-scrollable #mCSB_1_container");

            $("#topbar_notifications_notifications .m-stack--ver.m-stack--general").remove();

            div.prepend(
                "<div class='m-list-timeline m-list-timeline--skin-light'>" +
                "<div class='m-list-timeline__items'></div>" +
                "</div>"
            );
        }

        $.ajax({
            type: "GET",
            url: "/notification/noreaded/count/get",
            success: function (data) {
                $("#number-notification").text(data);
            }
        });

        $.each(pending_notifications, function (key, value) {
            notifications.unshift(value);
            $("#topbar_notifications_notifications .m-list-timeline__items")
                .prepend(
                    "<div class='m-list-timeline__item new" + (value.readed == true ? ' m-list-timeline__item--read' : '') + "'>" +
                    "<span class='m-list-timeline__badge'></span>" +
                    "<span class='m-list-timeline__text'>" + (value.url != '' ? "<a href='/redirect/" + value.id + "' class='m-link'>" : '') + value.text + "</a>" + (value.state_text != '' ? " <span class='m-badge " + value.background_state_class + " m-badge--wide'>" + value.state_text + "</span>" : '') + "</span>" +
                    "<span class='m-list-timeline__time'>" + value.date + "</span>" +
                    "</div>");
        })

        pending_notifications = [];
        $(".m-scrollable").animate({ scrollTop: 0 }, 'slow');
        $("#mCSB_1_container").animate({ top: 0 });
        $("#mCSB_1_dragger_vertical").animate({ top: 0 });
    };

    return {
        init: function () {
            events.init();
            load.init()
        },
        load_slopes: load_slopes,
        push: push
    }
}();

$(function () {
    Notifications.init();
});