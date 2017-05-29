function AccessionIdentifiers(new_record) {
    this.ids = $('div.identifier-fields');
    this.ids.addClass('form-inline');
    this.id_0 = $('#accession_id_0_');
    this.id_2 = $('#accession_id_2_');

    this.new_record = new_record;
}


AccessionIdentifiers.prototype.disable = function($field) {
    $field.attr('readonly', 'readonly');
    $field.attr('tabindex', '-1');
    $field.on("focus", function(e) {
        $(this).blur();
        e.stopPropagation();
    });

    $field.on("change", function(e) {
        e.stopPropagation();
    });
}


AccessionIdentifiers.prototype.init = function () {
    var self = this;

    if (self.new_record) {
        self.ids.removeClass('required');
        self.disable(self.id_0);
        self.disable(self.id_2);


        if (!self.id_2.val().length) {
            self.id_2.val('XXXX');
        }

        var date = $('#accession_accession_date_').val();
        if (date.length) {
            self.update_fiscal_year(date);
        }

        // Whenever the accession date changes, update id_0 with the fiscal year
        var $fld = $('input#accession_accession_date_');

        $fld.change( function(event) {
            self.update_fiscal_year($fld.val());
        });

        var $btn = $fld.next('button');

        $btn.datepicker().on("changeDate", function() {
            self.update_fiscal_year($fld.val());
        });
    }


    $('#accession_id_3_').hide();
    self.load_department_codes();
};


AccessionIdentifiers.prototype.load_department_codes = function () {
    $.ajax({
        url: APP_PATH + "plugins/yale_accessions/department_codes",
        data: {},
        dataType: 'json',
        type: "GET",
        success: function(department_list) {
            var codes = department_list.codes;
            var current_code = $('#accession_id_1_').val();

            // Deprecated department codes
            if (current_code.length && $.inArray(current_code, codes) < 0) {
                codes.push(false);
                codes.push(current_code);
            }

            if (codes.length > 1) {
                var html = "<select id=\"accession_id_1_\" class=\"form-control\" name=\"accession[id_1]\">";
                $.each(codes, function(i, code) {
                    if (code == current_code) {
                        html += "<option value=\"" + code + "\" selected=\"selected\">" + code + "</option>";
                    } else if (code == false) {
                        html += "<option disabled>&#9472;</option>";
                    } else {
                        html += "<option value=\"" + code + "\">" + code + "</option>";
                    }

                });

                html += "</select>"
                $('#accession_id_1_').replaceWith(html);
            } else if (codes.length == 1) {
                $('#accession_id_1_').val(codes[0]);
                $('#accession_id_1_').removeAttr('disabled');
                self.disable($('#accession_id_1_'));
            } else {
                $('#accession_id_1_').attr('disabled', 'disabled');
            }
        },
    });
};


AccessionIdentifiers.prototype.update_fiscal_year = function (date_string) {
    if (!date_string) {
        this.id_0.val('');
        return;
    }

    var year = parseInt(date_string.substr(0, 4));
    var month = parseInt(date_string.substr(5, 2));

    var fyear = (month > 6 && year + 1) || year;

    this.id_0.val(fyear);
};
