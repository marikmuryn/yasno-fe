import { Routes, Route, Navigate } from 'react-router-dom';
import { Artists, Artist, Favorites } from './pages';

export const App = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/artists" replace />} />
    <Route path="/artists" element={<Artists />} />
    <Route path="/artists/:artistId" element={<Artist />} />
    <Route path="/favorites" element={<Favorites />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
