## Setup

```bash
cyyeh@JimmydeMBP duckdb-nodejs % duckdb tpch.db
v0.8.1 6536a77232
Enter ".help" for usage hints.
D INSTALL 'tpch';
D LOAD 'tpch';
D CALL dbgen(sf=10);
100% ▕████████████████████████████████████████████████████████████▏ 
┌─────────┐
│ Success │
│ boolean │
├─────────┤
│ 0 rows  │
└─────────┘
D .exit
```