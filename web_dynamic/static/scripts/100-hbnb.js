$(document).ready(function () {
  const amenities = {};
  const states = {};
  const cities = {};

  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      if ($(this).attr('data-id') in states || $(this).attr('data-id') in cities || $(this).attr('data-id') in amenities) {
        if ($(this).attr('data-name') in states) {
          states[$(this).attr('data-id')] = $(this).attr('data-name');
        } else if ($(this).attr('data-name') in cities) {
          cities[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
          amenities[$(this).attr('data-id')] = $(this).attr('data-name');
        }
      }
    } else {
      delete amenities[$(this).attr('data-id')];
      delete states[$(this).attr('data-id')];
      delete cities[$(this).attr('data-id')];
    }
    $('.amenities h4').text(Object.values(amenities).join(', '));
    $('.locations h4').text(Object.values(states).concat(Object.values(cities)).join(', '));
  });

  $('button').click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({ states: Object.keys(states), cities: Object.keys(cities), amenities: Object.keys(amenities) }),
      contentType: 'application/json',
      success: function (data) {
        $('section.places').empty();
        for (const place of data) {
          $('section.places').append(
            `<article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
              </div>
              <div class="description">
                ${place.description}
              </div>
            </article>`
          );
        }
      }
    });
  });
});
