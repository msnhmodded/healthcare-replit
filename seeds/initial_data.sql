-- Seed data for Somali Health Equity Collective
-- This provides initial content for the website

-- Insert sample workshops
INSERT INTO workshops (id, title, description, category, date, location, instructor, max_attendees) VALUES
('1', '{"en":"Diabetes Management Workshop","so":"Tababarka Maaraynta Diabeetada"}', '{"en":"Learn essential diabetes management techniques, nutrition planning, and blood sugar monitoring in a culturally responsive environment.","so":"Baro farsamooyinka muhiimka ah ee maaraynta sonkorowga, qorshaha nafaqada, iyo la socodka heerka sonkorowga dhigga gudaha deegaan dhaqan u waafaqsan."}', 'chronic-disease', '2024-02-15 14:00:00', 'Abu Hurairah Community Centre', 'Dr. Amina Hassan', 25),

('2', '{"en":"Mental Health First Aid","so":"Caawinta Dadka Caafimaad Xumo"}', '{"en":"Basic mental health support skills for Somali families, including recognizing signs of distress and connecting to culturally appropriate resources.","so":"Xirfadaha aasaasiga ah ee taageerada caafimaadka maskaxda qoysaska Soomaalida, oo ay ku jiraan aqoonsiga calaamdaha dhibka iyo ku xidhidhista kheyraadka ku habboon dhaqanka."}', 'mental-health', '2024-02-20 18:30:00', 'Khalid bin Waleed Centre', 'Sarah Mohamed, LCSW', 30),

('3', '{"en":"Navigating Canadian Healthcare","so":"Hagista Nidaamka Caafimaadka Canada"}', '{"en":"Understanding how to access healthcare services, book appointments, and advocate for yourself in the Canadian health system.","so":"Fahamka sida loo helo adeegyada caafimaadka, sida loo buuxiyo ballan-qaadyada, iyo sida loogu ololeeyo nafta nidaamka caafimaadka Canada."}', 'navigation', '2024-02-25 15:00:00', 'Toronto Public Health Office', 'Nurse Fatima Ali', 20),

('4', '{"en":"Heart Health Workshop","so":"Tababarka Caafimaadka Wadnaha"}', '{"en":"Preventing heart disease through lifestyle changes, understanding risk factors, and maintaining cardiovascular health.","so":"Ka hortagga cudurrada wadnaha iyada oo loo marayo isbeddelka hab-nololeedka, fahamka qorshaha halista, iyo ilaalinta caafimaadka wadnaha iyo xididdada dhiigga."}', 'chronic-disease', '2024-03-05 16:00:00', 'Community Health Centre', 'Dr. Omar Farah', 35);

-- Insert team members
INSERT INTO team_members (id, name, role, description, email, order_index) VALUES
('1', 'Ifrah Ismail', '{"en":"Project Director","so":"Agaasimaha Mashruuca"}', '{"en":"Leading healthcare equity initiatives and community partnerships across Toronto. Over 10 years of experience in public health and community development.","so":"Hoggaaminta hindisaha sinnaanta daryeelka caafimaadka iyo iskaashiga bulshada Toronto oo dhan. In ka badan 10 sano oo khibrad ah caafimaadka dadweynaha iyo horumarinta bulshada."}', 'ifrah@shec.org', 1),

('2', 'Ahmed Osman', '{"en":"Community Outreach Coordinator","so":"Isku-duubaridda Bulshada"}', '{"en":"Building bridges between the Somali community and healthcare providers. Specializes in culturally responsive health education and community engagement.","so":"Dhisidda buundooyinka u dhexeeya bulshada Soomaalida iyo bixiyeyaasha daryeelka caafimaadka. Takhasuska waxbarashada caafimaadka ee dhaqan u waafaqsan iyo ka-qaybgalka bulshada."}', 'ahmed@shec.org', 2),

('3', 'Dr. Amina Hassan', '{"en":"Health Education Specialist","so":"Takhasuska Waxbarashada Caafimaadka"}', '{"en":"Developing culturally appropriate health education materials and leading clinical workshops. Board-certified family physician with community health focus.","so":"Horumarinta agabka waxbarashada caafimaadka ee ku habboon dhaqanka iyo hoggaaminta tababarrada caafimaadka. Dhakhtarka qoyska ee shahaado leh oo diiradda saaraya caafimaadka bulshada."}', 'amina@shec.org', 3),

('4', 'Fadumo Ali', '{"en":"Program Coordinator","so":"Isku-duubka Barnaamijyada"}', '{"en":"Coordinating workshop schedules, managing registrations, and ensuring program quality. Background in social work and community health programming.","so":"Isku-duubka jadwalka tababarrada, maaraynta diwaangelinta, iyo hubinta tayada barnaamijka. Asalka shaqada bulshada iyo barnaamijinta caafimaadka bulshada."}', 'fadumo@shec.org', 4);

