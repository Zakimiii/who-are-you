var PropTypes = require('prop-types');

const Children = PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
]);

const identity = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    username: PropTypes.string.isRequired,
    username_booked_at: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    email_is_verified: PropTypes.bool.isRequired,
    last_attempt_verify_email: PropTypes.object.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    phoneNumberFormatted: PropTypes.string.isRequired,
    phone_number_is_verified: PropTypes.bool.isRequired,
    last_attempt_verify_phone_number: PropTypes.object.isRequired,
    countryCode: PropTypes.string.isRequired,
    confirmation_code: PropTypes.string.isRequired,
    password_hash: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    twitter_id: PropTypes.string,
    facebook_id: PropTypes.string,
    instagram_id: PropTypes.string,
    invited_code: PropTypes.string,
    step: PropTypes.string.isRequired,
});

const User = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    username: PropTypes.string,
    nickname: PropTypes.string,
    detail: PropTypes.string,
    picture_small: PropTypes.string,
    picture_large: PropTypes.string,
    eth_address: PropTypes.string,
    token_balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    vector: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pure_score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    locale: PropTypes.string,
    timezone: PropTypes.string,
    invite_code: PropTypes.string,
    verified: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    bot: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    sign_up_meta: PropTypes.string,
    isPrivate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    permission: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    created_at: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    updated_at: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    Contents: PropTypes.array,
    Follows: PropTypes.array,
    Followers: PropTypes.array,
    UpVotes: PropTypes.array,
    DownVotes: PropTypes.array,
    ViewHistories: PropTypes.array,
    SearchHistories: PropTypes.array,
    HomeLabels: PropTypes.array,
    Interests: PropTypes.array,
});

const Content = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    UserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ParentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    body: PropTypes.string,
    vector: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    post_vector: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    upvote_vector: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    view_vector: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    follow_vector: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    follower_vector: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pure_score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    author_score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    author_pure_score: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    voters_score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    voters_pure_score: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    url: PropTypes.string,
    meta: PropTypes.string,
    path: PropTypes.string,
    isStory: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    isNswf: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    isHide: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    allowEdit: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    allowDelete: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    allowReply: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    allow_curation_rewards: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    allowVotes: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    isPrivate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    valid: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    permission: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    created_at: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    updated_at: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    ParentContent: PropTypes.shape({}),
    User: PropTypes.shape({}),
    UpVotes: PropTypes.array,
    DownVotes: PropTypes.array,
    ViewHistories: PropTypes.array,
    Labels: PropTypes.array,
    Labelings: PropTypes.array,
    children_contents: PropTypes.array,
    Requests: PropTypes.array,
});

const Request = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ContentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    VoterId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    VoteredId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    body: PropTypes.string,
    vector: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pure_score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    answer_score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    answer_pure_score: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    voters_score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    voters_pure_score: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    url: PropTypes.string,
    meta: PropTypes.string,
    isNswf: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    isHide: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    allowEdit: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    allowDelete: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    allowReply: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    allow_curation_rewards: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    allowVotes: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    isPrivate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    valid: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    permission: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    created_at: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    updated_at: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    TargetUser: PropTypes.shape({}),
    Voter: PropTypes.shape({}),
    Content: PropTypes.shape({}),
    UpVotes: PropTypes.array,
    DownVotes: PropTypes.array,
});

const Label = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    vector: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pure_score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isPrivate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    valid: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    permission: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    created_at: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    updated_at: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    HomeLabels: PropTypes.array,
    Labelings: PropTypes.array,
    Contents: PropTypes.array,
    Interests: PropTypes.array,
});

const Labeling = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    LabelId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ContentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    url: PropTypes.string,
    meta: PropTypes.string,
    color: PropTypes.string,
    isPrivate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    valid: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    permission: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]),
    created_at: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    updated_at: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    Label: PropTypes.shape({}),
    Content: PropTypes.shape({}),
});

module.exports = {
    Children,
    identity,
    User,
    Content,
    Request,
    Label,
    Labeling,
};
