const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

// save selected movie index and price
function setMovieData(movieIndex) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // Copy selected seats into arr
    // Map through array
    // Return a new array indexes
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * movieSelect.value;
}


// get data from local storage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');            
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

    // initial count and total set
    updateSelectedCount();
}

// movie select event
movieSelect.addEventListener('change', e => {    
    setMovieData(e.target.selectedIndex);
    updateSelectedCount();
});

container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && 
      !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        
        updateSelectedCount();
    }
});

