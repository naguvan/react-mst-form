import { types, IType } from 'mobx-state-tree';
import { IBooleanField, IBooleanFieldConfig } from '@root/types';
import { IStringField, IStringFieldConfig } from '@root/types';
import { INumberField, INumberFieldConfig } from '@root/types';

import { StringField } from './string/StringField';
import { NumberField } from './number/NumberField';
import { BooleanField } from './boolean/BooleanField';

export const Field = types.union(StringField, NumberField, BooleanField);
