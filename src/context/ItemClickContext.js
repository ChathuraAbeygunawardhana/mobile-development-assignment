import React, { createContext, useState } from 'react';

export const ItemClickContext = createContext();

export const ItemClickProvider = ({ children }) => {
  const [itemPressCount, setItemPressCount] = useState(0);

  const handleItemPress = () => {
    setItemPressCount(itemPressCount + 1);
  };

  return (
    <ItemClickContext.Provider value={{ itemPressCount, handleItemPress }}>
      {children}
    </ItemClickContext.Provider>
  );
};
