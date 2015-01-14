Scala
-----

 * Always specify an explicit sbt.version
 * Ensure you run in production with GC logging enabled
 * Prefer immutability
 * Use the latest patch version of either the latest, or second latest minor version of Scala (e.g. at the time of writing this is 2.11.4 or 2.10.4). If you have a dependency that isn't available for one of these versions, it's effectively dead and you should plan how to move away from it. 
