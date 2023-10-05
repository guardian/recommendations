Containers
======================

## Installing a container runtime

> [!WARNING]  
> Do not use Docker Desktop to install Docker on MacOS. [As of Aug 2021 we need a license to use Docker Desktop at the Guardian.](https://www.docker.com/blog/updating-product-subscriptions/)

MacOS doesn't support Containers natively. This unfortunately means that at the moment we need to create a Linux VM in order to run any kind of Container on our devices.

Fortunately, there exists a number of tools to help us setup a VM and use it seamlessly as if we were running containers on our host machine. Docker Desktop is one of such tools, but as previously mentioned we can't use that without a license.

### Podman

An alternative to Docker Desktop is [Podman](https://podman.io/docs/installation). Podman is a tool built by RedHat as a complete replacement for Docker. Its completely compliant with [OCI](https://opencontainers.org/) meaning that it can run any Container that Docker can run, plus more.

Podman copies most of Dockers CLI commands, so if you're used to Docker switching to Podman should be fairly straightforward, in many cases you can just create an alias from docker to podman and that'll work fine.

### Minikube

If you don't want to, or can't, make the switch over to Podman you can use [Minikube](https://minikube.sigs.k8s.io/docs/tutorials/docker_desktop_replacement/) instead. Like Docker Desktop, minikube also takes care of creating a VM on MacOS where containers can be ran and making it seamless to use Docker on MacOS

Minikube also sets up a Development Kubernetes cluster that you can use for learning, or as an alternative to docker-compose

## Building a Container Image

### Use small base images

Theres thousands of base images you could choose from when building an image. Finding a good base image is one of the most important parts of your building your own image. Ideally your base image should include as little as possible, just the bare minimum to run your app, this helps reduce your final image size and also reduce the potential attack surface.

 - [Alpine](https://hub.docker.com/_/alpine) is a very commonly used base image. Its extremely small image just being 5MB in size. By itself it probably doesn't have what you need, but you'll find that popular images tend to publish Alpine versions. [Node for example](https://hub.docker.com/_/node)adds the `-alpine` suffix to any images that use an Alpine base.
 - [Distroless](https://github.com/GoogleContainerTools/distroless) Google maintains a number of images that are completely stripped down to what is absolutely necessary, they are even smaller than Alpine images. This can mean they don't even include standard system libraries that we take for granted such as libssl!

Alpine is a good start for building small images, its not quite as small as Distroless but its a lot easier to work with.

### Avoid packaging intermediate files / code / build tools into your final Image

Similar to Git, any files that get added to an image will remain in its history and can be restored even if they're deleted before the end of the build. This is to consider when optimizing your images for size as including something such as a `node_modules` folder before it has been bundled can quickly balloon your image size to be orders of magnitude larger than it needs to be.

Theres 2 ways you can avoid this issue:
  - **A**. Build your application outside of the Image build environment, and then copy your final build artifacts into the image.
  - **B**. [Use a multi-stage build](https://docs.docker.com/build/building/multi-stage/), files added in a previous build stage won't be included in the next build stage unless specified.

### Use `buildah` to compile images

Buildah is another open source tool developed by Redhat, it produces OCI compliant images meaning they can generally be run in both Docker and Podman. 

You may also want to consider renaming `Dockerfiles` to `Containerfiles`. 

## Publishing a Container Image

Instead of using the Docker container registry we recommend using [GitHubs built in Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry). This registry is free to use and has no limits for any public repositories and also integrates extremely well with Github Actions.

Below is an example Github workflow which handles the build and publishing of a container image to Github Container Registry.

```yaml
on:
  push:

jobs:
  image:
    runs-on: ubuntu-latest

    permissions:
      packages: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      # Slugify branch name and add it to environment variables
      - name: Inject slug/short variables
        uses: rlespinasse/github-slug-action@v4

      - name: Build Container Image
        id: build_image
        uses: redhat-actions/buildah-build@v2.12
        with:
          image: dotcom-rendering
          tags: ${{ github.sha }} ${{ env.GITHUB_REF_SLUG }}
          context: ./
          containerfiles: ./dotcom-rendering/Containerfile

      - name: Push Image To GHCR
        uses: redhat-actions/push-to-registry@v2.7
        id: push
        with:
          image: ${{ steps.build_image.outputs.image }}
          tags: ${{ steps.build_image.outputs.tags }}
          registry: ghcr.io/guardian
          username: ${{ github.actor }}
          password: ${{ github.token }}
```

> [!NOTE]  
> Github Container Registry is shared by the entire organization so be mindful of what image name you choose. Ideally use your repository name as the image name.
