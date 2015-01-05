Services
--------

 * a service should have one team responsible for it
 * a service may consist of one or many applications
 * only one service should have access to any data store
 * there should be a clear division between endpoints intended for intra and inter service communication
 * each service should live in its own repository
 * the repository should have a README at it's root that describes at least:
   * the purpose of the service
   * the role of any applications that make up that service if there is more than one
   * how to run it locally
   * example URLs for the service, when run locally and in production
