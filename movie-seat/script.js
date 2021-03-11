const storage = (function() {
  return {
    get: function(key) {
      return JSON.parse(localStorage.getItem(key));
    },
    set: function(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
})();

const domain = (function() {
  const CONSTANTS = {
    SELECTED_MOVIE_INDEX: 'selectedMovieIndex',
    SELECTED_MOVIE_PRICE: 'selectedMoviePrice',
    SELECTED_SEATS: 'selectedSeats'
  };

  return {
    getConstants: function() {
      return CONSTANTS;
    }
  }
})();

const ux = (function(domain, storage) {

  const movieSelect = document.getElementById('movie');
  let ticketPrice = +movieSelect.value;

  const container = document.querySelector('.container');
  const seats = document.querySelectorAll('.row .seat:not(.occupied)');
  const count = document.getElementById('count');
  const total = document.getElementById('total');

  function _setMovieData(movieIndex, moviePrice) {
    storage.set(domain.getConstants.SELECTED_MOVIE_INDEX, movieIndex);
    storage.set(domain.getConstants.SELECTED_MOVIE_PRICE, moviePrice);
  }

  function _updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    storage.set(domain.getConstants.SELECTED_SEATS, seatsIndex);

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
  }

  return {
    addEventListeners() {
      movieSelect.addEventListener('change', e => {
        ticketPrice = +e.target.value;
        _setMovieData(e.target.selectedIndex, e.target.value);
        _updateSelectedCount();
      });
      container.addEventListener('click', e => {
        if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
          e.target.classList.toggle('selected');
          _updateSelectedCount();
        }
      });
    },
    populate() {
      const selectedSeats = storage.get(domain.getConstants.SELECTED_SEATS);
      if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
          if (selectedSeats.indexOf(index) > -1) {
            seat.classList.add('selected');
          }
        });
      }
    },
    setIndex() {
      const selectedMovieIndex = storage.get(domain.getConstants.SELECTED_MOVIE_INDEX);
      if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
      }
    },
    updateSelectedCount() {
      _updateSelectedCount();
    }
  }
})(domain, storage);

const controller = (function(ux) {
  return {
    init: function() {
      ux.populate();
      ux.setIndex();
      ux.addEventListeners();
      ux.updateSelectedCount();
    }
  }
})(ux);

controller.init();