import { types } from 'mobx-state-tree';

import { IFieldConfig, IField } from '../types/Field';
import { StringField } from './StringField';
import { NumberField } from './NumberField';
import { TypeField } from './TypeField';

// export function create(field: Partial<IFieldConfig>): IField {
//     console.info(field);
//     switch (field.type) {
//         case 'string':
//             return StringField.create(field);
//         case 'number':
//             return NumberField.create(field);
//         default:
//             return TypeField.create(field);
//     }
// }

export const Field = types.union(StringField, NumberField);
