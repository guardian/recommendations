Scala
-----

 * Always specify an explicit sbt.version
 * Ensure you run in production with GC logging enabled
 * Prefer immutability
 * Prefer the latest version of Scala
 * If some dependencies are unavailable for the latest version, it is acceptable to use the latest patch version of the previous minor version but try to avoid it. At the time of writing 2.12.2 is the latest version, so 2.11.11 may be acceptable. If you have a dependency that isn't available for one of these versions, it's effectively dead and you should plan how to move away from it. 
 * If you come to a codebase using an older version of Scala, it should be upgraded before any new features are added.
 * Run on a [version of the JVM with public updates](http://www.oracle.com/technetwork/java/eol-135779.html#javase). At the time of writing this means JDK8 or 9.
 * Avoid dependency injection in general. 
 
[Dependency injection](https://en.wikipedia.org/wiki/Dependency_injection) is a software design pattern that implements [inversion of control](https://en.wikipedia.org/wiki/Inversion_of_control) between a `client` and a `service` for resolving dependencies. The term `injection` refers to a third party (named `the injector`) which is responsible for constructing the services and injecting them into the client. Usual `injectors`are dependency injection frameworks such as `guice`, `dagger`, `macwire`, `spring`. 

Instead of `injecting` your dependencies, you should simply [pass them as parameters](http://debasishg.blogspot.com/2011/03/pushing-envelope-on-oo-and-functional.html) of functions you are calling. This enable [referential transparency](https://en.wikipedia.org/wiki/Referential_transparency) of your programs.

Most of the time, dependency injection does not solve a real business problem. You don't need to have a single place where you define which concrete instance your trait should be used. This is`accidental complexity`, as coined by Fred Brooks in [No Silver Bullet](https://en.wikipedia.org/wiki/No_Silver_Bullet)  

With [The play framework](https://www.playframework.com/) you should always use [compile-time dependency injection](https://www.playframework.com/documentation/2.5.x/ScalaCompileTimeDependencyInjection) which refers to an object oriented way to specify your components declaratively in scala.




