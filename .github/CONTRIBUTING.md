# Contributing

We want this community to be friendly and respectful to each other. Please follow it in all your interactions with the project.

## Prerequisites

Before contributing to Carbon Reacti Native, you should make sure you have the following tools
installed:

- Make sure to have the [React Native](https://reactnative.dev/) CLI installed and working on your machine. You should follow this steps [here](https://reactnative.dev/docs/environment-setup?os=macos&platform=ios) to configure your environment for IOS and Android.
- [Node.js](https://nodejs.org/en/download/) v18 or above here or follow their
  installation through a package manager
  [here](https://nodejs.org/en/download/package-manager/))
  - If you're on macOS, we recommend using
    [`nvm`](https://github.com/nvm-sh/nvm) to help manage different versions of
    Node.js [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) as your
    version manager for Node.
- Git

You'll also need a code editor to make changes to Carbon Reacti Native. There are many to
choose from but some popular options are
[VSCode](https://code.visualstudio.com/), [Atom](https://atom.io), and
[Sublime](https://www.sublimetext.com/).

With that all in place, you're ready to start contributing to Carbon for React Native!

## - Setting up your environment -

### 1. Fork the repo:

Go to
[Carbons for React Native repository on GitHub](https://github.com/carbon-design-system/carbon-react-native)
and click the `Fork` button in the top-right corner. This will create a copy
repo of Carbon for React Native associated with your account.

### 2. Clone your fork:

1.  Go to your [GitHub Repositories](https://github.com/settings/repositories).
1.  Click on `[your_github_username]/carbon-react-native`.
1.  Click on the `Code` button and copy the URL from the `Clone with SSH`
    option. It should start with `git@github.com...`

In your terminal:

```sh
git clone git@github.com:[your_github_username]/carbon-react-native.git
cd carbon-react-native
```

See [GitHub docs](https://help.github.com/articles/fork-a-repo/) for more
details.

### 3. Add upstream remotes

When you clone your forked repo, running `git remote -v` will show that the
`origin` is pointing to your forked repo by default.

Now you need to add the `carbon-design-system/carbon-react-native` repo as your upstream
remote branch:

```sh
# Add the upstream remote to your repo
git remote add upstream git@github.com:carbon-design-system/carbon-react-native.git

# Verify the remote was added
git remote -v
```

Your terminal should output something like this:

```sh
origin  [your forked repo] (fetch)
origin  [your forked repo] (push)
upstream    git@github.com:carbon-design-system/carbon-react-native.git (fetch)
upstream    git@github.com:carbon-design-system/carbon-react-native.git (push)
```

Great job on getting to this point! Now it's time to code :computer:

## Development workflow

To get started with the project, run `npm ci` in the root directory to install the required dependencies for each package:

While developing, you can run the [example app](/example/) to test your changes. Any changes you make in your library's JavaScript code will be reflected in the example app without a rebuild. If you change any native code, then you'll need to rebuild the example app.

To run the example app `cd` into the `/examples` directory and run it like you would a normal React Native project. You may need to go into `ios` directory and use `pod install` if first time.

Make sure your code passes TypeScript and ESLint. Run the following to verify:

```sh
npm run typescript
npm run lint
```

To fix formatting errors, run the following:

```sh
npm run lint --fix
```

Remember to add tests for your change if possible. Run the unit tests by:

```sh
npm run test
```

### Commit message convention

We follow the [conventional commits specification](https://www.conventionalcommits.org/en) for our commit messages:

- `fix`: bug fixes, e.g. fix crash due to deprecated method.
- `feat`: new features, e.g. add new method to the module.
- `refactor`: code refactor, e.g. migrate from class components to hooks.
- `docs`: changes into documentation, e.g. add usage example for the module..
- `test`: adding or updating tests, e.g. add integration tests using detox.
- `chore`: tooling changes, e.g. change CI config.

Our pre-commit hooks verify that your commit message matches this format when committing.

### Linting and tests

[ESLint](https://eslint.org/), [TypeScript](https://www.typescriptlang.org/)

We use [TypeScript](https://www.typescriptlang.org/) for type checking, [ESLint](https://eslint.org/) for linting and formatting the code, and [Jest](https://jestjs.io/) for testing.

Our pre-commit hooks verify that the linter and tests pass when committing.

### Publishing to npm

We use [release-it](https://github.com/release-it/release-it) to make it easier to publish new versions. It handles common tasks like bumping version based on semver, creating tags and releases etc.

To publish new versions, run the following:

```sh
npm run release
```

### Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github).

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that linters and tests are passing.
- Review the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.
- For pull requests that change the API or implementation, discuss with maintainers first by opening an issue.

## Code of Conduct

### Our Pledge

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community.

### Our Standards

Examples of behavior that contributes to a positive environment for our community include:

- Demonstrating empathy and kindness toward other people
- Being respectful of differing opinions, viewpoints, and experiences
- Giving and gracefully accepting constructive feedback
- Accepting responsibility and apologizing to those affected by our mistakes, and learning from the experience
- Focusing on what is best not just for us as individuals, but for the overall community

Examples of unacceptable behavior include:

- The use of sexualized language or imagery, and sexual attention or
  advances of any kind
- Trolling, insulting or derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or email
  address, without their explicit permission
- Other conduct which could reasonably be considered inappropriate in a
  professional setting

### Enforcement Responsibilities

Community leaders are responsible for clarifying and enforcing our standards of acceptable behavior and will take appropriate and fair corrective action in response to any behavior that they deem inappropriate, threatening, offensive, or harmful.

Community leaders have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, and will communicate reasons for moderation decisions when appropriate.

### Scope

This Code of Conduct applies within all community spaces, and also applies when an individual is officially representing the community in public spaces. Examples of representing our community include using an official e-mail address, posting via an official social media account, or acting as an appointed representative at an online or offline event.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the community leaders responsible for enforcement at [INSERT CONTACT METHOD]. All complaints will be reviewed and investigated promptly and fairly.

All community leaders are obligated to respect the privacy and security of the reporter of any incident.

### Enforcement Guidelines

Community leaders will follow these Community Impact Guidelines in determining the consequences for any action they deem in violation of this Code of Conduct:

#### 1. Correction

**Community Impact**: Use of inappropriate language or other behavior deemed unprofessional or unwelcome in the community.

**Consequence**: A private, written warning from community leaders, providing clarity around the nature of the violation and an explanation of why the behavior was inappropriate. A public apology may be requested.

#### 2. Warning

**Community Impact**: A violation through a single incident or series of actions.

**Consequence**: A warning with consequences for continued behavior. No interaction with the people involved, including unsolicited interaction with those enforcing the Code of Conduct, for a specified period of time. This includes avoiding interactions in community spaces as well as external channels like social media. Violating these terms may lead to a temporary or permanent ban.

#### 3. Temporary Ban

**Community Impact**: A serious violation of community standards, including sustained inappropriate behavior.

**Consequence**: A temporary ban from any sort of interaction or public communication with the community for a specified period of time. No public or private interaction with the people involved, including unsolicited interaction with those enforcing the Code of Conduct, is allowed during this period. Violating these terms may lead to a permanent ban.

#### 4. Permanent Ban

**Community Impact**: Demonstrating a pattern of violation of community standards, including sustained inappropriate behavior, harassment of an individual, or aggression toward or disparagement of classes of individuals.

**Consequence**: A permanent ban from any sort of public interaction within the community.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 2.0,
available at https://www.contributor-covenant.org/version/2/0/code_of_conduct.html.

Community Impact Guidelines were inspired by [Mozilla's code of conduct enforcement ladder](https://github.com/mozilla/diversity).

[homepage]: https://www.contributor-covenant.org

For answers to common questions about this code of conduct, see the FAQ at
https://www.contributor-covenant.org/faq. Translations are available at https://www.contributor-covenant.org/translations.