-- Insert health resources
INSERT INTO resources (id, title, description, category, type, url, is_featured) VALUES
('1', '{"en":"Diabetes Management Guide","so":"Tilmaamaha Maaraynta Diabeetada"}', '{"en":"Comprehensive guide to managing diabetes with culturally appropriate dietary advice and lifestyle recommendations for Somali families.","so":"Tilmaame dhamaystiran oo ku saabsan maaraynta sonkorowga oo leh talo cunto oo ku habboon dhaqanka iyo talocelin hab-nololeed oo loogu talagalay qoysaska Soomaalida."}', 'guides', 'pdf', 'https://example.com/diabetes-guide-somali.pdf', 1),

('2', '{"en":"Healthy Eating for Somali Families","so":"Cunto Caafimaad leh Qoysaska Soomaalida"}', '{"en":"Nutrition guide featuring traditional Somali foods and how to maintain cultural eating practices while improving health outcomes.","so":"Tilmaamaha nafaqada oo ay ku jiraan cuntooyinka dhaqameedka Soomaalida iyo sida loo ilaalin karo dhaqamada cunitaanka dhaqanka halka la hagaajinayo natiijooyinka caafimaadka."}', 'nutrition', 'pdf', 'https://example.com/nutrition-guide-somali.pdf', 1),

('3', '{"en":"Mental Health Resources in Somali","so":"Kheyraadka Caafimaadka Maskaxda Af-Soomaaliga"}', '{"en":"Directory of mental health services available in Somali language, including crisis support and ongoing counseling options.","so":"Buugga-xogta adeegyada caafimaadka maskaxda ee lagu heli karo af-Soomaaliga, oo ay ku jiraan taageerada xaaladaha xasaasiga ah iyo doorashooyinka la-talinta joogtada ah."}', 'directory', 'link', 'https://example.com/mental-health-directory', 0),

('4', '{"en":"Healthcare Navigation Video Series","so":"Taxanaha Fiidiyowga Hagista Daryeelka Caafimaadka"}', '{"en":"Step-by-step video guides on booking appointments, understanding health cards, and communicating with healthcare providers in Ontario.","so":"Hagayaasha fiidiyowga tallaabo-tallaabo oo ku saabsan buuxinta ballan-qaadyada, fahamka kaararka caafimaadka, iyo la xidhiidhka bixiyeyaasha daryeelka caafimaadka Ontario."}', 'videos', 'video', 'https://example.com/healthcare-navigation-videos', 1),

('5', '{"en":"Prescription Medicine Safety","so":"Badbaadada Dawooyinka Qoraalka leh"}', '{"en":"Important information about taking prescription medications safely, understanding dosage instructions, and managing side effects.","so":"Macluumaad muhiim ah oo ku saabsan qaadashada dawooyinka qoraalka leh si badbaado ah, fahamka tilmaamaha qiyaasta, iyo maaraynta waxyeelada."}', 'guides', 'pdf', 'https://example.com/prescription-safety.pdf', 0),

('6', '{"en":"Community Health Assessment Form","so":"Foomka Qiimaynta Caafimaadka Bulshada"}', '{"en":"Anonymous survey to help us understand the health needs and priorities of our community members.","so":"Sahmin aan magac lahayn si naga caawinaysa in aan fahanno baahiyaha caafimaadka iyo mudnaanshaha xubnaha bulshadeenna."}', 'forms', 'link', 'https://forms.gle/example-health-assessment', 0);

-- Insert community partners
INSERT INTO community_partners (id, name, description, website, contact_email, partnership_type, is_active) VALUES
('1', 'Abu Hurairah Community Centre', '{"en":"Primary community partner providing workshop venues and cultural programming support.","so":"Saaxiibka ugu weyn ee bulshada oo bixiya goobaha tababarrada iyo taageerada barnaamijyada dhaqanka."}', 'https://abuhurairahcentre.ca', 'info@abuhurairahcentre.ca', 'community', 1),

('2', 'Khalid bin Waleed Centre', '{"en":"Community organization focused on youth programming and family services in the Somali community.","so":"Urur bulsheed oo diiradda saaraya barnaamijyada dhalinyarada iyo adeegyada qoyska bulshada Soomaalida."}', 'https://kwcentre.org', 'contact@kwcentre.org', 'community', 1),

('3', 'Toronto Public Health', '{"en":"Official health authority providing clinical oversight and evidence-based health information.","so":"Maamulka caafimaadka rasmiga ah ee bixiya kormeerka caafimaadka iyo macluumaadka caafimaadka ee ku saleysan caddaymaha."}', 'https://toronto.ca/public-health', 'publichealth@toronto.ca', 'healthcare', 1),

('4', 'University of Toronto - Dalla Lana School of Public Health', '{"en":"Academic partner supporting research initiatives and student placement programs.","so":"Saaxiibka tacliinta ee taageeraya hindisaha cilmi-baadhista iyo barnaamijyada meelaynta ardayda."}', 'https://dlsph.utoronto.ca', 'research@dlsph.utoronto.ca', 'educational', 1);