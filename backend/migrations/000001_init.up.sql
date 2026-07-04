CREATE TABLE page_views (
    id         INTEGER  PRIMARY KEY AUTOINCREMENT,
    path       TEXT     NOT NULL,
    visited_at DATETIME NOT NULL DEFAULT (datetime('now'))
);
