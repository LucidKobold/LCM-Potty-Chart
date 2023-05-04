<p align="center">
  <a href="https://github.com/LucidCreationsMedia/LCM-Potty-Chart/actions/workflows/main.yml"><img alt="CI Status Badge" src="https://github.com/LucidCreationsMedia/LCM-Potty-Chart/actions/workflows/main.yml/badge.svg?branch=main" /></a>
  <a href="https://github.com/LucidCreationsMedia/LCM-Potty-Chart/actions/workflows/codeql-analysis.yml"><img alt="CodeQL Analysis" src="https://github.com/LucidCreationsMedia/LCM-Potty-Chart/actions/workflows/codeql-analysis.yml/badge.svg?branch=main" /></a>
    <a href="https://github.com/LucidCreationsMedia/LCM-Potty-Chart/actions/workflows/njsscan-analysis.yml"><img alt="CodeQL Analysis" src="https://github.com/LucidCreationsMedia/LCM-Potty-Chart/actions/workflows/njsscan-analysis.yml/badge.svg?branch=main" /></a>
</p>

<p align="center">
    <a href="https://ko-fi.com/L4L2F0JQA"><img alt="Ko-fi donation button" src="https://ko-fi.com/img/githubbutton_sm.svg" /></a>
</p>

# [LCM Potty Chart](https://lucidcreations.media/)

## About

This app is meant to be a progress tracker for littles and bigs to track progress and behaviors.

The types of progress can be anything from:

- Potty Training
- Diaper Training
- Behavior Tracking
- Eating Habits
- Other Habit Tracking
- Learning New Skills
  - Dedicating certain amount of hours a day to a new skill or talent
- Whatever else a little and big would want to track

Positive days will be given "stars" or happy designs where negative days will be given rain clouds or sad designs.

A big will be able to track as many littles as they desire and can create multiple charts for each little they have. How you use the charts and trackers is up to you.

Give descriptions to each sticker you use and make a list of rules for each chart and how to earn the stars and what would result in a rain cloud.

Send encouraging messages to your little.

Track your friends progress and allow your friends to track your progress.

# Technologies

## TypeScript

[<img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" height="100px">](https://www.typescriptlang.org/)

> [TypeScript](https://www.typescriptlang.org/) is a strongly typed programming language which builds on JavaScript giving you better tooling at any scale.

## Next.js

[![Next.js](https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg)](https://nextjs.org/)

> [Next.js](https://nextjs.org/) is a serverless, zero config React framework.

The React Framework for Production

## Chakra UI

[<img src="https://gist.githubusercontent.com/navin-moorthy/d4c5fe7f384a106ba8171eee77b45623/raw/3e4d37340270a38367bfe94dd2f7daea2a0537a2/chakra-ui-logo.svg" height="75px" alt="Chakra UI" >](https://chakra-ui.com/)

> [Chakra UI](https://chakra-ui.com/) is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications.

# Getting Started

## Requirements

The app was built on and is tested for:

- Ubuntu 20.04
- Node.js 14.x
- Node.js 16.x
- Node.js 18.x
- Node.js 20.x

I cannot guarantee functionality or stability if used on other OSs Ubuntu versions or Node.js versions.

## Installation

After cloning the app you will need to install the dependencies and packages. The app uses Yarn v2. Run this command to install using Yarn v2:

```bash
yarn install
```

### Upgrading Packages

The `upgrade-interactive` plugin has been included in this app. To ungrade packages and dependencies run the following command:

```bash
yarn upgrade-interactive
```

The plugin `upgrade-interactive` is a combination of the `yarn outdated` and `yarn upgrade [package...]` commands. Where `yarn outdated` displays the list of outdated packages and `yarn upgrade [package...]` can then be used to upgrade desired packages, `yarn upgrade-interactive` displays the same outdated package list and lets you immediately chose which to upgrade.

To learn more about the `upgrade-interactive` plugin please read the [official docs](https://classic.yarnpkg.com/lang/en/docs/cli/upgrade-interactive/).

## Environment Variables

_[Learn more about environment variables in Next.js](https://nextjs.org/docs/basic-features/environment-variables)_

Copy the files and remove the `example.` prefix to use them.

- .env

```env
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

# This is for local/dev. Make sure to update ./prisma/schema.prisma to use the dev config.
DATABASE_URL="postgresql://postgres:randompassword@localhost:5432/dbname?schema=public"

# These are values from Vercel. Make sure to update ./prisma/schema.prisma to use the vercel config.
POSTGRES_DATABASE="dbname"
POSTGRES_PASSWORD="randompassword"
POSTGRES_HOST="region.postgres.vercel-storage.com"
POSTGRES_USER="postgres"
POSTGRES_PRISMA_URL="postgres://postgres:randompassword@region.postgres.vercel-storage.com/dbname?pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NON_POOLING="postgres://postgres:randompassword@region.postgres.vercel-storage.com/dbname"
POSTGRES_URL="postgres://postgres:randompassword@region.postgres.vercel-storage.com/dbname"
```

- .env.local

```env
# This section is only applicable during the beta and will be removed when the app is completed.
NEXT_PUBLIC_APP_VERSION="0.2.0"
# Beta version info
NEXT_PUBLIC_NEW_TUTORIAL_VERSION="0.2.0"
# Last version the tutorial was updated
NEXT_PUBLIC_LAST_UPDATE_DATE="2022-06-24T15:47:01.833Z"
# Time updated
NEXT_PUBLIC_APP_VERSION_HEADER="v0.2.0-beta"
# Header Version

# Auth Secrets
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=""
# https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx
# Used when sending emails to users
EMAIL_SERVER_USER=""
EMAIL_SERVER_PASSWORD=""
SMTP_SERVER_HOST=""
SMTP_SERVER_PORT=""
EMAIL_FROM=""
GOOGLE_ID=""
GOOGLE_SECRET=""
```

- .env.development

```env

```

## Development Server

To start the development server run the command

```bash
yarn dev
```

## Deployment Server

To deploy the app it must first be built.

_The build script will automatically check for linting and typescript type errors._

If any errors are present the build is aborted.

To run the build command use:

```bash
yarn build
```

If the build is successful then the deployed server needs to be started.

_This will not work if the build did not complete or a build was never done._

To start the app run:

```bash
yarn run
```

##### It is recommended that the app is deployed using the [Vercel Platform](https://vercel.com/new). Vercel is optimized to dynamically serve static, dynamic, and hybrid pages based on the needs of each individual page that is built. It deploys in less than a minute and can be linked to a Github repo to keep the production server up do date with the most recent pushes to your main or production branch. It automatically provides SSL and CDN to each app and scales automatically. Vercel also monitors all branched and deploys preview builds for those branches to test fixes, refactors, and new content live

# Development Features

## Prettier

This app has the prettier code formatter built in. [More about Prettier](https://prettier.io/)

To have Prettier update the structure of the codebase run the following command:

```bash
yarn pretty
```

## ESLint

This app has ESLIne built in to check for errors within the code.

**The A11y plugin in installed to help check for and meet accessibility standards.**

To lint the codebase run the following command:

```bash
yarn lint
```
