SELECT * FROM read_csv_auto('flights.csv')
  where UniqueCarrier= {{ context.params.UniqueCarrier | is_required }}