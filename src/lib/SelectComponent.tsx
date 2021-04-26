import React, { useCallback, useEffect, useState } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import styles from './Select.module.scss';
import { AiFillCaretDown } from 'react-icons/ai';

export interface Option {
  label: string;
  value: string;
  key: string;
}
interface SelectProps {
  options: Option[];
  onChange: (option: Option) => void;
}
const SelectComponent: React.FC<SelectProps> = ({ options, onChange }) => {
  const [selected, setSelected] = useState<Option | null>(null);
  const [show, setShow] = useState<boolean>(false);

  const handleShow = useCallback(() => setShow((prevState) => !prevState), []);

  const handleChange = useCallback((option: Option) => {
    setSelected(option);
    onChange(option);
    handleClose();
  }, []);

  useEffect(() => {
    setSelected(options[0]);
  }, [options]);

  const handleClose = useCallback(() => setShow(false), []);

  const [ref] = useOnClickOutside(handleClose);
  return (
    <div ref={ref} className={styles.selectWrapper}>
      <div className={styles.selector} onClick={handleShow}>
        {(selected && selected.value) || 'Select '} <AiFillCaretDown />
      </div>
      {show && (
        <ul className={styles.selectContainer}>
          {options.map((option, i) => (
            <li
              className={styles.selectOption}
              key={option.value}
              onClick={() => handleChange(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default React.memo(SelectComponent);
