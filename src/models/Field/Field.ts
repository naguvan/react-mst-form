import { types, IType } from 'mobx-state-tree';
import { IBoolean, IBooleanConfig } from '@root/types';
import { IString, IStringConfig } from '@root/types';
import { INumber, INumberConfig } from '@root/types';
import { IColor, IColorConfig } from '@root/types';

import String from './String';
import Number from './Number';
import Boolean from './Boolean';
import Color from './Color';

export const Field = types.union(String, Number, Boolean, Color);
