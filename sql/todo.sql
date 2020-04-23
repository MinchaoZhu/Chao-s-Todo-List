create table if not exists `user`(
    `user_id` int unsigned auto_increment,
    `user_name` varchar (64) unique not null check (`user_name`!="null"),
    `user_password_hash` char(64) not null,
    `user_email` varchar (128) unique not null,
    primary key (`user_id`),
    index (`user_name`),
    index (`user_email`)
)engine=innodb default charset=utf8;

create table if not exists `todo_status`(
    `todo_status_id` tinyint unsigned auto_increment,
    `todo_status_type` varchar(32),
    primary key(`todo_status_id`)
)engine=innodb default charset=utf8;
insert into `todo_status` values (null, 'undone');
insert into `todo_status` values (null, 'done');

create table if not exists `todo_list`(
    `todo_id` int unsigned auto_increment,
    `user_name` varchar (64) not null,
    `todo_detail` varchar(128) not null,
    `todo_status_id` tinyint unsigned not null,
    `date` date not null,
    `serial` tinyint unsigned not null,
    primary key (`todo_id`),
    index (`user_name`),
    index (`date`),
    foreign key (`user_name`) references `user` (`user_name`),
    foreign key (`todo_status_id`) references `todo_status` (`todo_status_id`)
)engine=innodb default charset=utf8;

create table if not exists `regular_todo_list`(
    `regular_todo_id` int unsigned auto_increment,
    `user_name` varchar (64) not null,
    `todo_detail` varchar(128) not null,
    `start_date` date not null,
    `end_date` date not null,
    primary key (`regular_todo_id`),
    index (`user_name`),
    index (`start_date`),
    index (`end_date`),
    foreign key (`user_name`) references `user` (`user_name`)
)engine=innodb default charset=utf8;

