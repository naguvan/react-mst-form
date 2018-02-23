import { types, IType } from 'mobx-state-tree';
import { IBoolean, IBooleanConfig } from '@root/types';
import { IString, IStringConfig } from '@root/types';
import { INumber, INumberConfig } from '@root/types';
import { INull, INullConfig } from '@root/types';

import String from './String';
import Number from './Number';
import Boolean from './Boolean';
import Null from './Null';

export const Type = types.union(String, Number, Boolean, Null);
