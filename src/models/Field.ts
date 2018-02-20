import { types } from 'mobx-state-tree';

import { StringField } from './StringField';
import { NumberField } from './NumberField';
import { BooleanField } from './BooleanField';

export const Field = types.union(StringField, NumberField, BooleanField);
