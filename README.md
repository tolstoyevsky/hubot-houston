# hubot-houston

A Hubot script for receiving feedback from users.

Based on [hubot-conversation](https://github.com/lmarkus/hubot-conversation) npm module.

## Usage

The `botname issue` command initiates a short dialog with the bot. The next message from the user will be interpreted as an issue description and forwarded to the channel specified via the `SUPPORT_CHANNEL` environment variable.

## Installation

In hubot project repo, run:

`npm install git+https://github.com/tolstoyevsky/hubot-houston --save`

Then add **hubot-houston** to your `external-scripts.json`:

```json
[
  "hubot-houston"
]
```

## Configuration

The script uses the only environment variable, which is mandatory – `SUPPORT_CHANNEL`. It is the name of the channel (which is supposed to be private), where all users' issues will be forwarded to. The default value of `SUPPORT_CHANNEL` is `support`.

## Authors

See [AUTHORS](AUTHORS.md).

## Licensing

hubot-houston is available under the [Apache License, Version 2.0](LICENSE).

