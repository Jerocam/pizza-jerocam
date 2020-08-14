/*eslint-env browser*/

function orderPizza () {
"use strict";

    //FUNCTION TO CREATE NEW ELEMENTS TO LOAD PIZZAS SIZES
    let loadSizes = function (){
        let optHand = '<option value="9.99" selected>Small ($9.99)</option>'+'<option value="12.99">Medium ($12.99)</option>'+'<option value="14.99">Large ($14.99)</option>';
        let optThin = '<option value="11.99" selected>Medium ($11.99)</option>'+'<option value="13.99">Large ($13.99)</option>';
        let optNY = '<option value="16.99" selected>Large ($16.99)</option>'+'<option value="19.99">Extra Large ($19.99)</option>';
        let optGF = '<option value="10.99" selected>Small ($10.99)</option>';
        let newSizes = [optHand, optThin, optNY, optGF];
        return newSizes;
    }

    //FUNCTION TO CREATE NEW ELEMENTS TO LOAD PIZZAS CHEESES
    let loadCheeses = function(){
        let optCheeses = '<option value="0" selected>Normal (default): no charge</option>'+ 
        '<option value="0">Light: no charge</option>'+
        '<option value="2.99">Extra: +$2.99</option>'+
        '<option value="3.99">Double: +$3.99</option>';
        return optCheeses;
    }

    //FUNCTION TO CREATE NEW ELEMENTS TO LOAD PIZZAS SAUCES
    let loadSauces = function (){
        let optSauces = '<option value="0" selected>Regular Tomato: no charge</option>'+
        '<option value=".99">Hearty Tomato: +$.99</option>'+
        '<option value="2.99">Extra: +$2.99</option>'+
        '<option value="1.99">BBQ Sauce: +$1.99</option>';
        return optSauces;
    }

    //FUNCTION TO CALL AND LOAD PIZZAS (SAUCE AND CHEESE)
    let loadPizza = function (){
        "use strict";

        let cheese = loadCheeses();
        $('#selectCheese').html(cheese);

        let sauce = loadSauces();
        $('#selectSauce').html(sauce);
    }

    //FUNCTION TO CREATE/LOAD NEW OPTIONS OF STATES BY JSON FILE
    let loadStates = function (){
        "use strict";

        $.getJSON("../data/listStates.json", function(result) {
            $.each(result, function() {
                $.each(this, function(key, value) {
                    $("#inputState").append(
                        '<option>' +value.abbreviation+ '</option>'
                    );
                    $("#inputState2").append(
                        '<option>' +value.abbreviation+ '</option>'
                    );
                });
            }); 
    
        });
    }

    //FUNCTION TO ADD/SUM OR SUBSTRACT TOPPINGS BY EACH $.99
    let getToppingsTotal = function () {
        "use strict";
        let form = this.form;
        let valTopp = parseFloat( form.elements['topp'].value );

        if ( this.checked == true ) {
            valTopp += parseFloat(this.value);
        } else {
            valTopp -= parseFloat(this.value);
        }
        
        form.elements['topp'].value = valTopp;
        updatePizzaTotal(form);
    }

    //FUNCTION TO UPDATE TOTAL OF PIZZA 
    let updatePizzaTotal = function (form) {
        "use strict";
        let sz_p = parseFloat( form.elements['sz_pizza'].value );
        let op_ch = parseFloat( form.elements['op_cheese'].value );
        let op_sa = parseFloat( form.elements['op_sauce'].value );
        let topp = parseFloat( form.elements['topp'].value );
        let all = sz_p + topp + op_ch + op_sa;
        let alltax = all * .10;
        form.elements['subtotal'].value = '$'+ all.toFixed(2);
        form.elements['tax'].value = '$'+ alltax.toFixed(2);
        form.elements['total'].value = '$'+ (all + alltax).toFixed(2);
    }

    //FUNCTION TO VALIDATE THE FIELDS OF PERSONAL INFO 
    let validateFields = function () {
        "use strict";

        //GET VALUES AND STORE VARIABLES, AND FORMAT FIELDS
        let fNames = $('#inputFirst').val().trim();
        let lNames = $('#inputLast').val().trim();
        let email = $('#inputEmail').val().trim();
        let phone = $('#inputPhone').val().trim();
        let address = $('#inputAddress').val().trim();
        let address2 = $('#inputAddress2').val().trim();
        let city = $('#inputCity').val().trim();
        let state = $('#inputState').val();
        let zip = $('#inputZip').val().trim();
        
        //GET VALID FOR CONFIRMING THE FORM
        let isValid = true;

        //MESSAGES
        let msg = " This field is required";
        let error = " Invalid Input";
        
        //FORMAT FIELDS
        let fnamesFormat = /^[a-zA-Z\s]*$/;
        let lnamesFormat = /^[a-zA-Z\s]*$/;
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let phoneformat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        let addressformat = /^\s*\S+(?:\s+\S+){2}/;
        let cityformat = /^[a-zA-Z\s]*$/;
        let zipformat = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

        //FIRST NAME FIELD
        if (fNames==""){
            $('#inputFirst').attr("required", true);
            $('#l1 span').next().text(msg);
            isValid = false;}
        else { 
            if (!fnamesFormat.test(fNames)){ 
            alert("First Name: Invalid Input! Please enter only letters");
            $('#l1 span').next().text(error);
            $('#inputFirst').focus();
            isValid = false;}
            else { $('#inputFirst').attr("required", false);
                $('#l1 span').next().text("");
            }
        }

        //LAST NAME FIELD
        if (lNames==""){
            $('#inputLast').attr("required", true);
            $('#l2 span').next().text(msg);
            isValid = false; }
        else { 
            if (!lnamesFormat.test(lNames)){
            alert("Last Name: Invalid Input! Please enter only letters");
            $('#l2 span').next().text(error);
            $('#inputLast').focus();
            isValid = false;}
            else { $('#inputLast').attr("required", false);
              $('#l2 span').next().text("");
            }
        }
        
        //EMAIL FIELD
        if (email==""){
            $('#inputEmail').attr("required", true);
            $('#l3 span').next().text(msg);
            isValid = false; }
        else { 
            if (!mailformat.test(email)){
            alert("Email: Invalid Input! Please enter your email");
            $('#l3 span').next().text(error);
            $('#inputEmail').focus();
            isValid = false;}
            else { $('#inputEmail').attr("required", false);
               $('#l3 span').next().text("");
            }
        }
        
        //PHONE FIELD
        if (phone==""){
            $('#inputPhone').attr("required", true);
            $('#l4 span').next().text(msg);
            isValid = false; }
        else { 
            if (!phoneformat.test(phone)){
            alert("Phone: Invalid Input! Please enter your phone number");
            $('#l4 span').next().text(error);
            $('#inputPhone').focus();
            isValid = false;}
            else { $('#inputPhone').attr("required", false);
                $('#l4 span').next().text("");
            }
        }

        //ADDRESS TYPE FIELD
        if($('#inputType option:selected').prop('disabled')){
            $('#inputType').attr("required", true);
            $('#l5 span').next().text(msg);
            isValid = false; }
        else {
            $('#inputType').attr("required", false);
            $('#l5 span').next().text("");
        }
        
        //ADDRESS FIELD
        if (address==""){
            $('#inputAddress').attr("required", true);
            $('#l6 span').next().text(msg);
            isValid = false;}       
        else { 
            if (!addressformat.test(address)){
                alert("Address: Invalid Input! Please enter your specified address");
                $('#inputAddress').focus();
                $('#l6 span').next().text(error);
                isValid = false;}
            else { $('#inputAddress').attr("required", false);
               $('#l6 span').next().text("");
            }
        }

        //OPTIONAL ADDRESS FIELD
        if (isNaN(address2)){
            alert("Opt. Address: Invalid Input! Please enter your apt number");
            $('#inputAddress2').focus();
            $('#l10 span').text(error);
            isValid = false;}
        
        //CITY FIELD
        if (city==""){
                $('#inputCity').attr("required", true);
                $('#l7 span').next().text(msg);
                isValid = false; }
        else { 
            if (!cityformat.test(city)){
                alert("City: Invalid Input! Please enter only letters");
                $('#inputCity').focus();
                $('#l7 span').next().text(error);
                isValid = false;}
            else { $('#inputCity').attr("required", false); 
               $('#l7 span').next().text("");
            }
        }

        //STATE FIELD
        if($('#inputState option:selected').prop('disabled') == true){
                $('#inputState').attr("required", true);
                $('#l8 span').next().text(msg);
                isValid = false; }
        else {
            $('#inputState').attr("required", false);
            $('#l8 span').next().text("");
        }

        //ZIP FIELD
        if (zip==""){
                $('#inputZip').attr("required", true);
                $('#l9 span').next().text(msg);
                isValid = false; }
        else {
            if (!zipformat.test(zip)){
                alert("Invalid Input! Please enter your specified zip code");
                $('#l9 span').next().text(error);
                $('#inputZip').focus();
                isValid = false;}
            else { $('#inputZip').attr("required", false); 
                $('#l9 span').next().text("");
            }
        }

        let newArrays = [isValid, fNames, lNames, address, address2, city, state ,zip]; 
        return newArrays;
    }

    //FUNCTION TO PROCESS THE PIZZA SIZE RADIO OPTIONS, AND CHECK IF ISVALID IS TRUE OR FALSE 
    let finalProcess = function (){

        let isValid = validateFields(); //CALL THE FUNCTION FOR PASSING ISVALID (TRUE OR FALSE)

        // IF ISVALID IS TRUE, IT APPROVES TO SUBMIT THE FORM
        if (isValid[0] == false){
            event.preventDefault();
            alert('INCOMPLETED FIELDS! Please enter the required fields');
        }
        else {
            if(!$("input[type='radio']").is(':checked')){
                $('#radSizes input').attr("required", true);
                $('.req3 span').next().text("Required");
                alert('Please Select Pizza Dough Options');
                return false;
            }
            else {
                $('.req3 span').next().text("");
                let accept = window.confirm('Are you sure?');
                if (accept) {
                    // $( "#pizzaForm" ).submit();
                    event.preventDefault();
                    $('#billPizza, #fhr').show();
                    window.scrollTo(0, 1500);
                    $('#pizzaForm input, #pizzaForm select, #btnFinish').attr('disabled', true);
                }
                else { alert("Alright, you can edit or cancel your order"); 
                event.preventDefault();
                $('#pinfo input[type="text"], #pinfo select, #pinfo input[type="button"]').attr('disabled', false);
                }
                 
            }
        }
    }
    
    //FUNCTION BILL ADDRESS
    let billAddress = function () {
        "use strict";

        let fNames2 = $('#inputFirst2').val().trim();
        let lNames2 = $('#inputLast2').val().trim();
        let addressA = $('#inputAddressA').val().trim();
        let address2B = $('#inputAddress2B').val().trim();
        let city2 = $('#inputCity2').val().trim();
        let zip2 = $('#inputZip2').val().trim();
        let isValid = true;
        let msg2 = "This field is required";
        let fnamesFormat2 = /^[a-zA-Z\s]*$/;
        let lnamesFormat2 = /^[a-zA-Z\s]*$/;
        let addressFormat2 = /^\s*\S+(?:\s+\S+){2}/;
        let cityformat2 = /^[a-zA-Z\s]*$/;
        let zipformat2 = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

        //FIRST NAME FIELD
        if (fNames2==""){
            $('#inputFirst2').attr("required", true);
            $('#lbl1 span').next().text(msg2);
            isValid = false;}
        else { 
            if (!fnamesFormat2.test(fNames2)){ 
            alert("First Name: Invalid Input! Please enter only letters");
            $('#inputFirst2').focus();
            isValid = false;}
            else { $('#inputFirst2').attr("required", false);
                $('#lbl1 span').next().text("");
            }
        }

        //LAST NAME FIELD
        if (lNames2==""){
            $('#inputLast2').attr("required", true);
            $('#lbl2 span').next().text(msg2);
            isValid = false; }
        else { 
            if (!lnamesFormat2.test(lNames2)){
            alert("Last Name: Invalid Input! Please enter only letters");
            $('#inputLast2').focus();
            isValid = false;}
            else { $('#inputLast2').attr("required", false);
              $('#lbl2 span').next().text("");
            }
        }

        //ADDRESS FIELD
        if (addressA==""){
            $('#inputAddressA').attr("required", true);
            $('#lbl3 span').next().text(msg2);
            isValid = false;}       
        else { 
            if (!addressFormat2.test(addressA)){
                alert("Address: Invalid Input! Please enter your specified address");
                $('#inputAddressA').focus();
                isValid = false;}
            else { $('#inputAddressA').attr("required", false);
               $('#lbl3 span').next().text("");
            }
        }

        //OPTIONAL ADDRESS FIELD
        if (isNaN(address2B)){
            alert("Opt. Address: Invalid Input! Please enter your apt number");
            $('#lbl4 span').next().text("Invalid");
            $('#inputAddress2B').focus();
            isValid = false;}

        //CITY FIELD
        if (city2==""){
            $('#inputCity2').attr("required", true);
            $('#lbl5 span').next().text(msg2);
            isValid = false; }
        else { 
            if (!cityformat2.test(city2)){
                alert("City: Invalid Input! Please enter only letters");
                $('#inputCity2').focus();
                isValid = false;}
            else { $('#inputCity2').attr("required", false); 
            $('#lbl5 span').next().text("");
            }
        }

        //STATE FIELD
        if($('#inputState2 option:selected').prop('disabled') == true){
            $('#inputState2').attr("required", true);
            $('#lbl5 span').next().text(msg2);
            isValid = false; }
        else {
        $('#inputState2').attr("required", false);
        $('#lbl5 span').next().text("");
        }

        if (zip2==""){
            $('#inputZip2').attr("required", true);
            $('#lbl6 span').next().text(msg2);
            isValid = false; }
        else {
        if (!zipformat2.test(zip2)){
            alert("Invalid Input! Please enter your specified zip code");
            $('#inputZip2').focus();
            isValid = false;}
        else { $('#inputZip2').attr("required", false); 
            $('#lbl6 span').next().text("");}
        }

        return isValid;

    }

    // FUNCTION FOR COPYING THE ADDRESS ABOVE
    let sameAddress = function(){
        "use strict";

        //SAME ADDRESS CHECKBOX
        let info = validateFields();    //CALL THE FUNCION FOR PASSING VALUES TO EACH FIELD
        $('#inputFirst2').val(info[1]);
        $('#inputLast2').val(info[2]);
        $('#inputAddressA').val(info[3]);
        $('#inputAddress2B').val(info[4]);
        $('#inputCity2').val(info[5]);
        $('#inputState2').val(info[6]);
        $('#inputZip2').val(info[7]);
    }

    //FUNCTION FOR MATCHING CREDIT CARD TYPES
    let cardType = function (cardNumber) {

        let readType;
       
        //VISA
        readType = new RegExp("^4");
        if (cardNumber.match(readType) != null)
            return "Visa";

        //MASTERCARD
        readType = new RegExp("^5[1-5]");
        if (cardNumber.match(readType) != null)
            return "Mastercard";

        //AMERICAN EXPRESS
        readType = new RegExp("^3[47]");
        if (cardNumber.match(readType) != null)
            return "AMEX";

        return "Other"  //OTHER TYPE;
    }
    
    //FUNCTION TO VALID CREDIT CARD FIELDS
    let validCard = function (){
        "use strict";
        let newCredit = $('#inputCredit').val().trim();        
        let newCode = $('#inputCode').val().trim();
        let newExp = $('input[type="month"]').val();
        let d = new Date();
        let month = d.getMonth();
        let year = d.getFullYear();
        let today = new Date(year, month); 
        let afterToday = new Date(newExp);
        let isValid = true;
        let msg = "Required";
        let newCodeFormat = /^[0-9]{3,4}$/;
        let done = ' Valid ✓';
        let creditNumb = newCredit.toString().replace(/\-/g, '').replace(/\s/g, '');
        let type = cardType(creditNumb);
        let sum = 0;
        let checking = false;
        
        if (newCredit==""){
            $('#inputCredit').attr("required", true);
            $('#crlbl span').next().text(msg).css('color', 'orange');
            isValid = false }
        else {
            //CREDIT CARD FORMAT AND VALID IT
            for (let i = creditNumb.length - 1; i >= 0; i--) {
                let digit = parseInt(creditNumb.charAt(i));
                if (checking) {
                    if ((digit*2) > 9) { sum +=( digit*2)-9; }
                    else { sum += digit*2; }
                }
                else { sum += digit; }
    
                checking =! checking;
            }

            if ((sum % 10) == 0) {  //TRUE
                    $('#crlbl span').next().text(done+ "- " +type).css('color', 'green');
                    $('#inputCredit').css("border", "1px solid green");
                }
            else {  //FALSE
                alert("Error! Invalid Credit Card");
                isValid = false;
                $('#crlbl span').next().text('Invalid').css("color", "orange");
                $('#inputCredit').focus().css("border", "1px solid orange");}
        }

        if (newCode==""){   //CCV
            $('#inputCode').attr("required", true);
            $('#colbl span').next().text(msg).css('color', 'orange');
            isValid = false; }
        else {
            if (!newCodeFormat.test(newCode)){
                alert("Invalid Input! Please enter your 3 or 4 code numbers");
                $('#colbl span').next().text('Invalid').css('color', 'orange');
                $('#inputCode').focus();
                isValid = false;}
            else {  $('#inputCode').attr("required", false); 
                    $('#colbl span').next().text(done).css('color', 'green');
            }
        }

        if (newExp == 0){   //EXPIRATION DATE
            $('#inputExp').attr("required", true);
            $('#exlbl span').next().text(msg); 
            isValid = false; }
        else {
            if (afterToday < today){
                alert("Invalid! It cannot be Today or less than Today");
                $('#exlbl span').next().text('Invalid').css('color', 'orange'); 
                $('#inputExp').focus();
                isValid = false;}
            else {  $('#inputExp').attr("required", false); 
                    $('#exlbl span').next().text(done).css('color', 'green');
            }
        }

        // // IF ISVALID IS TRUE, IT APPROVES TO SUBMIT THE FORM
        let isValid2 = billAddress();   //CALL THE FUNCTION FOR PASSING TRUE OR FALSE 

        if(isValid2 == false){
            alert("INCOMPLETED FIELDS! Please enter your bill information fields");
            event.preventDefault();
        }
        else if (isValid == false){
            alert("INCOMPLETED FIELDS! Please enter your credit card fields");
            event.preventDefault();
        }
        else {  //FINAL SUBMIT OF THE LAST FORM
            alert("Approved! Thank you for ordering it")
            $("#billConfirm").submit();    
        }
    }
        
    return {
        cardType, validCard, sameAddress, billAddress, finalProcess, validateFields, updatePizzaTotal, getToppingsTotal, loadPizza, loadSizes, loadStates
    }
}

