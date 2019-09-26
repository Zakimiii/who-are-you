// 'use strict';
// /*
// Use this command:
// sudo sequelize db:drop && sudo sequelize db:create &&  sudo sequelize db:migrate &&  sudo sequelize db:seed:all --debug
// */
// const data = require('../test_data');
// let results;
// // const crawler = require('../utils/crawler');
// module.exports = {
//     up: (queryInterface, Sequelize) => {
//         return data({
//             users_limit: 100,
//             contents_limit: 200,
//             folows_limit: 3000,
//             upvotes_limit: 100,
//             downvotes_limit: 100,
//             requests_limit: 104,
//             requestUpvotes_limit: 3000,
//             requestDownvotes_limit: 3000,
//             reposts_limit: 100,
//             labels_limit: 100,
//             labelings_limit: 1000,
//             viewHistories_limit: 1000,
//             searchHistories_limit: 1000,
//             interests_limit: 1000,
//             homeLabels_limit: 100,
//             children_limit: 600,
//             labelStocks_limit: 100,
//             developers_limit: 1,
//             platforms_limit: 1,
//             rewards_limit: 1,
//             bridges_limit: 1,
//             invites_limit: 1,
//             snsCampaigns_limit: 1,
//         }).then(val => {
//             results = val;
//             return queryInterface
//                 .bulkInsert('users', results['users'], {})
//                 .then(() => {
//                     return queryInterface.bulkInsert(
//                         'accounts',
//                         results['accounts'],
//                         {}
//                     );
//                 })
//                 .then(() => {
//                     return queryInterface.bulkInsert(
//                         'arecs',
//                         [
//                             {
//                                 user_id: 1,
//                                 uid: 'adoladoladoladol',
//                                 contact_email: 'adoladoladoladoli@gmail.com',
//                                 account_name: 'adol',
//                                 provider: '',
//                                 email_confirmation_code: 'adol-email',
//                                 validation_code: 'adol',
//                                 request_submitted_at: new Date(),
//                                 owner_key: 'SMT',
//                                 old_owner_key: 'SMT',
//                                 new_owner_key: 'SMT',
//                                 memo_key: 'SMT',
//                                 remote_ip: '',
//                                 status: 'waiting',
//                                 created_at: new Date(),
//                                 updated_at: new Date(),
//                             },
//                         ],
//                         {}
//                     );
//                 })
//                 .then(() => {
//                     return queryInterface.bulkInsert(
//                         'identities',
//                         results['identities'],
//                         {}
//                     );
//                 })
//                 .then(() => {
//                     return queryInterface.bulkInsert(
//                         'contents',
//                         results['contents'],
//                         {}
//                     );
//                 })
//                 .then(() => {
//                     return queryInterface.bulkInsert(
//                         'upvotes',
//                         results['upvotes'],
//                         {}
//                     );
//                 })
//                 .then(() => {
//                     return queryInterface.bulkInsert(
//                         'downvotes',
//                         results['downvotes'],
//                         {}
//                     );
//                 })
//                 .then(() => {
//                     return queryInterface.bulkInsert(
//                         'reposts',
//                         results['reposts'],
//                         {}
//                     );
//                 })
//                 .then(() => {
//                     return queryInterface.bulkInsert(
//                         'follows',
//                         results['follows'],
//                         {}
//                     );
//                 })
//                 .then(() => {
//                     return queryInterface.bulkInsert(
//                         'labels',
//                         results['labels'],
//                         {}
//                     );
//                 })
//                 .then(() => {
//                     return queryInterface.bulkInsert(
//                         'labelings',
//                         results['labelings'],
//                         {}
//                     );
//                 })
//                 .then(() => {
//                     return queryInterface.bulkInsert(
//                         'viewHistories',
//                         results['viewHistories'],
//                         {}
//                     );
//                 })
//                 .then(() => {
//                     return queryInterface.bulkInsert(
//                         'searchHistories',
//                         results['searchHistories'],
//                         {}
//                     );
//                 })
//                 .then(() => {
//                     return queryInterface.bulkInsert(
//                         'interests',
//                         results['interests'],
//                         {}
//                     );
//                 })
//                 .then(() => {
//                     return queryInterface.bulkInsert(
//                         'homeLabels',
//                         results['homeLabels'],
//                         {}
//                     );
//                 })
//                 .then(() => {
//                     return queryInterface.bulkInsert(
//                         'requests',
//                         results['requests'],
//                         {}
//                     );
//                 })
//                 .then(() => {
//                     return queryInterface.bulkInsert(
//                         'requestUpvotes',
//                         results['requestUpvotes'],
//                         {}
//                     );
//                 })
//                 .then(() => {
//                     return queryInterface.bulkInsert(
//                         'requestDownvotes',
//                         results['requestDownvotes'],
//                         {}
//                     );
//                 })
//                 .then(() => {
//                     return queryInterface.bulkInsert(
//                         'labelStocks',
//                         results['labelStocks'],
//                         {}
//                     );
//                 })
//                 .then(() => {
//                     return queryInterface.bulkInsert(
//                         'developers',
//                         results['developers'],
//                         {}
//                     );
//                 })
//                 .then(() => {
//                     return queryInterface.bulkInsert(
//                         'platforms',
//                         results['platforms'],
//                         {}
//                     );
//                 })
//                 .then(() => {
//                     return queryInterface.bulkInsert(
//                         'rewards',
//                         results['rewards'],
//                         {}
//                     );
//                 })
//                 .then(() => {
//                     return queryInterface.bulkInsert(
//                         'bridges',
//                         results['bridges'],
//                         {}
//                     );
//                 })
//                 .then(() => {
//                     return queryInterface.bulkInsert(
//                         'invites',
//                         results['invites'],
//                         {}
//                     );
//                 })
//                 .then(() => {
//                     return queryInterface.bulkInsert(
//                         'snsCampaigns',
//                         results['snsCampaigns'],
//                         {}
//                     );
//                 });
//         });
//     },

//     down: (queryInterface, Sequelize) => {
//         throw new Error('The demo seeders are not revertable');
//     },
// };
