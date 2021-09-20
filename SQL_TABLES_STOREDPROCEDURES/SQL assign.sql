--contact table--
create table tbl_contact1 ( contact_id int primary key, 
contact_date datetime default getdate(), 
user_Name varchar(50) not null,
mob_no  varchar(10) not null,
email_id varchar(50) not null, 
contact_message varchar(100) not null,
status varchar(50) not null default 'message received',
created_by varchar(50) not null default 'tripu',
created_date datetime not null default getdate(),
modified_by varchar(50) not null,
modified_date datetime not null default getdate(),
recordstatus bit default 1,
rowguid varchar(max) default newid() )


insert into tbl_contact1 (contact_id,user_Name,mob_no,email_id,contact_message,modified_by) values (101,'tripu','9945673434','tripu@gmail.com','I need a booking status ','kalai')

/*update*/
CREATE PROCEDURE update_contact 
@contact_id int, 
@status varchar(50)
AS
BEGIN
UPDATE tbl_contact1 SET status= @status WHERE contact_id = @contact_id ;
END;
execute dbo.update_contact 101,'pending'

select * from tbl_contact1

/*insert*/
CREATE PROCEDURE insert_contact
@contact_id int,
@user_Name varchar(50),
@mob_no  varchar(10),
@email_id varchar(100),
@contact_message varchar(200),
@modified_by varchar(50)
AS
BEGIN
INSERT INTO [dbo].[tbl_contact1] ([contact_id],[user_Name],[mob_no],[email_id],[contact_message],[modified_by])
     VALUES (@contact_id ,@user_Name ,@mob_no ,@email_id , @contact_message ,  @modified_by )
END;
 execute dbo.insert_contact 103,'kalai','9867452325','kalai@gmail.com','i need a steps to book ticket in irctc','priya';

 /*select*/
 create procedure select_contact
 @contact_id int
 as
 begin
 select * from  tbl_contact1 where contact_id =  @contact_id
 end
 execute dbo.select_contact 102

 /*list*/
 create procedure list_contact
 as
 begin
 select * from  tbl_contact1 
 end
 execute dbo.list_contact 

--master table for journeyclass--
create table journeyclass_tbl(journey_id int primary key,journey_class varchar(50) not null, quota varchar(50),createdBy varchar(50) not null default 'tripu',
createdDate datetime not null default getDate(),
modifiedBy varchar(50) not null default 'tripu',
modifiedDate datetime not null default getDate(),
RecordStatus bit default 1,
RowGUID varchar(max) default newid())
select * from journeyclass_tbl
