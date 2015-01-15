Scala
-----

 * Always specify an explicit sbt.version
 * Ensure you run in production with GC logging enabled
 * Prefer immutability
 * Prefer the latest version of Scala
 * If some dependencies are unavailable for the latest version, it is acceptable to use the latest patch version of the previous minor version. At the time of writing 2.11.5 is the latest version, so 2.10.4 would be acceptable. If you have a dependency that isn't available for one of these versions, it's effectively dead and you should plan how to move away from it. 
 * If you come to a codebase using an older version of Scala, it should be upgraded before any new features are added.
