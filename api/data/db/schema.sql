-- Table: "Boards"

-- DROP TABLE "Boards";

CREATE TABLE "Boards"
(
  id bigserial NOT NULL,
  name character varying(1024),
  CONSTRAINT "Boards_pkey" PRIMARY KEY (id)
);


-- Table: "Issues"

-- DROP TABLE "Issues";

CREATE TABLE "Issues"
(
  id bigserial NOT NULL,
  name character varying(1024),
  description text,
  "boardId" bigserial NOT NULL,
  status character varying(1024),
  "order" integer,
  CONSTRAINT "Issues_pkey" PRIMARY KEY (id),
  CONSTRAINT "Issues_boardId_fkey" FOREIGN KEY ("boardId")
      REFERENCES "Boards" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE
);

-- Table: "Users"

-- DROP TABLE "Users";

CREATE TABLE "Users"
(
  id bigserial NOT NULL,
  email character varying(1024),
  "boardId" bigserial NOT NULL,
  CONSTRAINT "Users_pkey" PRIMARY KEY (id),
  CONSTRAINT "Users_boardId_fkey" FOREIGN KEY ("boardId")
      REFERENCES "Boards" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
