Just a quick and dirty script to process a top list of domains and extract metadata out of them.

The CSV is downloaded from: https://moz.com/top500

To rebuild the domain list, run:
```
node build-json.js
```

This should write a list to `domains.json`.  Then to re-run the metadata processing, run:
```
node scrape.js
```

This should write a list of metadata to `metadata.json`