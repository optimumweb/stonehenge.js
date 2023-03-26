(function($) {
    $.fn.stonehenge = function (options) {
        options = $.extend({
            speed: 1.0,
            autoscroll: false,
            autoscrollSpeed: 25,
            autoscrollPeriod: 250,
            autoscrollEasing: 'linear',
        }, options);

        return this.each(function () {
            let $stonehenge = $(this);

            // options
            let speed = $stonehenge.data('stonehenge-speed') || options.speed,
                autoscroll = $stonehenge.data('stonehenge-autoscroll') || options.autoscroll,
                autoscrollSpeed = $stonehenge.data('stonehenge-autoscroll-speed') || options.autoscrollSpeed,
                autoscrollPeriod = $stonehenge.data('stonehenge-autoscroll-period') || options.autoscrollPeriod,
                autoscrollEasing = $stonehenge.data('stonehenge-autoscroll-easing') || options.autoscrollEasing;

            // state
            let isGrabbed = false,
                initialX,
                scrollLeft;

            $stonehenge
                .on('mousedown', function (e) {
                    isGrabbed = true;
                    $stonehenge.addClass('is-grabbed');
                    initialX = e.pageX - this.offsetLeft;
                    scrollLeft = this.scrollLeft;
                })
                .on('mouseleave', function (e) {
                    isGrabbed = false;
                    $stonehenge.removeClass('is-grabbed');
                })
                .on('mouseup', function (e) {
                    isGrabbed = false;
                    $stonehenge.removeClass('is-grabbed');
                })
                .on('mousemove', function (e) {
                    if (! isGrabbed) return;
                    e.preventDefault();
                    let x = e.pageX - this.offsetLeft;
                    let walk = (x - initialX) * speed;
                    this.scrollLeft = scrollLeft - walk;
                });

            if (autoscroll) {
                let autoscrollDelta = autoscrollSpeed * autoscrollPeriod / 1000;

                setInterval(function () {
                    if (! isGrabbed) {
                        $stonehenge.animate({
                            scrollLeft: this.scrollLeft + autoscrollDelta
                        }, autoscrollPeriod, autoscrollEasing);
                    }
                }, autoscrollPeriod);
            }
        });
    };
}(jQuery));
