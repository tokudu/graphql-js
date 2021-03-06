/* @flow */
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import type { ValidationContext } from '../index';
import { GraphQLError } from '../../error';
import type { Field } from '../../language/ast';
import type { GraphQLType } from '../../type/definition';


export function undefinedFieldMessage(
  fieldName: string,
  type: GraphQLType
): string {
  return `Cannot query field "${fieldName}" on "${type}".`;
}

/**
 * Fields on correct type
 *
 * A GraphQL document is only valid if all fields selected are defined by the
 * parent type, or are an allowed meta field such as __typenamme
 */
export function FieldsOnCorrectType(context: ValidationContext): any {
  return {
    Field(node: Field) {
      const type = context.getParentType();
      if (type) {
        const fieldDef = context.getFieldDef();
        if (!fieldDef) {
          context.reportError(new GraphQLError(
            undefinedFieldMessage(node.name.value, type.name),
            [ node ]
          ));
        }
      }
    }
  };
}
