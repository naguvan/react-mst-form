import { IModelType, types, unprotect } from 'mobx-state-tree';
import { getParent, hasParent } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { ITypeFieldConfig, ITypeField } from '../types/Field';

export const TypeField: IModelType<
    Partial<ITypeFieldConfig<any, any>>,
    ITypeField<any, any>
> = types
    .model<ITypeFieldConfig<any, any>>('Field', {
        //    type: types.union(
        //        types.literal('string'),
        //        types.literal('number'),
        //        types.literal('boolean')
        //    ),
        type: types.enumeration('type', ['string', 'number', 'boolean']),
        title: types.string,
        required: types.optional(types.boolean, false),
        name: types.optional(types.string, ''),
        value: types.optional(types.frozen, null)
    })
    .actions(it => ({
        afterCreate() {
            if (it.name === '') {
                const { title } = it;
                it.name = title.toLowerCase().replace(' ', '-');
            }
            if (!hasParent(it)) {
                unprotect(it);
            }
        },
        setName(name: string): void {
            it.name = name;
        },
        setValue(value: any): void {
            it.value = value;
        },
        setTitle(title: string): void {
            it.title = title;
        }
    }));
