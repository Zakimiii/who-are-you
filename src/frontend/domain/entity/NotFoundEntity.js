import Entity from '@entity/Entity';
import { Enum, defineEnum } from '@extension/Enum';

export const NOTFOUND_TYPE = defineEnum({
    Title: {
        rawValue: 0,
        value: 'title',
    },
    Border: {
        rawValue: 1,
        value: 'border',
    },
    Body: {
        rawValue: 2,
        value: 'body',
    },
});
