Scala
-----

 * Always specify an explicit sbt.version
 * Ensure you run in production with GC logging enabled
 * Prefer immutability
 * Prefer the latest version of Scala
 * If some dependencies are unavailable for the latest version, it is acceptable to use the latest patch version of the previous minor version but try to avoid it. At the time of writing 2.11.8 is the latest version, so 2.10.4 may be acceptable. If you have a dependency that isn't available for one of these versions, it's effectively dead and you should plan how to move away from it. 
 * If you come to a codebase using an older version of Scala, it should be upgraded before any new features are added.
 * Run on a [version of the JVM with public updates](http://www.oracle.com/technetwork/java/eol-135779.html#javase). At the time of writing this means JDK8 or 9.
 * Avoid dependency injection in general. Most of the time, dependency injection does not solve a real problem. You don't need to have a single place where you define which concrete instance your trait should be used. If you have to use dependency injection always use [compile-time dependency injection](https://www.playframework.com/documentation/2.5.x/ScalaCompileTimeDependencyInjection).  
