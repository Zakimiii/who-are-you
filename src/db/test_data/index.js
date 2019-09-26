// const users = require('./user');
// const accounts = require('./account');
// const identities = require('./identity');
// const contents = require('./content');
// const follows = require('./follow');
// const upvotes = require('./upvote');
// const downvotes = require('./downvote');
// const reposts = require('./repost');
// const labels = require('./label');
// const labelings = require('./labeling');
// const viewHistories = require('./view_history');
// const searchHistories = require('./search_history');
// const interests = require('./interest');
// const homeLabels = require('./home_label');
// const content_children = require('./content_child');
// const requests = require('./request');
// const requestUpvotes = require('./request_upvote');
// const requestDownvotes = require('./request_downvote');
// const labelStocks = require('./label_stock');
// const developers = require('./developer');
// const platforms = require('./platform');
// const rewards = require('./reward');
// const bridges = require('./bridge');
// const invites = require('./invite');
// const snsCampaigns = require('./sns_campaign');

// async function data({
//     users_limit,
//     contents_limit,
//     follows_limit,
//     upvotes_limit,
//     downvotes_limit,
//     reposts_limit,
//     labels_limit,
//     labelings_limit,
//     viewHistories_limit,
//     searchHistories_limit,
//     interests_limit,
//     homeLabels_limit,
//     children_limit,
//     requests_limit,
//     requestUpvotes_limit,
//     requestDownvotes_limit,
//     labelStocks_limit,
//     developers_limit,
//     platforms_limit,
//     rewards_limit,
//     bridges_limit,
//     invites_limit,
//     snsCampaigns_limit,
// }) {
//     const datum = await Promise.all([
//         users(users_limit),
//         accounts(users_limit),
//         identities(users_limit),
//         contents(contents_limit, users_limit, false),
//         follows(follows_limit, users_limit),
//         upvotes(upvotes_limit, users_limit, contents_limit),
//         downvotes(downvotes_limit, users_limit, contents_limit),
//         reposts(reposts_limit, users_limit, contents_limit),
//         labels(labels_limit),
//         labelings(labelings_limit, labels_limit, contents_limit),
//         viewHistories(viewHistories_limit, users_limit, contents_limit),
//         searchHistories(searchHistories_limit, users_limit),
//         interests(interests_limit, users_limit, labels_limit),
//         homeLabels(homeLabels_limit, users_limit, labels_limit),
//         content_children(children_limit, contents_limit, users_limit, false),
//         requests(requests_limit, users_limit, contents_limit, false),
//         requestUpvotes(requestUpvotes_limit, users_limit, requests_limit),
//         requestDownvotes(requestDownvotes_limit, users_limit, requests_limit),
//         labelStocks(labelStocks_limit, labels_limit, users_limit),
//         developers(developers_limit),
//         platforms(platforms_limit),
//         rewards(rewards_limit, users_limit, platforms_limit),
//         bridges(rewards_limit, users_limit),
//         invites(invites_limit, users_limit),
//         snsCampaigns(snsCampaigns_limit, users_limit),
//     ]);

//     let users_data = datum[0],
//         accounts_data = datum[1],
//         identities_data = datum[2],
//         contents_data = datum[3],
//         follows_data = datum[4],
//         upvotes_data = datum[5],
//         downvotes_data = datum[6],
//         reposts_data = datum[7],
//         labels_data = datum[8],
//         labelings_data = datum[9],
//         viewHistories_data = datum[10],
//         searchHistories_data = datum[11],
//         interests_data = datum[12],
//         homeLabels_data = datum[13],
//         content_children_data = datum[14],
//         requests_data = datum[15],
//         requestUpvotes_data = datum[16],
//         requestDownvotes_data = datum[17],
//         labelStocks_data = datum[18],
//         developers_data = datum[19],
//         platforms_data = datum[20],
//         rewards_data = datum[21],
//         bridges_data = datum[22],
//         invites_data = datum[23],
//         snsCampaigns_data = datum[24];

//     return {
//         users: users_data,
//         accounts: accounts_data,
//         identities: identities_data,
//         contents: contents_data.concat(content_children_data),
//         follows: follows_data,
//         reposts: reposts_data,
//         upvotes: upvotes_data,
//         downvotes: downvotes_data,
//         labels: labels_data,
//         labelings: labelings_data,
//         viewHistories: viewHistories_data,
//         searchHistories: searchHistories_data,
//         interests: interests_data,
//         homeLabels: homeLabels_data,
//         requests: requests_data,
//         requestUpvotes: requestUpvotes_data,
//         requestDownvotes: requestDownvotes_data,
//         labelStocks: labelStocks_data,
//         developers: developers_data,
//         platforms: platforms_data,
//         rewards: rewards_data,
//         bridges: bridges_data,
//         invites: invites_data,
//         snsCampaigns: snsCampaigns_data,
//     };
// }

// module.exports = data;
