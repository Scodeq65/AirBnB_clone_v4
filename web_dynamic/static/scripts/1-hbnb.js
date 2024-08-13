$(document).ready(function() {
    let selectedAmenities = [];

    $('input[type="checkbox"]').on('change', function() {
        const amenityId = $(this).data('id');
        const amenityName = $(this).data('name');
        
        if ($(this).is(':checked')) {
            if (!selectedAmenities.includes(amenityId)) {
                selectedAmenities.push(amenityId);
            }
        } else {
            selectedAmenities = selectedAmenities.filter(id => id !== amenityId);
        }
        
        // Update the amenities list in the <h4> tag
        const amenitiesText = selectedAmenities.length > 0
            ? selectedAmenities.map(id => {
                return $('input[data-id="' + id + '"]').data('name');
            }).join(', ')
            : 'No amenities selected';
        
        $('.amenities h4').text(amenitiesText);
    });
});