'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let adminid = await queryInterface.bulkInsert('Users', [{
      email: 'agen@email.com',
      password: '$2b$10$71lmyRXTi0ICGLLJAO.CK.ZIsx5pjyX66O9hF1KSbBtFbi2IElnC2', //asdf
      firstName: 'Agen',
      lastName: 'Rumah',
      role: 'admin',
      phone: '08323213213',
      createdAt: new Date(),
      updatedAt: new Date()
    }], { returning: ['id'] })

    let userid = await queryInterface.bulkInsert('Users', [{
      email: 'user1@email.com',
      password: '$2b$10$71lmyRXTi0ICGLLJAO.CK.ZIsx5pjyX66O9hF1KSbBtFbi2IElnC2', //asdf
      firstName: 'Pembeli',
      lastName: 'Rumah',
      role: 'user',
      phone: '08121321312',
      createdAt: new Date(),
      updatedAt: new Date()
    }], { returning: ['id'] })

    let houseid = await queryInterface.bulkInsert('Houses', [{
      name: 'Rumah Minimalis',
      type: 50,
      price: 100000000,
      landarea: 150,
      certificate: 'SHM',
      address: 'Jl ABCD No. 20',
      lat: -6.2313131321,
      long: -6.123132213,
      numfloor: 0,
      bedroom: 0,
      bathroom: 0,
      carport: true,
      garden: false,
      kitchen: true,
      yard: true,
      livingroom: false,
      diningroom: true,
      foundation: 'Cakar Ayam',
      wall: ['Bata Ringan', 'Plaster'],
      floortype: 'Keramik',
      floorlength: 50,
      sanitary: ['Shower', 'Closet Jongkok'],
      jamb: 'Plastik',
      ceiling: 'Gypsum',
      roof: 'Rangka Baja Ringan',
      electricity: 1000,
      UserId: adminid.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }], { returning: ['id'] })
    await queryInterface.bulkInsert('Messages', [
      {
        message: 'Apakah bisa digali sumur bor?',
        UserId: userid.id,
        HouseId: houseid.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    await queryInterface.bulkInsert('Messages', [
      {
        message: 'Bisa',
        UserId: adminid.id,
        HouseId: houseid.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('Houses', null, {})
    await queryInterface.bulkDelete('Messages', null, {})
  }
};
