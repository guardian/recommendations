Elasticsearch
-------------

 * Always use explicit index mappings
 * discovery.zen.minimum_master_nodes should be > half your cluster size
 * use doc_values if you're doing large amounts of aggregation queries
