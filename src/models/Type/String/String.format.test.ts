// tslint:disable:max-file-line-count

import { String } from './String';
import { IStringConfig } from '@root/types';

async function test_format(
    title: string,
    value: string,
    config: IStringConfig,
    result: boolean
) {
    test(title, async () => {
        const type = String.create(config);

        type.setValue(value);
        expect(type.value).toBe(value);

        await type.validate();

        expect(type.valid).toBe(result);
        expect(type.errors.slice(0)).toEqual(
            result ? [] : [`should match format ${config.format}`]
        );
    });
}

// https://github.com/tdegrunt/jsonschema/blob/9a185ae193e04f090d29004e419aa43cb8097e4e/test/formats.js

test_format(
    'should validate a valid date-time',
    '2012-07-08T16:41:41.532Z',
    { type: 'string', format: 'date-time' },
    true
);

test_format(
    'should validate a valid date-time without milliseconds',
    '2012-07-08T16:41:41Z',
    { type: 'string', format: 'date-time' },
    true
);

test_format(
    'should validate a date-time with a timezone offset instead of Z',
    '2012-07-08T16:41:41.532+00:00',
    { type: 'string', format: 'date-time' },
    true
);

test_format(
    'should validate a date-time with a timezone offset instead of Z',
    '2012-07-08T16:41:41.532+05:30',
    { type: 'string', format: 'date-time' },
    true
);

test_format(
    'should validate a date-time with a timezone offset instead of Z',
    '2012-07-08T16:41:41.532+04:00',
    { type: 'string', format: 'date-time' },
    true
);

test_format(
    'should validate a date-time with a z instead of a Z',
    '2012-07-08T16:41:41.532z',
    { type: 'string', format: 'date-time' },
    true
);

test_format(
    'should not validate a date-time with the time missing',
    '2012-07-08',
    { type: 'string', format: 'date-time' },
    false
);

test_format(
    'should not validate an invalid date-time',
    'TEST2012-07-08T16:41:41.532Z',
    { type: 'string', format: 'date-time' },
    false
);

test_format(
    'should not validate a date-time with a timezone offset AND a Z',
    '2012-07-08T16:41:41.532+00:00Z',
    { type: 'string', format: 'date-time' },
    false
);

test_format(
    'should not validate a date-time with a timezone offset AND a Z',
    '2012-07-08T16:41:41.532+Z00:00',
    { type: 'string', format: 'date-time' },
    false
);

test_format(
    'should validate a valid date',
    '2012-07-08',
    { type: 'string', format: 'date' },
    true
);

test_format(
    'should not validate an invalid date',
    'TEST2012-07-08',
    { type: 'string', format: 'date' },
    false
);

test_format(
    'should validate a valid time',
    '16:41:41',
    { type: 'string', format: 'time' },
    true
);

test_format(
    'should not validate an invalid time',
    '16:41:41.532Z',
    { type: 'string', format: 'time' },
    false
);

test_format(
    'should validate a date-time with a space instead of a T',
    '2012-07-08 16:41:41.532Z',
    { type: 'string', format: 'date-time' },
    true
);

test_format(
    'should validate a date-time with a t instead of a T',
    '2012-07-08t16:41:41.532Z',
    { type: 'string', format: 'date-time' },
    true
);

test_format(
    'should validate a valid utc-millisec',
    '-1234567890',
    { type: 'string', format: 'utc-millisec' },
    true
);

test_format(
    'should not validate an invalid utc-millisec',
    '16:41:41.532Z',
    { type: 'string', format: 'utc-millisec' },
    false
);

test_format(
    'should validate a valid regex',
    '/a/',
    { type: 'string', format: 'regex' },
    true
);

test_format(
    'should not validate an invalid regex',
    '/^(abc]/',
    { type: 'string', format: 'regex' },
    false
);

test_format(
    'should validate the color red',
    'red',
    { type: 'string', format: 'color' },
    true
);

test_format(
    'should validate the color #f00',
    '#f00',
    { type: 'string', format: 'color' },
    true
);

test_format(
    'should validate the color #ff0000',
    '#ff0000',
    { type: 'string', format: 'color' },
    true
);

test_format(
    'should validate the color rgb(255,0,0)',
    'rgb(255,0,0)',
    { type: 'string', format: 'color' },
    true
);

