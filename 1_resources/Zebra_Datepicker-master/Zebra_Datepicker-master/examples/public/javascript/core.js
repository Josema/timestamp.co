var datepicker;
$(document).ready(function() {




    datepicker = $('#datepicker-example1').Zebra_DatePicker({
        show_clear_date: false,
        //show_week_number: true,
        select_other_months: true,
        custom_icon: $('#myicon'),
        onSelect: function(a, b, c, d) {
            console.log(a, b, c, d);
            return false;
        }
    });
    datepicker.hide();


});