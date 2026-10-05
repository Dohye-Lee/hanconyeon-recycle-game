CREATE TABLE `rooms` (
	`code` text PRIMARY KEY NOT NULL,
	`config` text NOT NULL,
	`items` text NOT NULL,
	`total` integer NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE `scores` ADD `room` text;