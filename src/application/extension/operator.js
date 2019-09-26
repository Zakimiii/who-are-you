import CONTENT_TYPE from '@entity/ContentType';
import SUBMIT_TYPE from '@entity/SubmitType';
import data_config from '@constants/data_config';

const isContent = obj => {
    if (!obj) return false;
    if (obj.mode == 'content') {
        return true;
    }
    const required =
        'title' in obj &&
        'body' in obj &&
        !('VoterId' in obj || 'voter_id' in obj) &&
        !('VoteredId' in obj || 'votered_id' in obj);
    return required && ('ParentId' in obj || 'isStory' in obj);
};

const isLabel = obj => {
    const required =
        'title' in obj &&
        !('body' in obj) &&
        !('VoterId' in obj) &&
        !('VoteredId' in obj);
    return required;
};

const isRequest = obj => {
    if (!obj) return false;
    if (obj.mode == 'request') {
        return true;
    }
    const required =
        'title' in obj &&
        'body' in obj &&
        ('VoterId' in obj ||
            'VoteredId' in obj ||
            'voter_id' in obj ||
            'votered_id' ||
            !'isStory' in obj ||
            'answer_pure_score' in obj ||
            'answer_score' in obj);
    return required && !isContent(obj);
};

const hasTargetRequest = obj => {
    if (!obj) return false;
    let requests = obj.Requests;
    if (!(requests instanceof Array)) return false;
    if (requests.length == 0) return false;
    return !!requests;
};

const hasParentContent = obj => {
    if (!obj) return false;
    if (!isContent(obj)) return false;
    return !!obj.ParentId && !!obj.ParentContent;
};

const isWanted = obj => {
    if (!obj) return false;
    if (!isContent(obj)) return false;
    return (
        Number.prototype.castBool(obj.isOpinionWanted) ||
        Number.prototype.castBool(obj.isRequestWanted)
    );
};

const shouldCheering = (obj, user) => {
    if (!hasParentContent(obj)) return false;
    if (obj.ParentContent.isCheering) return false;
    if (!user) return false;
    return (
        obj.ParentContent.UserId != user.id
    ); /*!obj.ParentContent.UpVotes.filter(val =>
        Number.prototype.castBool(val.isCheering)
    ).length >= data_config.vote_max_limit &&*/
};

const isUser = obj => {
    if (!obj) return false;
    const required =
        'nickname' in obj && 'picture_small' in obj && 'picture_large' in obj;
    return required;
};

const getRepliesFromContent = obj => {
    if (hasTargetRequest(obj)) {
        let requests = obj.Requests || [];
        return requests;
    } else if (hasParentContent(obj)) {
        return [obj.ParentContent];
    } else {
        return [];
    }
};

const getType = self => {
    if (self.id) {
        return SUBMIT_TYPE.Edit;
    } else {
        return SUBMIT_TYPE.Story;
    }
};

const getTypeValue = self => {
    if (self.id) {
        return SUBMIT_TYPE.Edit.value;
    } else {
        return SUBMIT_TYPE.Story.value;
    }
};

module.exports = {
    isContent,
    isLabel,
    isRequest,
    getType,
    getTypeValue,
    getRepliesFromContent,
    isUser,
    hasTargetRequest,
    hasParentContent,
    shouldCheering,
    isWanted,
};