test_format(
    'should not validate an invalid color (json)',
    'json',
    { type: 'string', format: 'color' },
    false
);

test_format(
    'should validate a valid style',
    'color: red;',
    { type: 'string', format: 'style' },
    true
);

test_format(
    'should validate a valid complex style',
    'color: red; position: absolute; background-color: rgb(204, 204, 204); max-width: 150px;',
    { type: 'string', format: 'style' },
    true
);

test_format(
    'should validate a valid complex style',
    'color:red;position:absolute; background-color:     rgb(204, 204, 204); max-width: 150px;',
    { type: 'string', format: 'style' },
    true
);

test_format(
    'should not validate an invalid style',
    '0',
    { type: 'string', format: 'style' },
    false
);

test_format(
    'should validate a valid phone-number',
    '+31 42 123 4567',
    { type: 'string', format: 'phone' },
    true
);

test_format(
    'should not validate an invalid phone-number',
    '31 42 123 4567',
    { type: 'string', format: 'phone' },
    false
);

test_format(
    'should validate http://www.google.com/',
    'http://www.google.com/',
    { type: 'string', format: 'uri' },
    true
);

test_format(
    'should validate http://www.google.com/search',
    'http://www.google.com/search',
    { type: 'string', format: 'uri' },
    true
);

test_format(
    'should not validate relative URIs',
    'tdegrunt',
    { type: 'string', format: 'uri' },
    false
);

test_format(
    'should not validate with whitespace',
    'The dog jumped',
    { type: 'string', format: 'uri' },
    false
);

test_format(
    'should validate obama@whitehouse.gov',
    'obama@whitehouse.gov',
    { type: 'string', format: 'email' },
    true
);

test_format(
    'should validate barack+obama@whitehouse.gov',
    'barack+obama@whitehouse.gov',
    { type: 'string', format: 'email' },
    true
);

test_format(
    'should not validate obama@',
    'obama@',
    { type: 'string', format: 'email' },
    false
);

test_format(
    'should validate 192.168.0.1',
    '192.168.0.1',
    { type: 'string', format: 'ip-address' },
    true
);

test_format(
    'should validate 127.0.0.1',
    '127.0.0.1',
    { type: 'string', format: 'ip-address' },
    true
);

test_format(
    'should not validate 192.168.0',
    '192.168.0',
    { type: 'string', format: 'ip-address' },
    false
);

test_format(
    'should not validate 256.168.0',
    '256.168.0',
    { type: 'string', format: 'ip-address' },
    false
);

test_format(
    'should validate fe80::1%lo0',
    'fe80::1%lo0',
    { type: 'string', format: 'ipv6' },
    true
);

test_format(
    'should validate ::1',
    '::1',
    { type: 'string', format: 'ipv6' },
    true
);

test_format(
    'should not validate 127.0.0.1',
    '127.0.0.1',
    { type: 'string', format: 'ipv6' },
    false
);

test_format(
    'should not validate localhost',
    'localhost',
    { type: 'string', format: 'ipv6' },
    false
);

test_format(
    'should validate localhost',
    'localhost',
    { type: 'string', format: 'host-name' },
    true
);

test_format(
    'should validate www.google.com',
    'www.google.com',
    { type: 'string', format: 'host-name' },
    true
);

test_format(
    'should not validate www.-hi-.com',
    'www.-hi-.com',
    { type: 'string', format: 'host-name' },
    false
);

test_format(
    'should validate alpha',
    'alpha',
    { type: 'string', format: 'alpha' },
    true
);

test_format(
    'should validate abracadabra',
    'abracadabra',
    { type: 'string', format: 'alpha' },
    true
);

test_format(
    'should not validate 1test',
    'www.-hi-.com',
    { type: 'string', format: 'alpha' },
    false
);

test_format(
    'should validate alphanumeric',
    'alpha',
    { type: 'string', format: 'alphanumeric' },
    true
);

test_format(
    'should validate 123',

    '123',
    { type: 'string', format: 'alphanumeric' },
    true
);

test_format(
    'should validate abracadabra123',

    'abracadabra123',
    { type: 'string', format: 'alphanumeric' },
    true
);

test_format(
    'should not validate 1test!',

    '1test!',
    { type: 'string', format: 'alphanumeric' },
    false
);
