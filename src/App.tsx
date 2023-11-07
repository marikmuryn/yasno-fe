import { Routes, Route, Navigate } from 'react-router-dom';
import { Artists, Artist, Favorites } from './pages';
import { ROUTER } from './constants/constants';

export const App = () => (
  <Routes>
    <Route
      path={ROUTER.home}
      element={<Navigate to={ROUTER.artists} replace />}
    />
    <Route path={ROUTER.artists} element={<Artists />} />
    <Route path={`${ROUTER.artists}/:artistId`} element={<Artist />} />
    <Route path={ROUTER.favorites} element={<Favorites />} />
    <Route path="*" element={<Navigate to={ROUTER.home} replace />} />
  </Routes>
);
