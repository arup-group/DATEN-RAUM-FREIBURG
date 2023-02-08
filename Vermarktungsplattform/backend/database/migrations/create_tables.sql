
DROP SEQUENCE IF EXISTS user_id_seq;
CREATE SEQUENCE user_id_seq;
ALTER SEQUENCE user_id_seq RESTART WITH 1;
DROP TABLE if EXISTS freiberg_user CASCADE;
CREATE TABLE freiberg_user
(
  id BIGSERIAL PRIMARY KEY,
  date_created TIMESTAMP with time ZONE NOT NULL DEFAULT NOW(),
  date_updated TIMESTAMP with time ZONE NOT NULL DEFAULT NOW(),
  full_name VARCHAR(50),
  email VARCHAR(50) UNIQUE NOT NULL,
  company_name VARCHAR(100),
  phone_number VARCHAR(50) NULL,
  postal_address VARCHAR(100) NULL,
  is_admin INT DEFAULT(0),
  password VARCHAR(200) NOT NULL

)
WITH (
  OIDS=FALSE
);


DROP SEQUENCE IF EXISTS property_application_id_seq;
CREATE SEQUENCE property_application_id_seq;
ALTER SEQUENCE property_application_id_seq RESTART WITH 1;
DROP TABLE if EXISTS property_application CASCADE;
CREATE TABLE property_application
(
    id BIGSERIAL PRIMARY KEY,
    award_status VARCHAR(50) DEFAULT('pending'),
    application_deadline TIMESTAMP with time ZONE,
    submission_date TIMESTAMP with time ZONE NOT NULL DEFAULT NOW(),
    award_outcome VARCHAR(1000),
    additional_text TEXT,
    block_anchor BOOLEAN,
    grund_id INT NOT NULL, 
    open_to_other_plots BOOLEAN,
    user_id INT NOT NULL,
    CONSTRAINT freiberg_user_fkey FOREIGN key (user_id)
        REFERENCES freiberg_user (id) match SIMPLE
        on update no action on delete CASCADE
)
WITH (
  OIDS=FALSE
);

DROP SEQUENCE IF EXISTS application_document_id_seq;
CREATE SEQUENCE application_document_id_seq;
ALTER SEQUENCE application_document_id_seq RESTART WITH 1;
DROP TABLE if EXISTS application_document CASCADE;
CREATE TABLE application_document
(
    id BIGSERIAL PRIMARY KEY,
    document_name varchar(256),
    date_uploaded TIMESTAMP with time ZONE NOT NULL DEFAULT NOW(),
    file_blob bytea NOT NULL,
    mime_type varchar(300) NOT NULL,
    encoding varchar(50) NOT NULL,
    file_size int NOT NULL,
    application_id INT,
    CONSTRAINT application_id_fkey FOREIGN key (application_id)
        REFERENCES property_application (id) match SIMPLE
        on update no action on delete CASCADE
)
WITH (
  OIDS=FALSE
);

