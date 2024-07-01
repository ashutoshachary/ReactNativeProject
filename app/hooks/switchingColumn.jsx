import React, { createContext, useReducer } from 'react';

const initialLayoutState = {
  isTwoColumn: false,
};

const layoutReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_LAYOUT':
      const previousValue = state.isTwoColumn;
      // console.log('Previous value of isTwoColumn:', previousValue);
      return { ...state, isTwoColumn: !previousValue };
    default:
      return state;
  }
};

export const LayoutContext = createContext({
  layout: initialLayoutState,
  toggleLayout: () => {},
});

export const LayoutProvider = ({ children }) => {
  const [layout, dispatch] = useReducer(layoutReducer, initialLayoutState);

  const toggleLayout = () => {
    dispatch({ type: 'TOGGLE_LAYOUT' });
  };

  return (
    <LayoutContext.Provider value={{ layout, toggleLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};
