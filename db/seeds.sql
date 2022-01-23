INSERT INTO department (department_name)
VALUES
("Administration"),
("Billing"),
("Nursing"),
("Pharmacy"),
("Security"),
("Maintenance");

INSERT INTO role (title, salary, department_id)
VALUES
("Hospital Director", 340000.00, 1),
("Director of Operations", 250000.00, 1),
("Administrative Assistant", 80000.00, 1),
("Receptionist", 55000.00, 1),
("Billing Manager", 140000.00, 2),
("Billing Assistant", 82000.00, 2),
("Data Specialist", 78000.00, 2),
("Nursing Director", 140000.00, 3),
("Charge Nurse", 100000.00, 3),
("Nurse", 92000.00, 3),
("Nursing Assistant", 80000.00, 3),
("Pharmacy Director", 150000.00, 4),
("Charge Pharmacist", 125000.00, 4),
("Pharmacist", 98000.00, 4),
("Pharmacy Technician", 62000.00, 4),
("Head of Security", 90000.00, 5),
("Security Specialist", 76000.00, 5),
("Security Assistant", 60000.00, 5),
("Maintenance Manager", 58000.00, 6),
("Maintenance Assistant", 45000.00, 6),
("Maintenance Team Member", 37000.00, 6);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Zhongli", "Morax", 1, NULL),
("Ningguang", "Qixing", 2, 1),
("Baixiao", "", 3, 2),
("Baishi", "", 3, 2),
("Baiwen", "", 3, 2),
("Paimon", "", 4, 2),
("Katheryne", "", 4, 2),
("Xingqiu", "", 5, 2),
("Xu", "", 6, 3),
("Lisa", "", 7, 3),
("Zhao", "", 7, 3),
("Yanfei", "", 7, 3),
("Jean", "", 8, 1),
("Barbara", "", 9, 8),
("Kokomi", "Sangonomiya", 9, 8),
("Sayu", "", 10, 9),
("Shenhe", "", 10, 9),
("Ayaka", "Kamisato", 10, 9),
("Sara", "Kujou", 10, 9),
("Kazuha", "Kaedehara", 10, 9),
("Thoma", "", 10, 9),
("Bennett", "", 11, 9),
("Chongyun", "", 11, 9),
("Baizhu", "Bubu", 12, 1),
("Albedo", "", 13, 12),
("Sucrose", "", 13, 12),
("Gui", "", 14, 12),
("Gorou", "", 14, 12),
("Keqing", "", 14, 12),
("Yae Miko", "Narukami", 14, 12),
("QiQi", "", 15, 12),
("Diona", "", 15, 12),
("Dainsleif", "Keeper", 15, 12),
("Amy", "", 15, 12),
("Hu Tao", "", 15, 12),
("Yoimiya", "", 15, 12),
("Xiao", "", 16, 2),
("Diluc", "", 17, 16),
("Kaeya", "", 17, 16),
("Eula", "", 18, 16),
("Ganyu", "", 18, 16),
("Mona", "", 18, 16),
("Beidou", "", 18, 16),
("Noelle", "", 19, 2),
("Lyney", "Fontaine", 20, 19),
("Lynette", "Fontaine", 20, 19),
("YaoYao", "", 21, 19),
("Cyno", "Sumeru", 21, 19),
("Callei", "Barnabus", 21, 19),
("Iansan", "Natlan", 21, 19),
("Shinobu", "Kuki", 21, 19),
("Klee", "", 21, 19);