import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const optionsMenu = [2, 5, 10, 15, 20];

function NumberDropdown({setNumberCards, numberCards}) {
  return (
    <Dropdown onSelect={(e) => setNumberCards(Number(e))}>
      <Dropdown.Toggle id="dropdown-basic">
        Image Number: {numberCards}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {optionsMenu.map(n => 
          <Dropdown.Item 
            key={n}
            eventKey={n} 
            disabled={n === numberCards}>
            {n}
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default NumberDropdown;