//NEW VARIABLE TO CALL/ACCESS THE FUNCTION ORDERPIZZA
let newOrder = orderPizza();

$(document).ready(function () {
"use strict";
        
    //OPTIONAL TO ADD SPANS FOR DISPLAYING REQUIRED FIELDS
    $('.req, .req2, .req3, .req4').append('<span> *</span>').append('<span></span>');
    $('.opt').append('<span> </span>');

    //OPTIONAL TO FOCUS FIRST NAME FIELD BY STARTING THE PAGE
    $('#inputFirst').focus();

    //OPTIONAL - DISABLE CHECKBOX BEFORE CLICK RADIO SIZE BUTTON
    $('#pizza_toppings input[type="checkbox"]').attr('disabled', true);

    $('#build').hide(); //OPTIONAL - HIDE UNTIL SUBMIT THE DELIVER INFO FORM

    //BUTTON TO SUBMIT THE DELIVER INFO FORM
    $("#submFields").click(function(e){
        let isValid = newOrder.validateFields();
        if(isValid[0]==true){ 
            $('#build').show();
            $('#pinfo input[type="text"], #pinfo select, #pinfo input[type="button"]').attr('disabled', true);
            window.scrollTo(0, 500);   
        }
    });
    
    //RADIO BUTTONS TO CHANGE DIFFERENT PIZZAS SIZES BY HAND, THIN, GF AND NY
    $("#radSizes input:radio").change(function() {

        $('#pizza_toppings input[type="checkbox"]').attr('disabled', false);
        
        newOrder.loadPizza();
       
        let form = document.getElementById('pizzaForm');
        
        let pizzaSizes = newOrder.loadSizes();  //TO LOAD DIFFERENT PIZZAS SIZES

        if ($("input[title='hand']").is(':checked')){   //HAND TOSSED
            $('#selectSizes').html(pizzaSizes[0]);
            form.elements['sz_pizza'].value = $('#selectSizes').val();
            newOrder.updatePizzaTotal(form);
        }
        else if ($("input[title='thin']").is(':checked')){  //THIN CRUST
            $('#selectSizes').html(pizzaSizes[1]);
            form.elements['sz_pizza'].value = $('#selectSizes').val();
            newOrder.updatePizzaTotal(form);
        }
        else if ($("input[title='ny']").is(':checked')){    //NEW YORK STYLE
            $('#selectSizes').html(pizzaSizes[2]);
            form.elements['sz_pizza'].value = $('#selectSizes').val();
            newOrder.updatePizzaTotal(form);
        }
        else{
            $('#selectSizes').html(pizzaSizes[3]);  //GLUTEN FREE
            form.elements['sz_pizza'].value = $('#selectSizes').val();
            newOrder.updatePizzaTotal(form);
        }
    });

    //LOAD STATES FOR PERSONAL AND BILL INFORMATION
    newOrder.loadStates();

    //CLICK/ADD/REMOVE PIZZA TOPPINGS
    let topps = $('#pizza_toppings input');
    for (var i=0, len=topps.length; i<len; i++) {
        if ( topps[i].type === 'checkbox' ) {
            topps[i].onclick = newOrder.getToppingsTotal;
        }
    }

    //CHANGE SELECT OPTIONS FOR SIZES
    $('#selectSizes').change( function() {
        let form = this.form;
        let total = parseFloat( this.value );
        form.elements['sz_pizza'].value = total;
        newOrder.updatePizzaTotal(form);
    });

    //CHANGE SELECT OPTIONS FOR CHEESES
    $('#selectCheese').change( function() {
        let form = this.form;
        let total = parseFloat( this.value );
        form.elements['op_cheese'].value = total;
        newOrder.updatePizzaTotal(form);
    });

    //CHANGE SELECT OPTIONS FOR SAUCES
    $('#selectSauce').change( function() {
        let form = this.form;
        let total = parseFloat( this.value );
        form.elements['op_sauce'].value = total;
        newOrder.updatePizzaTotal(form);
    });

    //BUTTON TO CONFIRM YES OR NO AFTER ALL REQUIRED FIELDS
    $("#btnFinish").click(function(e){
        newOrder.finalProcess();
    });
    
    //CLICK TO LOAD THE SAME ADDRESS BY CHECKBOX
    $("#sameDeliver input").click( function(){
        if($(this).prop("checked") == true){
            newOrder.sameAddress();
            $('#fs1 input[type="text"], #fs1 select').attr('disabled', true);
        }
        else if($(this).prop("checked") == false){
            $('#fs1 input[type="text"], #fs1 select').attr('disabled', false);
            $('#inputFirst2, #inputLast2, #inputAddressA, #inputAddress2B, #inputCity2, #inputZip2').val("");
            $('#inputState2').val('choose');
        }
    });
    
    //HIDE THE FORM BILL PIZZA UNTIL CONFIRM THE PERSONAL INFO AND PIZZA ORDER
    $('#billPizza, #fhr').hide();
    
    //BUTTON TO SUBMIT THE BILL FORM
    $("#btnConfirm").click(function(e){
        newOrder.billAddress();
        newOrder.validCard();
    });

});
