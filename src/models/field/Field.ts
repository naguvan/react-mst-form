import { types, IType } from 'mobx-state-tree';
import { IBoolean, IBooleanConfig } from '@root/types';
import { IString, IStringConfig } from '@root/types';
import { INumber, INumberConfig } from '@root/types';

import { String } from './string/String';
import { Number } from './number/Number';
import { Boolean } from './boolean/Boolean';

export const Field = types.union(String, Number, Boolean);
