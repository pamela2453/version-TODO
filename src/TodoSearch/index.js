import React from 'react';
import './TodoShearch.css'


function TodoSearch({
  searchValue,
  setSearchValue,
}) {
  return (
   <>
    <input
      placeholder="Escriba su lista de Tareas"
      className="TodoSearch d-flex justify-content-center"
      value={searchValue}
      onChange={(event) => {  
        setSearchValue(event.target.value);
      }}
      />
   </>
    );
}

export {TodoSearch};