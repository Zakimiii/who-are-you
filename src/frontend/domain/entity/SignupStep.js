import Entity from '@entity/Entity';
import { Enum, defineEnum } from '@extension/Enum';

const SIGNUP_STEP = defineEnum({
    Options: {
        rawValue: 0,
        value: 'signupOptions',
    },
    UserNameEmail: {
        rawValue: 1,
        value: 'username_email',
    },
    CheckYourEmail: {
        rawValue: 2,
        value: 'checkYourEmail',
    },
    Password: {
        rawValue: 3,
        value: 'password',
    },
    MiddlePoint: {
        rawValue: 4,
        value: 'middlepoint',
    },
    PhoneNumber: {
        rawValue: 5,
        value: 'phoneNumber',
    },
    ConfirmPhoneNumber: {
        rawValue: 6,
        value: 'confirmPhoneNumber',
    },
    Finish: {
        rawValue: 7,
        value: 'finish',
    },
});

export default SIGNUP_STEP;
