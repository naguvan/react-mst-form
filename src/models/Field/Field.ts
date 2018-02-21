import { types, IType } from 'mobx-state-tree';
import { IBoolean, IBooleanConfig } from '@root/types';
import { IString, IStringConfig } from '@root/types';
import { INumber, INumberConfig } from '@root/types';

import String from './String';
import Number from './Number';
import Boolean from './Boolean';
import Color from './Color';
import Enum from './Enum';

export const Field = types.union(String, Number, Boolean, Color, Enum);
