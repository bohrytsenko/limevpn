$( document ).ready(function() {

    // Accordion open

    $('.home_list__title a').click(function(){
        $('.home_list__title').toggleClass('list_open');
        $('.accordion').toggleClass('accordion_hidden');
    });

    // Choose box

    $(".home_os__list label").on('change', function () {
        $(this).toggleClass("label_choose");
    });

    $(".home_protocall__list label").on('change', function () {
        $(this).toggleClass("label_choose");
    });

    // Accordion

    (function($) {
        $('.accordion > li:eq(0) a').addClass('').next().slideDown();

        $('.accordion a').click(function(j) {
            var dropDown = $(this).closest('li').find('p');

            $(this).closest('.accordion').find('p').not(dropDown).slideUp();

            if ($(this).hasClass('')) {
                $(this).removeClass('');
            } else {
                $(this).closest('.accordion').find('a.active').removeClass('');
                $(this).addClass('');
            }

            dropDown.stop(false, true).slideToggle();

            j.preventDefault();
        });
    })(jQuery);


    // Hidden congratulation

    $('.congratulation_help__skip a').click(function(){
        $('.congratulation').addClass('hidden');
    });

    // Navigation toggle

    $(".navigation").hover(function () {
        $(this).toggleClass('navigation__full');
        $('.navigation__bottom').toggleClass('hidden_nav_bottom');
        $('.navigation_top ul li a span').toggleClass('hidden_span');
        $('.navigation_top ul li').toggleClass('swipe_list');
        $('.navigation_top__logo').toggleClass('logo_change');
    });

    // Home data id

    $('.home_item_top').click(function(e){
        $('.home_item_top').removeClass('color_green');
        $('.home_item_top').addClass('color_grey');
        $(this).addClass('color_green');
        $(this).removeClass('color_grey');
        $('.home_left__block').hide();
        $('#'+$(this).attr('data-related')).show();
        //This is also valid
        //$('#'+$(this).data('related')).show();
        e.preventDefault();
    });

    // Products data id

    $('.product_item').click(function(e){
        $('.product_text').addClass('hidden');
        $('.product_item').removeClass('active');
        $(this).addClass('active');
        $('.manage_item').hide();
        $('#'+$(this).attr('data-related')).show();
        //This is also valid
        //$('#'+$(this).data('related')).show();
        e.preventDefault();
    });

    // Products stat data id

    $('select').change(function(){
        $('.add_stats_list').hide();
        $('#' + $(this).val()).show();
    });

    // Product help accordion

    $('.product_help .accordion a').click(function(){
        $('.product_help .accordion a').removeClass('accordion_active');
        $(this).toggleClass('accordion_active');
    });

    // Product help close

    $('.product_help__close').click(function(){
        $('.product_help').fadeOut(300);
    });

});