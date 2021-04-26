import React, { useCallback } from 'react';
import SelectComponent, { Option } from '../../lib/SelectComponent';

interface OptionComponentProps {
  sizes: any;
  onChange: (option: Option) => void;
}
const SizeComponent: React.FC<OptionComponentProps> = ({ sizes, onChange }) => {
  return (
    <div>
      <h3>Size</h3>
      <SelectComponent
        options={sizes.attribute_data.values.map((value: any) => ({
          label: value.value,
          value: value.value,
          key: value.key,
        }))}
        onChange={onChange}
      />
    </div>
  );
};

export default SizeComponent;
