INSERT INTO region_prices (region_id, region_name) VALUES
(1, 'US-East'),
(2, 'Europe-West'),
(3, 'Asia-South');

INSERT INTO resource_prices (id, cost, region_id, resource_type) VALUES
(4, 120.5, 1, 'Compute'),
(5, 300.0, 1, 'Database'),
(6, 75.25, 1, 'Storage'),
(7, 150.0, 2, 'Compute'),
(8, 350.0, 2, 'Database'),
(9, 80.0, 2, 'Storage'),
(10, 110.0, 3, 'Compute'),
(11, 280.0, 3, 'Database'),
(12, 70.0, 3, 'Storage');
