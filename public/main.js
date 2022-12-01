document.addEventListener('click', function(evt) {
    let target = evt.target;

    if(target.id == "add-button") {
        addField(target);
    }

    if(target.id == "remove-button") {
        removeField(target);
    }
})

document.addEventListener('change', function(evt) {
    let target = evt.target;

    if(target.id == "left-degrees") {
        convertLeftToRight(target);
    }

    if(target.id == "right-degrees") {
        convertRightToLeft(target, true);
    }

    if (target.id == "right-minutes") {
        convertRightToLeft(target, false);
    }
})

function addField(element)
{
    let tgtElem = $(element).parents("#converter-item");
    if (tgtElem == null) { return; }
    const field = document.getElementById("fieldTemplate").content;
    let copyField = document.importNode(field, true);
    tgtElem.after(copyField);
}

function removeField(element)
{
    let tgtElem = $(element).parents("#converter-item");
    if (tgtElem == null) { return; }
    tgtElem.remove();
}

function convertLeftToRight(element) {
    gtag('event', 'convert_units', { 'conversion_type': 'degToDdmd' });

    $(document).ready(function(){

        const leftDegrees = element;
        let leftContainer = $(leftDegrees).parents("#left-container");
        if (leftContainer == null) { return; }
        //console.log(`leftContainer: ${$(leftContainer).html()}`);

        let rightContainer = $(leftContainer).next();
        if (rightContainer == null) { return; }
        //console.log(`rightContainer: ${$(rightContainer).html()}`);

        const rightDegrees = $(rightContainer).find("#right-degrees");
        if (rightDegrees == null) { return; }
        //console.log(`rightDegrees: ${$(rightDegrees).html()}`);

        const rightMinutes = $(rightContainer).find("#right-minutes");
        if (rightMinutes == null) { return; }
        //console.log(`rightMinutes: ${$(rightMinutes).html()}`);

        // Get values
        let left = $(leftDegrees).val();
        //console.log(`left: ${left}`);
        if (isNaN(left)) {
            left = 0;
        }

        // TODO: Add a higher precision to the math functions
        // Do math
        let degrees = Math.trunc(left);
        let decimals = Math.abs(left - degrees)
        let minutes = decimals * 60;
        // console.log(`degrees: ${degrees}`);
        // console.log(`minutes: ${minutes}`);

        // Set values
        $(rightDegrees).val(degrees);
        $(rightMinutes).val(minutes);

    });
}

function convertRightToLeft(element, isDegrees) {
    gtag('event', 'convert_units', { 'conversion_type': 'ddmdToDeg' });

    $(document).ready(function(){

        // Initiate variables
        let rightDegrees;
        let rightMinutes;
        let rightContainer;

        // Get elements
        if (isDegrees) { // deg

            rightDegrees = element;
            if (rightDegrees == null) { return; }
            //console.log(`rightDegrees: ${$(rightDegrees).val()}`);

            rightContainer = $(rightDegrees).parents("#right-container");
            if (rightContainer == null) { return; }
            //console.log(`rightContainer: ${$(rightContainer).html()}`);

            rightMinutes = $(rightContainer).find("#right-minutes");
            if (rightMinutes == null) { return; }
            //console.log(`rightMinutes: ${$(rightMinutes).val()}`);

        } else { // min

            rightMinutes = element;
            if (rightMinutes == null) { return; }
            //console.log(`rightMinutes: ${$(rightMinutes).val()}`);

            rightContainer = $(rightMinutes).parents("#right-container");
            if (rightContainer == null) { return; }
            //console.log(`rightContainer: ${$(rightContainer).html()}`);

            rightDegrees = $(rightContainer).find("#right-degrees");
            if (rightDegrees == null) { return; }
            //console.log(`rightDegrees: ${$(rightDegrees).val()}`);

        }

        let leftContainer = $(rightContainer).prev();
        if (leftContainer == null) { return; }
        //console.log(`leftContainer: ${$(leftContainer).html()}`);

        const leftDegrees = $(leftContainer).find("#left-degrees");
        if (leftDegrees == null) { return; }
        //console.log(`leftDegrees: ${$(leftDegrees).html()}`);

        // Get values
        let right = parseInt($(rightDegrees).val());
        if (isNaN(right)) {
            right = 0;
        }
        //console.log("right:", right);

        let minutes = parseInt($(rightMinutes).val());
        if (isNaN(minutes)) {
            minutes = 0;
        }
        minutes = Math.abs(minutes);
        //console.log("minutes:", minutes);

        // Do math
        let decimals = minutes / 60
        //console.log("decimals:", decimals);
        
        let degrees;
        if (right < 0) {
            degrees = right - decimals;
        } else {
            degrees = right + decimals;
        }
        //console.log("degrees:", degrees);

        // Set values
        $(leftDegrees).val(degrees);

    });
}
