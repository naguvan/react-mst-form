import { types } from 'mobx-state-tree';

import { StringField } from './string/StringField';
import { NumberField } from './number/NumberField';
import { BooleanField } from './boolean/BooleanField';

export const Field = types.union(StringField, NumberField, BooleanField);
