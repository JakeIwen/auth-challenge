db.users.insert(
   [
    { email: 'redlionfeather@gmail.com', clearanceLevel: 5 },
    { email: 'iwenx006@umn.edu', clearanceLevel: 2 }, // Your Other Google Email added here
   ]
);

db.secrets.insert(
  [
    { secrecyLevel: 1, secretText: 'Not that secret' },
    { secrecyLevel: 4, secretText: 'A good secret' },
    { secrecyLevel: 3, secretText: 'A secret' },
    { secrecyLevel: 2, secretText: 'Kind of a secret' },
    { secrecyLevel: 5, secretText: 'A super duper secret!' }
  ]
);
