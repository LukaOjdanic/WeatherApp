import React from 'react';

function HistoryView({ history }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-sky-700 mb-4">Recent Searches</h3>
      {history && history.length > 0 ? (
        <ul className="space-y-3">
          {history.map((item) => (
            <li key={item.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center transition hover:shadow-lg">
              <div>
                <p className="font-semibold text-stone-800">{item.city_name}</p>
                <p className="text-sm text-stone-500">{formatDate(item.searched_at)}</p>
              </div>
              <p className="font-bold text-xl text-sky-600">{Math.round(item.temperature)}°C</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-md text-center text-stone-500">
          <p>No search history yet.</p>
        </div>
      )}
    </div>
  );
}

export default HistoryView;