import { ModelEntry } from '../../src/engine/types';

// Each building appears once — on its completion date.
// Heights are architectural (to top of spire/pinnacle, not antenna).
// Heights in feet.
export const entries: ModelEntry[] = [
  { model: 'Woolworth Building',                lab: 'USA',          date: '1913-04-01', mmlu: 791 },
  { model: '40 Wall Street',                    lab: 'USA',          date: '1930-04-01', mmlu: 928 },
  { model: 'Chrysler Building',                 lab: 'USA',          date: '1930-10-01', mmlu: 1046 },
  { model: 'Empire State Building',             lab: 'USA',          date: '1931-05-01', mmlu: 1454 },
  { model: 'John Hancock Center',               lab: 'USA',          date: '1969-05-01', mmlu: 1129 },
  { model: 'Willis Tower',                      lab: 'USA',          date: '1973-10-01', mmlu: 1450 },
  { model: 'Bank of China Tower',               lab: 'Hong Kong',    date: '1990-05-01', mmlu: 1204 },
  { model: 'Central Plaza',                     lab: 'Hong Kong',    date: '1992-08-01', mmlu: 1227 },
  { model: 'Shun Hing Square',                  lab: 'China',        date: '1996-02-01', mmlu: 1260 },
  { model: 'CITIC Plaza',                       lab: 'China',        date: '1997-09-01', mmlu: 1283 },
  { model: 'Petronas Tower 1',                  lab: 'Malaysia',     date: '1998-02-01', mmlu: 1483 },
  { model: 'Petronas Tower 2',                  lab: 'Malaysia',     date: '1998-08-01', mmlu: 1483 },
  { model: 'Jin Mao Tower',                     lab: 'China',        date: '1999-08-01', mmlu: 1381 },
  { model: 'Two Int\'l Finance Centre',         lab: 'Hong Kong',    date: '2003-11-01', mmlu: 1352 },
  { model: 'Taipei 101',                        lab: 'Taiwan',       date: '2004-12-01', mmlu: 1667 },
  { model: 'Shanghai World Financial Center',   lab: 'China',        date: '2008-08-01', mmlu: 1614 },
  { model: 'Burj Khalifa',                      lab: 'UAE',          date: '2010-01-04', mmlu: 2717 },
  { model: 'Int\'l Commerce Centre',            lab: 'Hong Kong',    date: '2010-05-01', mmlu: 1588 },
  { model: 'Guangzhou IFC',                     lab: 'China',        date: '2010-11-01', mmlu: 1444 },
  { model: 'Makkah Royal Clock Tower',          lab: 'Saudi Arabia', date: '2012-06-01', mmlu: 1972 },
  { model: 'One World Trade Center',            lab: 'USA',          date: '2014-11-01', mmlu: 1776 },
  { model: 'Shanghai Tower',                    lab: 'China',        date: '2015-08-01', mmlu: 2073 },
  { model: '432 Park Avenue',                   lab: 'USA',          date: '2015-12-01', mmlu: 1398 },
  { model: 'Guangzhou CTF Finance Centre',      lab: 'China',        date: '2016-06-01', mmlu: 1739 },
  { model: 'Lotte World Tower',                 lab: 'South Korea',  date: '2017-04-01', mmlu: 1821 },
  { model: 'Ping An Finance Centre',            lab: 'China',        date: '2017-09-01', mmlu: 1965 },
  { model: 'CITIC Tower',                       lab: 'China',        date: '2018-08-01', mmlu: 1732 },
  { model: '30 Hudson Yards',                   lab: 'USA',          date: '2019-03-01', mmlu: 1270 },
  { model: 'Tianjin CTF Finance Centre',        lab: 'China',        date: '2019-09-01', mmlu: 1739 },
  { model: 'Merdeka 118',                       lab: 'Malaysia',     date: '2023-03-01', mmlu: 2228 },
];
