import React, { useCallback } from 'react';
import SelectComponent, { Option } from '../../lib/SelectComponent';

interface ColorComponentProps {
  colors: any;
  onChange: (option: Option) => void;
}
const ColorComponent: React.FC<ColorComponentProps> = ({
  colors,
  onChange,
}) => {
  return (
    <div style={{ marginRight: 10 }}>
      <h3>Color</h3>
      <SelectComponent
        options={colors.attribute_data.values.map((value: any) => ({
          label: value.value,
          value: value.value,
          key: value.key,
        }))}
        onChange={onChange}
      />
    </div>
  );
};

export default ColorComponent;
