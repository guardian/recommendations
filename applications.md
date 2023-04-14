Applications
------------

 * applications should be responsible for a single purpose. This implies:
   * dependent on at most one external service responding in order to respond to a request
   * scale based on one metric, e.g. queue length, response time
 * applications should be deployed based on an artifact built by GitHub Actions
 * applications should be deployed by RiffRaff
