import React from 'react';

import { Navigate } from 'react-router-dom';

import { ReturnComponentType } from '../../n4-types';

export const PecksList = (): ReturnComponentType => {
  return (
    <div>
      <Navigate to="/login" replace />
    </div>
  );
};
