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
            let $stonehenge = $(this),
                speed = options.speed || $stonehenge.data('stonehenge-speed') || 1.0,
                autoscroll = options.autoscroll || $stonehenge.data('stonehenge-autoscroll'),
                autoscrollSpeed = options.autoscrollSpeed || $stonehenge.data('stonehenge-autoscroll-speed'),
                autoscrollPeriod = options.autoscrollPeriod || $stonehenge.data('stonehenge-autoscroll-period'),
                autoscrollEasing = options.autoscrollEasing || $stonehenge.data('stonehenge-autoscroll-easing'),
                isGrabbed = false,
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
