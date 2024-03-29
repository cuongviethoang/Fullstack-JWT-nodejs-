"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        await queryInterface.bulkInsert(
            "Users",
            [
                {
                    email: "John Doe",
                    password: 12345678,
                    username: "fake1",
                },
                {
                    email: "John Doe2",
                    password: 12345678,
                    username: "fake2",
                },
                {
                    email: "John Doe3",
                    password: 12345678,
                    username: "fake3",
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
