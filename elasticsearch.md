Elasticsearch
-------------

## Security

- Never expose ES ports to the internet! It has no security by default.
- Disable dynamic scripting unless absolutely necessary, see [Elasticsearch docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html).

## Backups & Recovery

Regular snapshots of your cluster can provide restore points if data is lost.  See: https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-snapshots.html

If you have the [AWS Plugin](https://github.com/elastic/elasticsearch-cloud-aws) installed you can perform snapshots to S3.

<!-- alex ignore master -->
Some examples of scripts used to setup and run S3 snapshots: https://github.com/guardian/grid/tree/master/elasticsearch/scripts

You can watch snapshots in progress: `curl $ES_URL:9200/_snapshot/_status`

## Settings

 * Always use explicit index mappings
 * discovery.zen.minimum_master_nodes should be (n/2 + 1) where n is the number of nodes in your cluster
 * use doc_values if you're doing large amounts of aggregation queries

See settings for dynamic scripting here: https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html 

## Upgrading

Modifying or upgrading your ES cluster (for anything other than API level config changes) generally involves a rolling restart operation.

See: https://www.elastic.co/guide/en/elasticsearch/guide/current/_rolling_restarts.html

## Instances

The instance type you require is quite dependant on the amount of data you have and the queries and aggregation you perform. 

Some rough guidelines: 

- Greater than 4GB of memory (though 2GB has been known to work).
- To protect against data loss a cluster should have at least 3 nodes, preferably distributed accross availability zones.
- Assign ~50% of instance memory to ES: This can be done by setting the `ES_HEAP_SIZE` environment variable. See https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-configuration.html.

## Monitoring

- The Head Plugin provides a visual overview of cluster health & shard status.
- Export statistics to Cloudwatch with https://github.com/guardian/elasticsearch-cloudwatch
- Watch recoverery of nodes using:
```sh
#!/bin/bash

ES_URL=$1

watch -d "curl -s $ES_URL:9200/_cat/recovery?v | grep -v done | sort"
```
