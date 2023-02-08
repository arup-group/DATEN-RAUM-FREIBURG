
CREATE EXTENSION pgcrypto;
-- user
DELETE FROM freiberg_user;
INSERT INTO freiberg_user (full_name, email, password, is_admin, company_name)
 VALUES    ('Admin Account',      'admin.account0@test.com',      'GdNVU9u29A',      1,   'Freiburg');
INSERT INTO freiberg_user (full_name, email, password, is_admin)
 VALUES    ('Account One',      'test.account1@test.com',      '75wET4rqrM',      0);
INSERT INTO freiberg_user (full_name, email, password, is_admin)
 VALUES    ('Account Two',      'test.account2@test.com',      'Cvb23k8SU7',      0);
INSERT INTO freiberg_user (full_name, email, password, is_admin, company_name)
 VALUES    ('Account Three',      'test.account3@test.com',      '7B96mcmCpQ',      0,    'City Main');
INSERT INTO freiberg_user (full_name, email, password, is_admin, company_name)
 VALUES    ('Account Three',      'test.account4@test.com',      'v3ewfEj5X9',      0,    'City');
