# Chao's Todo List&deadline list

A cloud todo list Based on jQeury and php.
一个云同步的待办事项表和截止日期表的web网站



## Feature
1. User System/用户系统
2. Cloud synchronization/云同步
   - 任何对待办事项的修改都会即时同步到数据库
   - Every real-time change about todo list item will be synchronized on cloud database
3. Todo list items restoration
   - 每次加载会从数据库获取最新数据
   - You can restore todo lists from any machine through your user account
4. Regular task items
  - 可以为一段日期添加同一个待办事项
  - Add same new items for several days
5. Deadline items on webpage
  - 增加了事项的截止日期功能
6. Deadline synchronizairon when there is change on it.
  - 实时同步截止日期事项
## Resources and Tech stack

- Bootstrap 4
- Fontawesome icon
- jQeury
- Secure Hash Algorithm (SHA256)
    - http://www.webtoolkit.info/
    - Original code by Angel Marin, Paul Johnston.
- Php
- Mysql 5.7

## Usage
1. Download sources and extract it on your www folder;
2. Create a new mysql database on your host where you want to deploy it; 
3. Create a new mysql account which can only access the new database (recommended);
4. Execute queries in /sql/todo.sql;
5. Modify database information in /core/Mysqlconnector.php according to the new-created database setting;
6. Then you can access it through web broswer.
Feel free to change any contents and use it according to MIT LICENSE.

创建mysql数据库并修改/core/MysqlConnector.php里面的数据库链接信息.





