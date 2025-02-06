import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import CouponCode from './components/CouponCode';
import { upcomingMovies } from './data/movies';
import { events } from './data/events';
import { trains } from './data/trains';
import { validateCoupon } from './utils/coupons';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'movies' | 'events' | 'trains'>('movies');

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleApplyCoupon = (code: string) => {
    const discount = validateCoupon(code);
    if (discount) {
      alert(`Coupon applied successfully! You get ${discount}% off.`);
    } else {
      alert('Invalid coupon code.');
    }
  };

  const filteredMovies = upcomingMovies.filter(movie => 
    movie.name.toLowerCase().includes(searchQuery) ||
    movie.cast.toLowerCase().includes(searchQuery)
  );

  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(searchQuery) ||
    event.location.toLowerCase().includes(searchQuery)
  );

  const filteredTrains = trains.filter(train => 
    train.name.toLowerCase().includes(searchQuery) ||
    train.from.toLowerCase().includes(searchQuery) ||
    train.to.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">TicketPlus</h1>
      
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-center gap-4 mb-8">
          <button 
            onClick={() => setSelectedCategory('movies')}
            className={`px-4 py-2 rounded-lg ${selectedCategory === 'movies' ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            Movies
          </button>
          <button 
            onClick={() => setSelectedCategory('events')}
            className={`px-4 py-2 rounded-lg ${selectedCategory === 'events' ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            Events
          </button>
          <button 
            onClick={() => setSelectedCategory('trains')}
            className={`px-4 py-2 rounded-lg ${selectedCategory === 'trains' ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            Trains
          </button>
        </div>

        <div className="flex justify-center mb-8">
          <SearchBar onSearch={handleSearch} placeholder="Search..." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedCategory === 'movies' && filteredMovies.map(movie => (
            <div key={movie.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{movie.name}</h3>
              <p className="text-gray-600 mb-1">Cast: {movie.cast}</p>
              <p className="text-gray-600 mb-1">Director: {movie.director}</p>
              <p className="text-gray-600 mb-4">Release: {movie.releaseDate}</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold">₹{movie.price}</p>
                <CouponCode onApply={handleApplyCoupon} />
              </div>
            </div>
          ))}

          {selectedCategory === 'events' && filteredEvents.map(event => (
            <div key={event.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
              <p className="text-gray-600 mb-1">Location: {event.location}</p>
              <p className="text-gray-600 mb-1">Category: {event.category}</p>
              <p className="text-gray-600 mb-4">Date: {event.date}</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold">₹{event.price}</p>
                <CouponCode onApply={handleApplyCoupon} />
              </div>
            </div>
          ))}

          {selectedCategory === 'trains' && filteredTrains.map(train => (
            <div key={train.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{train.name}</h3>
              <p className="text-gray-600 mb-1">From: {train.from}</p>
              <p className="text-gray-600 mb-1">To: {train.to}</p>
              <p className="text-gray-600 mb-1">Departure: {train.departureTime}</p>
              <p className="text-gray-600 mb-4">Duration: {train.duration}</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold">₹{train.price}</p>
                <CouponCode onApply={handleApplyCoupon} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;