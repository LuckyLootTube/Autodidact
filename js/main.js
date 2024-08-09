$(window).load(function(){
    $('.preloader').fadeOut('slow');
});

/* =Main INIT Function
-------------------------------------------------------------- */
function initializeSite() {

    "use strict";

    //OUTLINE DIMENSION AND CENTER
    (function() {
        function centerInit(){

            var sphereContent = $('.sphere'),
                sphereHeight = sphereContent.height(),
                parentHeight = $(window).height(),
                topMargin = (parentHeight - sphereHeight) / 2;

            sphereContent.css({
                "margin-top" : topMargin+"px"
            });

            var heroContent = $('.hero'),
                heroHeight = heroContent.height(),
                heroTopMargin = (parentHeight - heroHeight) / 2;

            heroContent.css({
                "margin-top" : heroTopMargin+"px"
            });

        }

        $(document).ready(centerInit);
        $(window).resize(centerInit);
    })();

    // Init effect 
    $('#scene').parallax();

};
/* END ------------------------------------------------------- */

/* =Document Ready Trigger
-------------------------------------------------------------- */
$(window).load(function(){

    initializeSite();
    (function() {
        setTimeout(function(){window.scrollTo(0,0);},0);
    })();

});

/* Calculate the next bi-weekly Sunday at 19:00 GMT+1 (even weeks) */
function getNextEventDate() {
    var now = new Date();
    var dayOfWeek = now.getDay();
    var daysUntilSunday = (7 - dayOfWeek) % 7;
    var nextSunday = new Date(now);
    nextSunday.setDate(nextSunday.getDate() + daysUntilSunday);
    nextSunday.setHours(19, 0, 0, 0);

    // Check if we need to add 7 days to get to the next even week
    var referenceDate = new Date(2024, 7, 11); // August 11, 2024 is a known event date (even week)
    var weeksBetween = Math.floor((nextSunday - referenceDate) / (1000 * 60 * 60 * 24 * 7));

    if (weeksBetween % 2 !== 0) {
        nextSunday.setDate(nextSunday.getDate() + 7);
    }

    return nextSunday;
}

/* Initialize the countdown */
function initializeCountdown() {
    var nextEventDate = getNextEventDate();
    
    $('#countdown').countdown({
        date: nextEventDate,
        render: function(data) {
            var el = $(this.el);
            // Ensure seconds don't show as 60
            var seconds = data.sec >= 60 ? 0 : this.leadingZeros(data.sec, 2);
            var minutes = this.leadingZeros(data.min, 2);

            el.empty()
                .append("<div>" + this.leadingZeros(data.days, 2) + " <span>days</span></div>")
                .append("<div>" + this.leadingZeros(data.hours, 2) + " <span>hrs</span></div>")
                .append("<div>" + minutes + " <span>min</span></div>")
                .append("<div>" + seconds + " <span>sec</span></div>");
        },
        onEnd: function() {
            setTimeout(function() {
                initializeCountdown();
            }, 3600000); // 1 hour after the countdown ends
        }
    });
}

$(document).ready(function() {
    initializeCountdown();
});
