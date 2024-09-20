function AccessionIdentifiers(new_record) {
    this.ids = $('div.identifier-fields');
    this.ids.addClass('form-inline');
    this.id_0 = $('#accession_id_0_');
    // UMD Customization
    this.id_1 = $('#accession_id_1_');
    this.id_2 = $('#accession_id_2_');
    this.id_3 = $('#accession_id_3_');
    // End UMD Customization

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
        // UMD Customization
        self.ids.removeClass('required');
        self.disable(self.id_0);
        self.disable(self.id_1);

        if (!self.id_1.val().length) {
          self.id_1.removeAttr('disabled');
          self.id_1.val('XXXX');
        }
        // End UMD Customization

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

    // UMD Customization
    // $('#accession_id_3_').hide();
    // End UMD Customization
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
            // UMD Customization
            var current_code = $('#accession_id_2_').val();
            // End UMD Customization

            // Deprecated department codes
            if (current_code.length && $.inArray(current_code, codes) < 0) {
                codes.push(false);
                codes.push(current_code);
            }

            if (codes.length > 1) {
                // UMD Customization
                var html = "<select id=\"accession_id_2_\" class=\"form-control\" name=\"accession[id_2]\">";
                // End UMD Customization
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
                // UMD Customization
                $('#accession_id_2_').replaceWith(html);
                $('#accession_id_3_').removeAttr('disabled');
                // End UMD Customization
            } else if (codes.length == 1) {
                // UMD Customization
                $('#accession_id_2_').val(codes[0]);
                $('#accession_id_2_').removeAttr('disabled');
                self.disable($('#accession_id_2_'));
                $('#accession_id_3_').removeAttr('disabled');
                // End UMD Customization
            } else {
                // UMD Customization
                $('#accession_id_2_').attr('disabled', 'disabled');
                // End UMD Customization
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
